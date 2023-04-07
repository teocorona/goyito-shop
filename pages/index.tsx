
import { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "@components/layouts";
import { ProductList } from "@components/products";
import { useProducts } from "@hooks";
import { Loading } from "@components/ui";



const HomePage: NextPage = () => {
  const { products, error, isLoading } = useProducts('/products')
  if (error) return <div>failed to load</div>
  return (
    <ShopLayout title="Goyito Shop - Home" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Todos los productos</Typography>
      {isLoading ?
        <Loading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default HomePage;
