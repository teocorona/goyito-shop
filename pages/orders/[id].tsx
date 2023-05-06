import { CartList, OrderSummary } from "@components/cart"
import { ShopLayout } from "@components/layouts"
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from "next-auth"
import { getOrderById } from "../../database/dbOrders"
import { OrderType } from "../../types/order"
import { authOptions } from "../api/auth/[...nextauth]"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { goyitoApi } from "../../api"
import { useRouter } from "next/router"
import { useState } from "react"

interface Props {
  order: OrderType
}

type OrderResponseBody = {
  id: string;
  status:
  | "CREATED"
  | "SAVED"
  | "APPROVED"
  | "VOIDED"
  | "COMPLETED"
  | "PAYER_ACTION_REQUIRED";
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const totals = { numberOfItems: order.numberOfItems, subTotal: order.subTotal, taxIva: order.taxIva, taxIeps: order.taxIeps, total: order.total }
  const router = useRouter()
  const [isPaying, setIsPaying] = useState(false)
  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      console.log('no payment')
      return
    }
    setIsPaying(true)
    try {
      const { data } = await goyitoApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id
      })
      router.reload();
    } catch (error) {
      setIsPaying(false)
      console.log(error)
    }
  }
  return (
    <ShopLayout title={`Orden ${order._id}`} pageDescription={`Resumen de la orden numero ${order._id}`}>
      <Typography variant='h1' component='h1' sx={{ m: 3 }}>Orden {order._id}</Typography>
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
                <Box
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                  display='flex'
                  justifyContent='center'
                  className='fadeIn'
                >
                  <CircularProgress />
                </Box>
                <Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1}}  flexDirection='column'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, width: '100%' }}
                      label='Orden Pagada'
                      variant='outlined'
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                // currency_code: "MXN",
                                value: order.total.toString(),
                              },

                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details)
                          // console.log({details})
                          // const name = details.payer.name!.given_name;
                          // alert(`Transaction completed by ${name}`);
                        });
                      }}
                    />
                  )}
                </Box>
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
