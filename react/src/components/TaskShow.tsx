import React from 'react';
import { Show, SimpleShowLayout, TextField, DeleteButton } from 'react-admin';

const TaskShow = (props:any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="stage" label="Stage" />
            <TextField source="title" label="Title" />
            <TextField source="author" label="Author" />
            <TextField source="owner" label="Owner" />
            <TextField source="description" label="Description" />
            <DeleteButton />
        </SimpleShowLayout>
    </Show>
);

export default TaskShow;
