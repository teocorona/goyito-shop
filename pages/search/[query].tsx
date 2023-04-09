
import { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "@components/layouts";
import { ProductList } from "@components/products";
import { getProductsByTerm } from "@database";
import { ProductType } from "@types";

interface Props {
  products: ProductType[],
  query: string,
  found: boolean
}

const SearchPage: NextPage<Props> = ({ products, query, found }) => {

  return (
    <ShopLayout title="Goyito Shop - Search" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Busqueda</Typography>
      {found ? (
        <Typography variant='h2' sx={{ mb: 2 }}>
          Mostrando resultados de {query}
        </Typography>
      ) : (
        <Typography variant='h2' sx={{ mb: 2 }}>
          No encontramos resulta para &quot;{query}&quot;, estos son algunos productos que podrían interesarte
        </Typography>
      )}
      <ProductList products={products} />
    </ShopLayout>
  )
}

export default SearchPage;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }
  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }
  let products = await getProductsByTerm(query)
  const found = products.length > 0
  if (!found) {
    products = await getProductsByTerm('fuego')
  }
  return {
    props: {
      products,
      query,
      found
    }
  }
}
