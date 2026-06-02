import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fruitshop.com' },
    update: {},
    create: {
      email: 'admin@fruitshop.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  // 2. Create Categories
  const citrus = await prisma.category.upsert({
    where: { name: 'Citrus' },
    update: {},
    create: { name: 'Citrus', description: 'Fresh and tangy citrus fruits' },
  });

  const tropical = await prisma.category.upsert({
    where: { name: 'Tropical' },
    update: {},
    create: { name: 'Tropical', description: 'Exotic tropical fruits' },
  });

  // 3. Create Products
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Navel Orange',
        description: 'Sweet, seedless oranges perfect for snacking.',
        price: 1.50,
        categoryId: citrus.id,
        imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lemon',
        description: 'Tart lemons ideal for cooking and beverages.',
        price: 0.80,
        categoryId: citrus.id,
        imageUrl: 'https://images.unsplash.com/photo-1588612140409-566fc6841753?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mango',
        description: 'Juicy, ripe tropical mangos.',
        price: 2.99,
        categoryId: tropical.id,
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Pineapple',
        description: 'Sweet and golden whole pineapple.',
        price: 4.50,
        categoryId: tropical.id,
        imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80'
      }
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
