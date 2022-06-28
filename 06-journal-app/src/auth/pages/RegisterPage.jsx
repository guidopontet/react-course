import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear Cuenta">
      <form>
        <Grid container gap={ 2 }>
          <Grid item xs={ 12 }>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              fullWidth></TextField>
          </Grid>

          <Grid item xs={ 12 }>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth></TextField>
          </Grid>

          <Grid item xs={ 12 }>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth></TextField>
          </Grid>

          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={ 12 } sx={{ p: 1}}>
              <Button variant="contained" fullWidth>
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
