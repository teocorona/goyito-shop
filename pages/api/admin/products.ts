import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { db } from '@database'
import { Product } from '@models'
import { ProductType } from '@types'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data =
  | { message: string }
  | ProductType[]
  | ProductType

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res)
    case 'PUT':
      return updateProduct(req, res)
    case 'POST':
      return createProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  const products = await Product.find().sort({ title: 'asc' }).lean()
  await db.disconnect()
  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    })
    return product
  })
  return res.status(200).json(updatedProducts)
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body as ProductType;
  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Bad request - not valid product id' })
  }
  if (images.length < 2) {
    return res.status(400).json({ message: '2 images' })
  }

  try {
    await db.connect()
    const product = await Product.findById(_id)
    if (!product) {
      await db.disconnect()
      return res.status(404).json({ message: '404 - no product' })
    }
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
        await cloudinary.uploader.destroy(fileId)
      }
    })
    await product.updateOne(req.body)
    await db.disconnect()
    return res.status(200).json(product)

  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: 'Error on product update' })
  }

}


const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as ProductType;
  if (images.length < 2) {
    return res.status(400).json({ message: '2 images' })
  }
  try {
    await db.connect()
    const productInDB = await Product.findOne({ slug: req.body.slug })
    if (productInDB) {
      await db.disconnect()
      return res.status(400).json({ message: 'ya existe producto con ese slug' })
    }
    const product = new Product(req.body)
    await product.save()
    await db.disconnect()
    return res.status(201).json(product)

  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: 'Error on product create' })
  }
}

