# ⚙️ Fruit Shop Backend

Phần Backend của dự án là một **GraphQL API Server** mạnh mẽ, được xây dựng bằng Node.js, TypeScript và tương tác với cơ sở dữ liệu PostgreSQL qua Prisma ORM.

## 📦 Các Package chính (Core Packages)
- **`@apollo/server`**: Framework khởi tạo GraphQL Server chuẩn mực.
- **`graphql`**: Ngôn ngữ truy vấn dữ liệu.
- **`@prisma/client`**: Trình tạo truy vấn tự động dựa trên schema, an toàn tuyệt đối với TypeScript (Type-Safe).
- **`pg` & `@prisma/adapter-pg`**: Driver kết nối tới cơ sở dữ liệu PostgreSQL.
- **`bcryptjs`**: Băm (hash) mật khẩu của người dùng để bảo mật.
- **`jsonwebtoken` (JWT)**: Tạo token xác thực đăng nhập (Authentication).

## 📂 Cấu trúc thư mục (Directory Structure)

```text
backend/
├── prisma/                 # Thư mục cấu hình Database
│   ├── schema.prisma       # Định nghĩa bảng (Models) cho CSDL
│   ├── seed.ts             # Script nạp dữ liệu mẫu từ API (Fruityvice)
│   └── migrations/         # Lưu lịch sử thay đổi schema CSDL
├── src/                    # Chứa mã nguồn chính
│   ├── index.ts            # Entry point khởi tạo Apollo Server
│   ├── typeDefs.ts         # Định nghĩa các Schema GraphQL (Query, Mutation, Type)
│   └── resolvers.ts        # Nơi viết Logic xử lý dữ liệu cho GraphQL
├── package.json            # Chứa các script và dependencies
└── Dockerfile              # Cấu hình container đóng gói dự án
```

## ⚙️ Cách thức hoạt động (How it works)
1. **Schema & Models:** Mọi cấu trúc dữ liệu bắt đầu từ `prisma/schema.prisma`. Khi thay đổi schema, chạy lệnh `prisma generate` sẽ tạo ra các TypeScript interface tự động.
2. **GraphQL TypeDefs:** Khách hàng (Frontend) chỉ có thể yêu cầu những dữ liệu được khai báo cụ thể trong file `typeDefs.ts` (VD: `product(id: ID!): Product`).
3. **Resolvers Logic:** Khi Frontend gọi Query `product`, request sẽ được định tuyến vào `resolvers.ts`. Tại đây, backend dùng `prisma.product.findUnique` để chọc vào Database PostgreSQL lấy dữ liệu ra và trả về client.
4. **Authentication:** 
   - Hàm `login` (Mutation) sẽ tìm User, so sánh hash mật khẩu bằng `bcrypt`.
   - Nếu đúng, server tạo 1 chuỗi JWT và gửi về frontend. Frontend đính kèm JWT này vào Header của mỗi request tiếp theo.
   - Context của Apollo Server sẽ giải mã JWT để biết User nào đang thao tác (VD: Giúp hàm `createOrder` gắn đúng userId).

## 📜 Các lệnh cơ bản (Scripts)
- `npm run dev`: Chạy server dev sử dụng `ts-node` (cổng 4000).
- `npx prisma db seed`: Chạy script làm sạch & tạo dữ liệu mồi (Seed) vào Database.
- `npx prisma migrate dev`: Khởi tạo file migration mới mỗi khi thay đổi file `schema.prisma`.
- `npm run build`: Biên dịch TypeScript sang JavaScript để chạy Production.
- `npm run start`: Chạy file đã biên dịch (`node dist/index.js`).
