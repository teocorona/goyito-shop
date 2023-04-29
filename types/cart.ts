import { variantType, categoryType } from "./";

export interface CartType {
  _id: string;
  category: categoryType;
  variant: variantType;
  image: string;
  inStock?: number;
  netWt: number;
  price: number;
  slug: string;
  title: string;
  quantity: number;

  // tags: string[];
  // description: string;
  // images: string[];
  // createdAt: string;
  // updatedAt: string;
}

export interface AddressType {
    fullName: string;
    phone: string;
    address: string;
    address2: string;
    ref: string;
    zip: string;
    city: string;
    country: string;
}

