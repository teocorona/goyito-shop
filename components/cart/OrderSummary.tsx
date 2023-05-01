import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '@context';
import { currency } from '../../utils';

interface Props {
  totals?: {
    numberOfItems: number, subTotal: number, taxIva: number, taxIeps: number, total: number
  }
}

export const OrderSummary: FC<Props> = ({ totals }) => {

  const { numberOfItems, subTotal, taxIva, taxIeps, total } = useContext(CartContext)

  const summaryValues = totals ? totals : { numberOfItems, subTotal, taxIva, taxIeps, total }

  const iva = process.env.NEXT_PUBLIC_TAX_IVA !== '0' ?
    `${Number(process.env.NEXT_PUBLIC_TAX_IVA) * 100}%` : 'N/A'
  const ieps = process.env.NEXT_PUBLIC_TAX_IEPS !== '0' ?
    `${Number(process.env.NEXT_PUBLIC_TAX_IEPS) * 100}%` : 'N/A'

  return (
    <>
      <Grid container sx={{ mb: 1 }} >
        <Grid item xs={6}><Typography>No. de Productos</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
          <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems === 1 ? 'artículo' : 'artículos'}</Typography>
        </Grid>

        <Grid item xs={6}><Typography>Subtotal</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(summaryValues.subTotal)}</Typography></Grid>

        {/* <Grid item xs={6}><Typography>Envío</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>Calculado antes de pagar</Typography></Grid> */}

        <Grid item xs={6}><Typography>IVA {iva}</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(summaryValues.taxIva)}</Typography></Grid>

        <Grid item xs={6}><Typography>IEPS {ieps}</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(summaryValues.taxIeps)}</Typography></Grid>

        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" display='flex' justifyContent='end'>{currency.format(summaryValues.total)}</Typography>
        </Grid>
      </Grid>
    </>
  );
};