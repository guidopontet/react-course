import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"

import { AuthLayout } from '../layout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startSignInWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startSignInWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container gap={ 2 }>
          <Grid item xs={ 12 }>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }></TextField>
          </Grid>

          <Grid item xs={ 12 }>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }></TextField>
          </Grid>

          <Grid
            container
            display={ !errorMessage ? 'none' : 'block' }
          >
            <Grid
              item
              xs={ 12 }
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={ 12 } sm={ 6 } sx={{ p: 1}}>
              <Button
                disabled={ isAuthenticating }
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } sx={{ p: 1}}>
              <Button
                disabled={ isAuthenticating }
                variant="contained"
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
