import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Fetch all products
    products: async () => {
      return await prisma.product.findMany({
        include: { category: true }
      });
    },
    // Fetch products by category
    productsByCategory: async (_: any, { categoryId }: { categoryId: string }) => {
      return await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
        include: { category: true }
      });
    },
  },
  Mutation: {
    // Create a new order
    createOrder: async (_: any, { userId, productIds }: { userId: string, productIds: string[] }) => {
      // Calculate total price (Simplified for example)
      const products = await prisma.product.findMany({
        where: { id: { in: productIds.map(Number) } }
      });
      
      const total = products.reduce((sum, p) => sum + p.price, 0);

      return await prisma.order.create({
        data: {
          userId: Number(userId),
          total,
          products: {
            connect: productIds.map(id => ({ id: Number(id) }))
          }
        },
        include: {
          user: true,
          products: true
        }
      });
    }
  }
};
