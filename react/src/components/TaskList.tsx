import React from 'react';
import { List } from 'react-admin';
import TaskBoard from './TaskBoard';

const TaskList = (props:any) => (
    <List><TaskBoard /></List>
);

export default TaskList;
