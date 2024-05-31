import React, { useEffect, useState } from 'react';
import { useListContext, useDataProvider } from 'react-admin';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from './StrictModeDroppable';
import { Link } from '@mui/material';

const columnStyle = { margin: '0 10px', flex: 1, width: '150px', minHeight: '300px', backgroundColor: '#f0f0f0', padding: '10px' };
const cardStyle = { margin: '10px 0', padding: '10px', fontSize: '12px', backgroundColor: '#fff' };

const TaskBoard = () => {
    const { data: tasks, isLoading } = useListContext();
    const dataProvider = useDataProvider();
    const [localTasks, setLocalTasks] = useState([]);
    const stages = ["TODO", "IN_PROGRESS", "DONE"];

    useEffect(() => {
        if (tasks) {
            setLocalTasks(tasks);
        }
    }, [tasks]);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const taskId = result.draggableId;
        const newStage = stages[parseInt(destination.droppableId, 10)];

        if (source.droppableId !== destination.droppableId) {
            try {
                const task = localTasks.find(t => t.id.toString() === taskId);
                await dataProvider.update('tasks', { id: taskId, data: { ...task, stage: newStage }, previousData: task });

                const updatedTasks = localTasks.map(t => 
                    t.id.toString() === taskId ? { ...t, stage: newStage } : t
                );
                setLocalTasks(updatedTasks);
            } catch (error) {
                console.error("Error updating stage", error);
            }
        }
    };

    const handleTaskClick = (taskId) => {
        const url = `#/tasks/${taskId}/show`;
        window.open(url, '_blank');
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-columns" style={{ display: 'flex' }}>
                {stages.map((stage, index) => (
                    <Droppable key={stage} droppableId={index.toString()}>
                        {(provided) => (
                            <div className="column" {...provided.droppableProps} ref={provided.innerRef} style={columnStyle}>
                                <h3>{stage}</h3>
                                {localTasks && localTasks.filter(task => task.stage === stage).map((task, idx) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...cardStyle, ...provided.draggableProps.style }}>
                                                <Link onClick={() => handleTaskClick(task.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                                                    ID: {task.id}
                                                </Link>
                                                <div>{task.title}<br />{task.description}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
