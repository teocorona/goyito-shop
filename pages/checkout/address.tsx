import { ShopLayout } from "@components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CartContext } from "../../context/cart";
import { CONSTANTS } from "../../database/constants"
import { AddressType } from "../../types/cart";

const AddressPage = () => {
  const router = useRouter()
  const { updateAddress, address } = useContext(CartContext)
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<AddressType>()
  const onSubmitAddress = async (data: AddressType) => {
    Cookies.set('address', JSON.stringify(data))
    updateAddress(data)
    router.push('/checkout/summary')
  }
  useEffect(() => {
    const addressCookie = Cookies.get('address')
    if (addressCookie && addressCookie?.length > 10) {
      const { fullName, phone, address, address2, ref, zip, city, country }
        = JSON.parse(addressCookie)
      setValue('fullName', fullName)
      setValue('phone', phone)
      setValue('address', address)
      setValue('address2', address2)
      setValue('ref', ref)
      setValue('zip', zip)
      setValue('city', city)
      setValue('country', country)
    }
  }, [])

  return (
    <ShopLayout title='Dirección' pageDescription='Dirección de envío'>
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Typography variant='h1' component='h1'>Dirección de envío</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={8}>
            <TextField {
              ...register('fullName', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 6,
                  message: 'El nombre debe tener al menos 5 caracteres'
                },
              })} label='Nombre Completo' variant='filled' fullWidth
              error={!!errors.fullName} helperText={errors.fullName?.message} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {
              ...register('phone', {
                required: 'El teléfono es oblidatorio',
                minLength: {
                  value: 10,
                  message: 'Introduce un telefono válido'
                },
              })} label='Teléfono' variant='filled' fullWidth
              error={!!errors.phone} helperText={errors.phone?.message} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField {
              ...register('address', {
                required: 'La direccion es obligatoria',
              })} label='Calle y número' variant='filled' fullWidth
              error={!!errors.address} helperText={errors.address?.message} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField {
              ...register('address2', {
                required: 'La colonia es obligatoria',
              })} label='Colonia' variant='filled' fullWidth
              error={!!errors.address2} helperText={errors.address2?.message} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {
              ...register('ref', {
                required: 'La referencia es obligatoria',
              })} label='Referencias' variant='filled' fullWidth
              error={!!errors.ref} helperText={errors.ref?.message} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField {
              ...register('zip', {
                required: 'El codigo postal es obligatorio',
              })} label='Código Postal' variant='filled' fullWidth
              error={!!errors.zip} helperText={errors.zip?.message} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {
              ...register('city', {
                required: 'El codigo postal es obligatorio',
              })} label='Ciudad' variant='filled' fullWidth
              error={!!errors.city} helperText={errors.city?.message} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="country"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    variant='filled'
                    label='País'
                    {...field}
                    // defaultValue={address?.country ?? "MEX"}
                    {...register('country')}>
                    {CONSTANTS.countries.map(({ code, name }) => (
                      <MenuItem key={code} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Siguiente
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}



// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const {token =''} = ctx.req.cookies;
//   let isValidToken = false;
//   try {
//     await jwt.isValidToken(token)
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }
//   if(!isValidToken){
//     return{
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }

export default AddressPage