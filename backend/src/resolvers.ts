import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_in_production';

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
    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

      return {
        token,
        user,
      };
    },
    
    // Create a new order (Protected)
    createOrder: async (_: any, { productIds }: { productIds: string[] }, context: any) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      // Calculate total price (Simplified for example)
      const products = await prisma.product.findMany({
        where: { id: { in: productIds.map(Number) } }
      });
      
      const total = products.reduce((sum, p) => sum + p.price, 0);

      return await prisma.order.create({
        data: {
          userId: Number(context.userId),
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
