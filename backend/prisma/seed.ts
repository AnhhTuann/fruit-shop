import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fetching fruit data from Fruityvice API...');
  
  // 1. Gọi API lấy data trái cây thật
  const response = await fetch('https://www.fruityvice.com/api/fruit/all');
  const fruits = await response.json();

  console.log(`Found ${fruits.length} fruits. Seeding database...`);

  // 2. Tạo Category mặc định
  const defaultCategory = await prisma.category.upsert({
    where: { name: 'Fresh Fruits' },
    update: {},
    create: { name: 'Fresh Fruits', description: 'All fresh fruits from API' },
  });

  // Helper to format names: "Navel Orange" -> "navel-orange"
  const formatFruitName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // 3. Map data từ API sang format của Prisma Product
  const productData = fruits.map((fruit: any) => ({
    name: fruit.name,
    // Lấy thông tin dinh dưỡng làm mô tả sản phẩm cho xịn
    description: `Family: ${fruit.family}. Calories: ${fruit.nutritions.calories}kcal, Sugar: ${fruit.nutritions.sugar}g.`,
    // Random giá tiền từ $1.00 đến $10.00
    price: parseFloat((Math.random() * 9 + 1).toFixed(2)),
    categoryId: defaultCategory.id,
    // Use local image path mapped by formatting the fruit name
    imageUrl: `/fruits/${formatFruitName(fruit.name)}.jpg`
  }));

  // 4. Insert hàng loạt vào Database
  await prisma.product.createMany({
    skipDuplicates: true,
    data: productData,
  });

  console.log('Database seeded successfully with API data!');
}

main().then(() => prisma.$disconnect());
