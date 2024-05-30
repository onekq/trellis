"use client"  // This is a client component 

import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource, Layout, LayoutProps, CustomRoutes} from 'react-admin';

import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';

import { LoginPage } from './auth/LoginPage';

import authProvider from './authProvider';
import dataProvider from './dataProvider';

const App: React.FC = () => {
    return (
        <Admin loginPage={LoginPage} dataProvider={dataProvider} authProvider={authProvider} >
            <Resource name="tasks" list={TaskList} create={TaskCreate} show={TaskShow} />
        </Admin>
    );
};

export default App;