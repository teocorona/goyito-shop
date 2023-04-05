import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {

}

export const OrderSummary: FC<Props> = () => {

  return (
    <>
      <Grid container sx={{ mb: 1 }} >
        <Grid item xs={6}><Typography>No. de Productos</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>3 artículos</Typography></Grid>

        <Grid item xs={6}><Typography>Subtotal</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>$100</Typography></Grid>

        <Grid item xs={6}><Typography>Impuestos (16%)</Typography></Grid>
        <Grid item xs={6} display='flex' justifyContent='end'><Typography>$16</Typography></Grid>

        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" display='flex' justifyContent='end'>$116</Typography>
        </Grid>
      </Grid>
    </>
  );
};