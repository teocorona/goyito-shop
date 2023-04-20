import { AuthLayout } from "@components/layouts";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { validations } from "@utils";
import axios from "axios";
import NextLink from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { goyitoApi } from "../../api";
import { AuthContext } from "@context";
import { useRouter } from "next/router";

interface FormData {
  email: string,
  password: string,
}
const LoginPage = () => {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)
  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    const isValidLogin = await loginUser(email, password)
    if (!isValidLogin) {
      setShowError(true)
      setTimeout(() => setShowError(false), 5000);
      return
    }
    router.replace(`${router.query.p}`|| '/')
  }

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
              <Box sx={{ height: 25 }}>
                {showError ?
                  <Chip
                    label='Usuario o contraseña incorrectos'
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
                label='Correo'
                type='email'
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
              <NextLink
              href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
              passHref>
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