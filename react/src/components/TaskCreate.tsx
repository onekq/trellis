import React from 'react';
import { Create, SimpleForm, TextInput, useNotify, useRedirect, useGetIdentity, useCreate, required } from 'react-admin';

interface Task {
    title: string;
    owner: string;
    description: string;
    author: string;
    stage: string;
}

const TaskCreate = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { identity, isLoading } = useGetIdentity();
    const [create] = useCreate();

    if (isLoading) return null;

    const handleSave = async (values: Task) => {
        try {
            // Set the author to the current user's full name
            if (identity && identity.fullName) {
                values.author = identity.fullName;
            }
            values.stage = 'TODO';

            // Perform the creation
            await create('tasks', { data: values });
            notify('Task created successfully', { type: 'info' });
            redirect('list', 'tasks');
        } catch (error) {
            notify(`Error: ${error}`, { type: 'warning' });
        }
    };

    return (
        <Create {...props}>
            <SimpleForm onSubmit={handleSave}>
                <TextInput source="title" label="Title" validate={required()} />
                <TextInput source="owner" label="Owner" validate={required()} />
                <TextInput source="description" label="Description" multiline validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default TaskCreate;
