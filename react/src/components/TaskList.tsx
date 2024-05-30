import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

const TaskList = (props:any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="stage" label="Stage" />
            <TextField source="title" label="Title" />
            <TextField source="author" label="Author" />
            <TextField source="owner" label="Owner" />
            <TextField source="description" label="Description" />
        </Datagrid>
    </List>
);

export default TaskList;
