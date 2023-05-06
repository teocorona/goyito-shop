import React from 'react'
import { NextPage } from 'next'
import useSWR from "swr";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AdminLayout } from '@components/layouts'
import { ProductType } from '@types';
import { format } from '../../../utils/currency';
import { formatDate } from '../../../utils/date';
import NextLink from 'next/link';
import AddOutlined from '@mui/icons-material/AddOutlined';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Imagen',
    width: 80,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`}>
          <Link component='span' underline='always'>
            <CardMedia
              component='img'
              alt={row.title}
              className='fadeIn'
              image={row.img}
              sx={{ height: 50 }}
            />
          </Link>
        </NextLink>
      )
    }
  },
  {
    field: 'title',
    headerName: 'Producto',
    width: 220,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`}>
          <Link component='span' underline='always'>
            <Typography>{row.title}</Typography>
          </Link>
        </NextLink>
      )
    }
  },
  { field: 'category', headerName: 'Categoria' },
  { field: 'variant', headerName: 'Sabor' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'updatedAt', headerName: 'Actualizado', width: 100, align: 'center' },
  {
    field: 'store',
    headerName: 'Tienda',
    width: 60,
    align: 'center',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank'><OpenInNewIcon /></a>
      )
    }
  },
]

const ProductsPage: NextPage = () => {
  const { data, error, isLoading } = useSWR<ProductType[]>('/api/admin/products')

  if (isLoading) return <></>

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    category: product.category,
    variant: product.variant,
    inStock: product.inStock,
    price: format(product.price),
    updatedAt: formatDate(product.updatedAt),
    slug: product.slug,
  }))
  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subtitle={'Administracion de productos'}
      icon={<CategoryOutlined />}
    >
      <>
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
          <Button
            startIcon={<AddOutlined />}
            color='secondary'
            href='/admin/products/new'
          >
            Crear producto
          </Button>

        </Box>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 'calc(100vh - 240px)', width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSizeOptions={[10]}
            />
          </Grid>
        </Grid>
      </>
    </AdminLayout>
  )
}

export default ProductsPage