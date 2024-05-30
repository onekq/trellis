import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const TaskShow = (props:any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="stage" label="Stage" />
            <TextField source="title" label="Title" />
            <TextField source="author" label="Author" />
            <TextField source="owner" label="Owner" />
            <TextField source="description" label="Description" />
        </SimpleShowLayout>
    </Show>
);

export default TaskShow;
