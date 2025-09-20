import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: "Classic Sourdough",
      description: "A traditional sourdough bread with a crispy crust and soft interior",
      imageUrl: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb",
      price: 7.99,
      category: Category.BREAD,
      featured: true,
      stock: 15,
      lowStockThreshold: 5
    },
    {
      name: "Chocolate Croissant",
      description: "Buttery croissant filled with rich dark chocolate",
      imageUrl: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd",
      price: 4.99,
      category: Category.PASTRY,
      featured: true,
      stock: 20,
      lowStockThreshold: 8
    },
    {
      name: "Vanilla Bean Cake",
      description: "Light and fluffy vanilla cake made with real vanilla beans",
      imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
      price: 29.99,
      category: Category.CAKE,
      featured: true,
      stock: 5,
      lowStockThreshold: 3
    },
    {
      name: "Double Chocolate Cookies",
      description: "Soft and chewy cookies packed with dark and milk chocolate chips",
      imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      price: 3.99,
      category: Category.COOKIE,
      featured: false,
      stock: 30,
      lowStockThreshold: 10
    },
    {
      name: "Iced Coffee",
      description: "House-blend coffee served over ice with optional cream",
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
      price: 4.49,
      category: Category.BEVERAGE,
      featured: false,
      stock: 100,
      lowStockThreshold: 20
    },
    {
      name: "Whole Wheat Bread",
      description: "Nutritious whole wheat bread perfect for sandwiches",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      price: 6.99,
      category: Category.BREAD,
      featured: false,
      stock: 12,
      lowStockThreshold: 5
    }
  ]

  console.log('Seeding products...')

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })