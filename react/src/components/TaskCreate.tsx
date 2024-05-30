import React from 'react';
import { Create, SimpleForm, TextInput, useNotify, useRedirect, useGetIdentity, required } from 'react-admin';

interface TaskFormValues {
    title: string;
    owner: string;
    description: string;
    author?: string;
    stage?: string;
}

const TaskCreate = (props:any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { identity, isLoading } = useGetIdentity();

    if (isLoading) return null;

    const handleSave = (values: TaskFormValues) => {
        // Set the author to the current user's id
        if (identity && identity.id) {
            values.author = identity.id;
        }
        return values;
    };

    return (
        <Create {...props}>
            <SimpleForm defaultValue={{ stage: 'TODO' }} onSubmit={handleSave}>
                <TextInput source="title" label="Title" validate={required()} />
                <TextInput source="owner" label="Owner" validate={required()} />
                <TextInput source="description" label="Description" multiline validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default TaskCreate;
