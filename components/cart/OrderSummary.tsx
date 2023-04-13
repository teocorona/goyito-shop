import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '@context';
import { currency } from '../../utils';

interface Props {

}

export const OrderSummary: FC<Props> = () => {
  const {numberOfItems, subTotal, taxIva, taxIeps, total} = useContext(CartContext)

  const iva = process.env.NEXT_PUBLIC_TAX_IVA !== '0' ?  
    `${Number(process.env.NEXT_PUBLIC_TAX_IVA)*100}%` : 'N/A'
  const ieps = process.env.NEXT_PUBLIC_TAX_IEPS !== '0' ?  
    `${Number(process.env.NEXT_PUBLIC_TAX_IEPS)*100}%` : 'N/A'

  return (
    <>
      <Grid container sx={{ mb: 1 }} >
        <Grid item xs={6}><Typography>No. de Productos</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
          <Typography>{numberOfItems} {numberOfItems === 1 ? 'artículo' : 'artículos'}</Typography>
          </Grid>

        <Grid item xs={6}><Typography>Subtotal</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(subTotal)}</Typography></Grid>

        {/* <Grid item xs={6}><Typography>Envío</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>Calculado antes de pagar</Typography></Grid> */}
        
        <Grid item xs={6}><Typography>IVA {iva}</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(taxIva)}</Typography></Grid>
       
        <Grid item xs={6}><Typography>IEPS {ieps}</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>{currency.format(taxIeps)}</Typography></Grid>

        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" display='flex' justifyContent='end'>{currency.format(total)}</Typography>
        </Grid>
      </Grid>
    </>
  );
};