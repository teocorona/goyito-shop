
import { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "@components/layouts";
import { ProductList } from "@components/products";
import { useProducts } from "@hooks";
import { Loading } from "@components/ui";
import { useRouter } from "next/router";
import { CONSTANTS } from "../../database/constants";
import { useEffect } from "react";



const CategoryPage: NextPage = () => {
  const router = useRouter()
  const {category} = router.query
  useEffect(() => {
    if(!category || !CONSTANTS.validCategory.includes(`${category}`)){
      router.push('/')
    }
  }, [router, category])
  
  const { products, error, isLoading } = useProducts(`/products?category=${category}`)
  if (error) return <div>failed to load</div>
  return (
    <ShopLayout title="Goyito Shop - Home" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ m: 2 }}>{`${category}`.toUpperCase()}</Typography>
      {isLoading ?
        <Loading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryPage;

