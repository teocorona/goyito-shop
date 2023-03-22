
export interface ProductType {
  _id: string;
  category: 'bites' | 'pulpa' | 'piquín' | 'deshidratados';
  description: string;
  flavor: 'original' | 'picosito' | 'fuego' | 'mango' | 'piña';
  images: string[];
  inStock: number;
  netWt: number;
  pieces?: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
}


