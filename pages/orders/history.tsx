import { GetServerSideProps, NextPage } from 'next'
import { ShopLayout } from '@components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { getOrdersByUser } from '../../database/dbOrders';
import { OrderType } from '../../types/order';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Orden de compra pagada o no',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (params.row.paid ?
        <Chip color='success' label='Pagada' variant='outlined' />
        : <Chip color='error' label='No Pagada' variant='outlined' />)
    },
  },
  { field: 'total', headerName: 'Total', width: 100 },
  {
    field: 'order',
    headerName: 'Ver Orden',
    description: 'Ver detalles de la orden',
    width: 150,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.order}`} passHref>
          <Link component='span' underline="always">{params.row.order}</Link>
        </NextLink>)
    },
  },
]
// const rows = [
//   { id: 1, paid: false, fullName: 'Milka', order: 1234 },
//   { id: 2, paid: false, fullName: 'Milka 2', order: 1234 },
//   { id: 3, paid: true, fullName: 'Teo', order: 1234 },
//   { id: 4, paid: false, fullName: 'Majo', order: 1234 },
//   { id: 5, paid: true, fullName: 'Mari', order: 1234 },
// ]

interface Props {
  orders: OrderType[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: order.shippingAddress.fullName,
    order: order._id,
    total: `$ ${order.total}`,
  }))
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente' >
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false
      }
    }
  }
  const orders = await getOrdersByUser(session.user?._id)

  return {
    props: {
      orders
    }
  }
}

export default HistoryPage