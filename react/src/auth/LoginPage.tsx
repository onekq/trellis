
import React from 'react';
import { Card, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from './LoginForm';

const PREFIX = 'RaMyLogin';
const classes = {
    card: `${PREFIX}-card`,
    toggleButton: `${PREFIX}-toggleButton`
};

const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [`& .${classes.card}`]: {
        minWidth: 300,
        marginTop: '6em',
        padding: theme.spacing(2)
    },
    [`& .${classes.toggleButton}`]: {
        marginTop: theme.spacing(1)
    },
}));

interface MyLoginPageProps {
    backgroundImage?: string;
}

export const LoginPage: React.FC<MyLoginPageProps> = ({ backgroundImage }) => {
    return (
        <Root style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Card className={classes.card}>
                {<LoginForm />}
            </Card>
        </Root>
    );
};

export default LoginPage;
