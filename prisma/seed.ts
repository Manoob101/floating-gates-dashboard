import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({ where: { name: 'Smartphones' }, update: {}, create: { name: 'Smartphones' } }),
    prisma.category.upsert({ where: { name: 'Laptops' }, update: {}, create: { name: 'Laptops' } }),
    prisma.category.upsert({ where: { name: 'Tablets' }, update: {}, create: { name: 'Tablets' } }),
    prisma.category.upsert({ where: { name: 'Accessories' }, update: {}, create: { name: 'Accessories' } }),
    prisma.category.upsert({ where: { name: 'TVs & Displays' }, update: {}, create: { name: 'TVs & Displays' } }),
    prisma.category.upsert({ where: { name: 'Audio' }, update: {}, create: { name: 'Audio' } }),
  ])

  const products = [
    { name: 'iPhone 15 Pro', sku: 'APL-IP15P-256', barcode: '8901234567890', price: 999.99, cost: 750, stock: 15, categoryId: categories[0].id, warrantyMonths: 12, description: 'Apple iPhone 15 Pro 256GB' },
    { name: 'Samsung Galaxy S24', sku: 'SAM-GS24-128', barcode: '8901234567891', price: 799.99, cost: 580, stock: 20, categoryId: categories[0].id, warrantyMonths: 12, description: 'Samsung Galaxy S24 128GB' },
    { name: 'MacBook Air M2', sku: 'APL-MBA-M2-256', barcode: '8901234567892', price: 1099.99, cost: 800, stock: 8, categoryId: categories[1].id, warrantyMonths: 12, description: 'Apple MacBook Air M2 256GB' },
    { name: 'Dell XPS 15', sku: 'DEL-XPS15-512', barcode: '8901234567893', price: 1499.99, cost: 1100, stock: 5, categoryId: categories[1].id, warrantyMonths: 12, description: 'Dell XPS 15 512GB SSD' },
    { name: 'iPad Air 5th Gen', sku: 'APL-IPAD-A5-64', barcode: '8901234567894', price: 599.99, cost: 430, stock: 12, categoryId: categories[2].id, warrantyMonths: 12, description: 'Apple iPad Air 5th Gen 64GB' },
    { name: 'USB-C Cable 2m', sku: 'ACC-USBC-2M', barcode: '8901234567895', price: 19.99, cost: 5, stock: 100, minStock: 20, categoryId: categories[3].id, warrantyMonths: 6, description: 'High-speed USB-C cable 2 meters' },
    { name: 'Wireless Charger 15W', sku: 'ACC-WC-15W', barcode: '8901234567896', price: 39.99, cost: 15, stock: 50, categoryId: categories[3].id, warrantyMonths: 12, description: '15W fast wireless charger' },
    { name: 'Samsung 65" QLED TV', sku: 'SAM-TV65-QLED', barcode: '8901234567897', price: 1299.99, cost: 950, stock: 4, minStock: 2, categoryId: categories[4].id, warrantyMonths: 24, description: 'Samsung 65 inch QLED 4K TV' },
    { name: 'Sony WH-1000XM5', sku: 'SNY-WH1000XM5', barcode: '8901234567898', price: 349.99, cost: 250, stock: 18, categoryId: categories[5].id, warrantyMonths: 12, description: 'Sony WH-1000XM5 Noise Canceling Headphones' },
    { name: 'Apple AirPods Pro', sku: 'APL-APP-2ND', barcode: '8901234567899', price: 249.99, cost: 175, stock: 25, categoryId: categories[5].id, warrantyMonths: 12, description: 'Apple AirPods Pro 2nd Generation' },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
