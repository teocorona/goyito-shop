import { ShopLayout } from '@components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';
import React from 'react'

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
const rows = [
  { id: 1, paid: false, fullName: 'Milka', order: 1234 },
  { id: 2, paid: false, fullName: 'Milka 2', order: 1234 },
  { id: 3, paid: true, fullName: 'Teo', order: 1234 },
  { id: 4, paid: false, fullName: 'Majo', order: 1234 },
  { id: 5, paid: true, fullName: 'Mari', order: 1234 },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente' >
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
      <Grid container>
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

export default HistoryPage