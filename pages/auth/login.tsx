import { AuthLayout } from "@components/layouts";
import { GetServerSideProps } from 'next'
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import { validations } from "@utils";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";

interface FormData {
  email: string,
  password: string,
}
const LoginPage = () => {
  const router = useRouter()
  // const { loginUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)

  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])



  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    // const isValidLogin = await loginUser(email, password)
    // if (!isValidLogin) {
    //   setShowError(true)
    //   setTimeout(() => setShowError(false), 5000);
    //   return
    // }
    // router.replace(`${router.query.p}`|| '/')
    await signIn('credentials', { email, password })
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

            <Grid item xs={12} display='flex' justifyContent='end' flexDirection='column'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if(provider.id === 'credentials') return null
                return (
                  <Button
                    key={provider.id}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ mb: 1, minHeight: 50 }}
                    onClick={()=> signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                )
              })}
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req })
  const { p = '/' } = ctx.query
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}