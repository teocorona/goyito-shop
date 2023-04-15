import { AuthLayout } from "@components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { validations } from "@utils";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

interface FormData {
  email: string,
  password: string,
}
const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.log(data)
  }

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
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
              <Button type="submit" color='secondary' className='circular-btn' fullWidth>
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={'/auth/register'} passHref>
                <Link component='span' underline="always">Ir a crear cuenta</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;