"use client";

import React from 'react';
import { Admin, Resource } from 'react-admin';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskShow from './components/TaskShow';
import { LoginPage } from './auth/LoginPage';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

const App: React.FC = () => {
    return (
        <Admin loginPage={LoginPage} dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="tasks" list={TaskList} create={TaskCreate} show={TaskShow} />
        </Admin>
    );
};

export default App;
