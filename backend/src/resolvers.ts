import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Tối ưu Connection Pool: tăng maxConnections, cấu hình timeout để tránh connection leak
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                  // Số lượng connection tối đa trong pool
  idleTimeoutMillis: 30000, // Đóng connection nếu nhàn rỗi quá 30s
  connectionTimeoutMillis: 3000, // Timeout nếu không lấy được connection sau 3s
});

const adapter = new PrismaPg(pool);

// Dùng singleton Prisma Client để tránh tạo quá nhiều instance
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_in_production';
const DEFAULT_PAGE_SIZE = 20;

export const resolvers = {
  Query: {
    // Fetch current user profile and orders
    me: async (_: any, __: any, context: any) => {
      if (!context.userId) return null;
      return await prisma.user.findUnique({
        where: { id: Number(context.userId) },
        // Chỉ select các field cần thiết thay vì toàn bộ record
        select: {
          id: true,
          email: true,
          name: true,
          orders: {
            select: {
              id: true,
              total: true,
              status: true,
              createdAt: true,
              products: {
                select: { id: true, name: true, imageUrl: true, price: true }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 20, // Giới hạn 20 đơn hàng gần nhất
          }
        }
      });
    },

    // Fetch products với pagination để tránh load toàn bộ 49+ sản phẩm một lúc
    products: async (_: any, { take = DEFAULT_PAGE_SIZE, skip = 0 }: { take?: number, skip?: number }) => {
      return await prisma.product.findMany({
        take: Math.min(take, 50), // Giới hạn tối đa 50 sản phẩm/request
        skip,
        include: { category: true },
        orderBy: { id: 'asc' }, // Sắp xếp ổn định theo index
      });
    },

    // Fetch products by category (dùng index categoryId đã tạo)
    productsByCategory: async (_: any, { categoryId }: { categoryId: string }) => {
      return await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
    },

    // Fetch single product by ID
    product: async (_: any, { id }: { id: string }) => {
      return await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { category: true },
      });
    },
  },

  Mutation: {
    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({
        where: { email },
        // Chỉ lấy field cần dùng để so sánh, không kéo toàn bộ record
        select: { id: true, email: true, name: true, password: true }
      });
      if (!user) throw new Error('No user found with this email');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      // Không trả password hash về client
      const { password: _, ...safeUser } = user;
      return { token, user: safeUser };
    },

    // Create order - dùng transaction để đảm bảo tính toàn vẹn dữ liệu
    createOrder: async (_: any, { productIds }: { productIds: string[] }, context: any) => {
      if (!context.userId) throw new Error('Not authenticated');

      // Dùng Prisma Transaction: tính tiền và tạo đơn hàng trong 1 atomic operation
      return await prisma.$transaction(async (tx) => {
        const products = await tx.product.findMany({
          where: { id: { in: productIds.map(Number) } },
          select: { id: true, price: true } // Chỉ select field cần thiết
        });

        if (products.length === 0) throw new Error('No valid products found');

        const total = products.reduce((sum, p) => sum + p.price, 0);

        return await tx.order.create({
          data: {
            userId: Number(context.userId),
            total,
            products: {
              connect: productIds.map(id => ({ id: Number(id) }))
            }
          },
          include: {
            user: { select: { id: true, email: true, name: true } },
            products: { select: { id: true, name: true, price: true, imageUrl: true } }
          }
        });
      });
    }
  }
};

