
import { NextPage } from "next";
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@components/layouts";
import { initialData } from "@database/products";


const Home: NextPage = () => {
  return (
    <ShopLayout title="Goyito Shop - Home" pageDescription="Dulces a base de fruta" >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Todos los productos</Typography>
      <Grid container spacing={4}>
        {initialData.products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component='img'
                  image={`products/${product.images[0]}`}
                  alt={product.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  )
}

export default Home;
