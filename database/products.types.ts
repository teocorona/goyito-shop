
export interface SeedProduct {
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

// export type Categories = BitesType | PulpaType | PiquinType | DeshidratadoType;

// export type BitesType = {
//   name: 'bites'
//   flavor: 'original' | 'picosito' | 'fuego';
//   netWt: '50' | '300' | '1000';
// }
// export type PulpaType = {
//   name: 'pulpa'
//   flavor: 'original' | 'picosito' | 'fuego';
//   netWt: '20' | '500' | '4000' | '19000';
// }
// export type PiquinType = {
//   name: 'piquin'
//   flavor: 'fuego';
//   netWt: '230' | '1000' | '10000';
// }
// export type DeshidratadoType = {
//   name: 'deshidratado'
//   flavor: 'mango' | 'piña';
//   netWt: '60' | '1000' | '10000';
// }


export interface SeedData {
  products: SeedProduct[],
}
