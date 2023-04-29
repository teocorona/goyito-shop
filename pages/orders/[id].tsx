import { CartList, OrderSummary } from "@components/cart"
import { ShopLayout } from "@components/layouts"
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from "next-auth"
import { getOrderById } from "../../database/dbOrders"
import { OrderType } from "../../types/order"
import { authOptions } from "../api/auth/[...nextauth]"

interface Props {
  order: OrderType
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const totals = { numberOfItems: order.numberOfItems, subTotal: order.subTotal, taxIva: order.taxIva, taxIeps: order.taxIeps, total: order.total }
  return (
    <ShopLayout title={`Orden ${order._id}`} pageDescription={`Resumen de la orden numero ${order._id}`}>
      <Typography variant='h1' component='h1' sx={{ m: 3 }}>Ordern {order._id}</Typography>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Orden Pagada'
          variant='outlined'
          color="success"
          icon={<CreditScoreOutlined />}
        />

      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Pendiente de Pago'
          variant='outlined'
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}
      <Grid container spacing={5} className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant='h2'>Resumen ({order.numberOfItems} artículo{order.numberOfItems === 1 ? '' : 's'})</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant='subtitle1'>Dirección de entrega</Typography>
              <Typography>{order.shippingAddress.fullName}</Typography>
              <Typography>{order.shippingAddress.phone}</Typography>
              <Typography>{order.shippingAddress.address}, {order.shippingAddress.address2}, {order.shippingAddress.ref}</Typography>
              <Typography>{order.shippingAddress.zip}, {order.shippingAddress.city}, {order.shippingAddress.country}</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary totals={totals} />
              <Box sx={{ mt: 3 }} flex='flex' flexDirection='column'>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2, width:'100%' }}
                    label='Orden Pagada'
                    variant='outlined'
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Button color='secondary' className='circular-btn' fullWidth>
                    Pagar
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query, res }) => {
  const { id = '' } = query
  const session: any = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false
      }
    }
  }

  const order = await getOrderById(id.toString())
  if (!order || order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false
      }
    }
  }

  return {
    props: {
      order
    }
  }
}

export default OrderPage
