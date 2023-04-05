
export interface ProductType {
  _id: string;
  category: categoryType;
  description: string;
  variant: variantType[];
  images: string[];
  inStock: number;
  netWt: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
}

export type variantType = 'original' | 'picosito' | 'fuego' | 'mango' | 'piña';
export type categoryType = 'bites' | 'pulpa' | 'piquín' | 'deshidratados';

