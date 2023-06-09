import { ProductType, UserType } from "@types";
import bcrypt from "bcryptjs";

type SeedData = {
  products: Omit<ProductType, '_id' | 'createdAt' | 'updatedAt'>[],
  users: Omit<UserType, '_id' | 'createdAt' | 'updatedAt'>[],
}

export const initialData: SeedData = {
  users: [
    {
      name: 'Milka',
      email: 'milka@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
    },
    {
      name: 'Majo',
      email: 'majo@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'client',
    },
    {
      name: 'Teo',
      email: 'teo@gmail.com',
      password: bcrypt.hashSync('123456'),
      role: 'client',
    },
  ],
  products: [
    {
      category: ['pulpa'],
      description: '<span>Contenido 12 sobres de 20 gramos c/u. Cont. Net. 240 gramos.</span>',
      variant: ['original'],
      images: ['pulpa-sobre-original.jpg', 'pulpa-original.jpg',],
      inStock: 456,
      netWt: 240,
      price: 59,
      slug: "pulpa_original_20g",
      tags: ['pulpa', 'original', 'sin chile', '20g'],
      title: "Pulpa Original (sin chile)",
    },
    {
      category: ['pulpa'],
      description: '<span>Contenido 12 sobres de 20 gramos c/u. Cont. Net. 240 gramos.</span>',
      variant: ['picosito'],
      images: ['pulpa-sobre-picosito.jpg', 'pulpa-picosito.jpg',],
      inStock: 456,
      netWt: 240,
      price: 59,
      slug: "pulpa_picosito_20g",
      tags: ['pulpa', 'picosito', 'enchilado', '20g'],
      title: "Pulpa Picosita",
    },
    {
      category: ['pulpa'],
      description: '<span>Contenido 12 sobres de 20 gramos c/u. Cont. Net. 240 gramos.</span>',
      variant: ['fuego'],
      images: ['pulpa-sobre-fuego.jpg', 'pulpa-fuego.jpg',],
      inStock: 456,
      netWt: 240,
      price: 59,
      slug: "pulpa_fuego_20g",
      tags: ['pulpa', 'fuego', 'enchilado', '20g'],
      title: "Pulpa Fuego",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bolsita de 50 gramos.</span>',
      variant: ['original'],
      images: ['bites-bolsita-original.jpg', 'bites-original.jpg',],
      inStock: 456,
      netWt: 50,
      price: 19,
      slug: "bites_original_50g",
      tags: ['bites', 'original', 'sin chile', '50g'],
      title: "Bites Original",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bolsita de 50 gramos.</span>',
      variant: ['picosito'],
      images: ['bites-bolsita-picosito.jpg', 'bites-picosito.jpg',],
      inStock: 456,
      netWt: 50,
      price: 19,
      slug: "bites_picosito_50g",
      tags: ['bites', 'picosito', 'enchilado', '50g'],
      title: "Bites Picosito",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bolsita de 50 gramos.</span>',
      variant: ['fuego'],
      images: ['bites-bolsita-fuego.jpg', 'bites-fuego.jpg',],
      inStock: 456,
      netWt: 50,
      price: 19,
      slug: "bites_fuego_50g",
      tags: ['bites', 'fuego', 'enchilado', '50g'],
      title: "Bites Fuego",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bowl de 300 gramos.</span>',
      variant: ['original'],
      images: ['bites-bowl-original.jpg', 'bites-original.jpg',],
      inStock: 456,
      netWt: 300,
      price: 73,
      slug: "bites_original_300g",
      tags: ['bites', 'original', 'sin chile', '300g'],
      title: "Bites Original",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bowl de 300 gramos.</span>',
      variant: ['picosito'],
      images: ['bites-bowl-picosito.jpg', 'bites-picosito.jpg',],
      inStock: 456,
      netWt: 300,
      price: 73,
      slug: "bites_picosito_300g",
      tags: ['bites', 'picosito', 'enchilado', '300g'],
      title: "Bites Picosito",
    },
    {
      category: ['bites'],
      description: '<span>Contenido 1 bowl de 300 gramos.</span>',
      variant: ['fuego'],
      images: ['bites-bowl-fuego.jpg', 'bites-fuego.jpg',],
      inStock: 456,
      netWt: 300,
      price: 73,
      slug: "bites_fuego_300g",
      tags: ['bites', 'fuego', 'enchilado', '300g'],
      title: "Bites Fuego",
    },
    {
      category: ['piquin'],
      description: '<span>Contenido 1 especiero de 230 gramos.</span>',
      variant: ['fuego'],
      images: ['piquin-fuego.jpg', 'piquin.jpg',],
      inStock: 456,
      netWt: 230,
      price: 63,
      slug: "piquin_fuego_230g",
      tags: ['piquien', 'fuego', 'enchilado', '300g'],
      title: "Piquín Fuego",
    },
    {
      category: ['deshidratados'],
      description: '<span>Contenido 1 bolsa de 60 gramos.</span>',
      variant: ['mango'],
      images: ['mango-60g.jpg', 'mango.jpg',],
      inStock: 456,
      netWt: 60,
      price: 59,
      slug: "mango_60g",
      tags: ['deshidratado', 'mango', 'sin chile', '60g'],
      title: "Mango deshidratado",
    },
    {
      category: ['deshidratados'],
      description: '<span>Contenido 1 bolsa de 60 gramos.</span>',
      variant: ['piña'],
      images: ['pina-60g.jpg', 'pina.jpg',],
      inStock: 456,
      netWt: 60,
      price: 59,
      slug: "pina_60g",
      tags: ['deshidratado', 'piña', 'sin chile', '60g'],
      title: "Piña deshidratada",
    },


  ]
}