import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, CardContent } from '@mui/material';
import { useLogin, useNotify, useTranslate, useRedirect } from 'react-admin';

interface LoginFormProps {
  redirectTo?: string;
}

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = '/' }) => {
  const login = useLogin();
  const notify = useNotify();
  const redirect = useRedirect();
  const translate = useTranslate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      await login(data, redirectTo);
      redirect('/');
    } catch (error: any) {
      notify(typeof error === 'string' ? error : error.message || 'Unknown error', { type: 'warning' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <TextField
          label={translate('ra.auth.username')}
          variant="outlined"
          margin="normal"
          fullWidth
          {...register('username', { required: translate('ra.validation.required') })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          label={translate('ra.auth.password')}
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register('password', { required: translate('ra.validation.required') })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {translate('ra.auth.sign_in')}
        </Button>
      </CardContent>
    </form>
  );
};

export default LoginForm;