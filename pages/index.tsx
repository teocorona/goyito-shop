
import { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "@components/layouts";
import { initialData } from "@database";
import { ProductList } from "@components/products";


const Home: NextPage = () => {
  return (
    <ShopLayout title="Goyito Shop - Home" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Todos los productos</Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}

export default Home;
