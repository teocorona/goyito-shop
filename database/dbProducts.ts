import { db } from "@database"
import Product from "@models"
import { ProductType } from "../types/products"


export const getProductBySlug = async (slug: string): Promise<ProductType | null> => {
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
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