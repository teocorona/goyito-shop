import { AuthLayout } from "@components/layouts";
import { Box, Button, Grid, Link, TextField, Typography, Chip } from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { goyitoApi } from "../../api";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { validations } from "@utils";
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)
  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await goyitoApi.post('/user/register', { name, email, password })
      const { token, user } = data
      console.log(data)
    } catch (error) {
      setShowError(true)
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
      console.log('error al crear usuario')
      setTimeout(() => {
        setShowError(false)
      }, 5000);
    }
  }
  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Crear cuenta</Typography>
              <Box sx={{ height: 25 }}>
                {showError ?
                  <Chip
                    label='Error al crear usuario'
                    color='error'
                    icon={<ErrorOutline />}
                    className='fade-in'
                    sx={{ width: '100%' }}
                  />
                  : null}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Nombre'
                variant='filled'
                fullWidth
                {
                ...register('name', {
                  required: 'El nombre es obligatoria',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres'
                  },
                })
                }
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
                type='email'
                fullWidth
                {
                ...register('email', {
                  required: 'El email es obligatorio',
                  validate: validations.isEmail
                  // validate: (val) => validations.isEmail(val)
                })
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {
                ...register('password', {
                  required: 'La contreseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contreseña debe tener al menos 6 caracteres'
                  },
                })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={'/auth/login'} passHref>
                <Link component='span' underline="always">Ir a iniciar sesión</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default Register;