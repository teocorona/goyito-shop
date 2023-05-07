import { db } from "@database"
import { Product } from "../models/Product"
import { ProductType } from "../types/products"


export const getProductBySlug = async (slug: string): Promise<ProductType | null> => {
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
  if (!product) return null
  product.images = product.images.map(image => {
    return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
  })
  return JSON.parse(JSON.stringify(product)) || null
}

interface ProductSlug {
  slug: string
}
export const getAllProductsSlugs = async (): Promise<ProductSlug[] | null> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect()
  return slugs
}


export const getProductsByTerm = async (term: string): Promise<ProductType[]> => {
  term = term.toLowerCase()
  await db.connect()
  const products = await Product.find({
    $text: { $search: term }
  })
    .select('title images price inStock slug -_id')
    .lean()
  await db.disconnect()
  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    })
    return product
  })
  return updatedProducts
}