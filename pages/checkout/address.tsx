import { ShopLayout } from "@components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"


const AddressPage = () => {
  return (
    <ShopLayout title='Dirección' pageDescription='Dirección de envío'>
      <Typography variant='h1' component='h1'>Dirección de envío</Typography>
      <Grid container spacing={2} sx={{mt:2}}>

        <Grid item xs={12} sm={8}>
          <TextField label='Nombre Completo' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField label='Calle y número' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label='Colonia' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label='Referencias' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label='Código Postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Select
              variant='filled'
              value={1}
              label='País'
            >
              <MenuItem value={1}>México</MenuItem>
              <MenuItem value={2}>Brasil</MenuItem>
              <MenuItem value={3}>Italia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{mt:5}} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage