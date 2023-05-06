import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import useSWR from "swr";
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Grid, MenuItem, Select } from '@mui/material'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import { AdminLayout } from '@components/layouts'
import { OrderType, UserType } from '@types';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Orden',
    width: 220,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank'>{row.id}</a>
      )
    }
  },
  { field: 'email', headerName: 'Correo', width: 180 },
  { field: 'name', headerName: 'Nombre', width: 150 },
  { field: 'total', headerName: 'Total', width: 80 },
  {
    field: 'isPaid',
    headerName: 'Estatus de Pago',
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ?
        <Chip variant='outlined' label='Pagada' color='success' /> :
        <Chip variant='outlined' label='Pendiente' color='error' />
    }
  },
  { field: 'numberOfItems', headerName: 'No. Productos', align: 'center', width: 120 },
  { field: 'createdAt', headerName: 'Fecha', width: 200 },
]

const OrdersPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<OrderType[]>('/api/admin/orders')

  if (isLoading) return <></>

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as UserType).email,
    name: order.shippingAddress.fullName,
    total: order.total,
    isPaid: order.isPaid,
    numberOfItems: order.numberOfItems,
    createdAt: order.createdAt,
  }))
  return (
    <AdminLayout
      title={'Ordenes'}
      subtitle={'Administracion de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage