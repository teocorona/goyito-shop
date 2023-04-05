import { CartList, OrderSummary } from "@components/cart"
import { ShopLayout } from "@components/layouts"
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"


const OrderPage = () => {
  return (
    <ShopLayout title='Orden 1234' pageDescription='Resumen de la orden numero 1234'>
      <Typography variant='h1' component='h1' sx={{ m: 3 }}>Ordern 1234</Typography>
      <Chip
        sx={{ my: 2 }}
        label='Pendiente de Pago'
        variant='outlined'
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label='Orden Pagada'
        variant='outlined'
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container spacing={5}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant='h2'>Resumen (4 articulos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href={`/checkout/address`} passHref prefetch={false}>
                  <Link component='span' underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography>Nombre</Typography>
              <Typography>Dirección</Typography>
              <Typography>Ciudad</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href={`/cart`} passHref prefetch={false}>
                  <Link component='span' underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Chip
                  sx={{ my: 2 }}
                  label='Orden Pagada'
                  variant='outlined'
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
                <Button color='secondary' className='circular-btn' fullWidth>
                  Pagar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
