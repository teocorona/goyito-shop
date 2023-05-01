import { db } from "@database";
import { isValidObjectId } from "mongoose";
import { Order } from "../models/Order";
import { OrderType } from "../types/order";

export const getOrderById = async (id: string): Promise<OrderType | null> => {
  if (!isValidObjectId(id)) {
    return null
  }
  await db.connect()
  const order = await Order.findById(id).lean()
  await db.disconnect()
  if (!order) {
    return null
  }
  return JSON.parse(JSON.stringify(order))
}

export const getOrdersByUser = async (userId: string): Promise<OrderType[]> => {
  if (!isValidObjectId(userId)) {
    return []
  }
  await db.connect()
  const orders = await Order.find({user: userId}).lean()
  await db.disconnect()
  if (!orders) {
    return []
  }
  return JSON.parse(JSON.stringify(orders))
}