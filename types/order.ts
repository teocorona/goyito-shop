import { AddressType } from "./cart";
import { UserType } from "./user";

export interface OrderType {
  _id: string;
  user?: UserType | string;
  orderItems: [OrderItemType];
  shippingAddress: AddressType;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
  taxIva: number;
  taxIeps: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;
}

export interface OrderItemType {
  _id: string;
  title: string;
  category: string;
  variant: string;
  quantity: number;
  netWt: number;
  price: number;
  image: string;
  slug: string;
}


