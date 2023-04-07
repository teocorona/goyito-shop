import { CartList, OrderSummary } from "@components/cart"
import { ShopLayout } from "@components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"


const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la compra'>
      <Typography variant='h1' component='h1' sx={{ m: 3 }}>
        Resumen de la orden
      </Typography>
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
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
