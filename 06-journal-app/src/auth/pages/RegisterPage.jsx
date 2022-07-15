import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: 'guido@gmail.com',
  password: '123456',
  displayName: 'Guido Pontet',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe ser válido'],
  password: [(value) => value.length >= 6, 'El password debe ser mayor a 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true)

    if (!isFormValid) { return; }

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear Cuenta">
      <form
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container gap={ 2 }>
          <Grid item xs={ 12 }>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            ></TextField>
          </Grid>

          <Grid item xs={ 12 }>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
            ></TextField>
          </Grid>

          <Grid item xs={ 12 }>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            ></TextField>
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid
              item
              xs={ 12 }
              sx={{ p: 1}}
              display={ !errorMessage ? 'none' : 'block' }
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={ 12 } sx={{ p: 1}}>
              <Button
                disabled={ isCheckingAuthentication || !isFormValid }
                type='submit'
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{ mr: 1}} color="GrayText">¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
