import { Typography } from "@mui/material";
import { ShopLayout } from "components/components/layouts";


export default function Home() {
  return (
    <ShopLayout title="Goyito Shop - Home" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Todos los productos</Typography>
    </ShopLayout>
  )
}
