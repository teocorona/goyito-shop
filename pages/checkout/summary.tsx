import { CartList, OrderSummary } from "@components/cart"
import { ShopLayout } from "@components/layouts"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { useContext } from "react"
import { CartContext } from "../../context/cart"


const SummaryPage = () => {
  const { address, numberOfItems } = useContext(CartContext)
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
              <Typography variant='h2'>
                Resumen ({numberOfItems} artículo{numberOfItems !== 1 ? 's' : ''})
              </Typography>
              <Divider sx={{ my: 1 }} />
              {address ? (
                <>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                    <NextLink href={`/checkout/address`} passHref prefetch={false}>
                      <Link component='span' underline="always">Editar</Link>
                    </NextLink>
                  </Box>
                  <Typography>{address?.fullName}</Typography>
                  <Typography>{address?.phone}</Typography>
                  <Typography>{address?.address}, {address?.address2}, {address?.ref}</Typography>
                  <Typography>{address?.zip}, {address?.city}, {address?.country}</Typography>
                  <Divider sx={{ my: 1 }} />
                </>
              ) : null
              }
              <Box display='flex' justifyContent='end'>
                <NextLink href={`/cart`} passHref prefetch={false}>
                  <Link component='span' underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {address ?
                  <Button color='secondary' className='circular-btn' fullWidth>
                    Confirmar orden
                  </Button>
                  :
                  <>
                    <NextLink href={`/checkout/address`} passHref prefetch={false}>
                      <Button color='error' className='error-btn' fullWidth sx={{ display: "flex", flexDirection: 'column' }}>
                        Direccion no válida
                        <Typography color='#ffffff' sx={{ textDecoration: 'underline' }}>
                          Editar dirección de envío
                        </Typography>
                      </Button>
                    </NextLink>
                  </>
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
