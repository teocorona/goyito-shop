import { CartList, OrderSummary } from "@components/cart"
import { AdminLayout } from "@components/layouts"
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from 'next'
import { getOrderById } from "@database"
import { OrderType } from "@types"
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined"

interface Props {
  order: OrderType
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const totals = { numberOfItems: order.numberOfItems, subTotal: order.subTotal, taxIva: order.taxIva, taxIeps: order.taxIeps, total: order.total }

  return (
    <AdminLayout
      title={`Resumen de orden`}
      subtitle={`OrderId ${order._id}`}
      icon={<Inventory2Outlined/>}
    >
      <>
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
                <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Orden Pagada'
                      variant='outlined'
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />

                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Pendiente de Pago'
                      variant='outlined'
                      color="error"
                      icon={<CreditCardOffOutlined />}
                    />
                  )}

                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </AdminLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query, res }) => {
  const { id = '' } = query

  const order = await getOrderById(id.toString())
  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
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
