# 🍉 Fruit Shop Ecommerce

An elegant, modern, full-stack E-commerce platform built for selling fresh fruits. 

## 🎯 Mục đích dự án (Purpose)
Dự án **Fruit Shop** được xây dựng nhằm cung cấp một giải pháp thương mại điện tử hoàn chỉnh, từ giao diện người dùng bóng bẩy, mượt mà đến hệ thống quản lý dữ liệu backend mạnh mẽ. 
Dự án có thể được sử dụng làm mẫu (template) hoặc nền tảng để phát triển các ứng dụng bán hàng, giỏ hàng trực tuyến với hiệu suất cao.

## ✨ Tính năng nổi bật (Features)
- **Giao diện hiện đại (Modern UI):** Thiết kế Premium với Tailwind CSS, hỗ trợ responsive hoàn hảo trên Mobile và Desktop.
- **Trang chi tiết sản phẩm (Product Detail):** Trích xuất thông tin dinh dưỡng, quản lý số lượng thêm vào giỏ hàng.
- **Giỏ hàng thông minh (Smart Cart):** Sử dụng Zustand để quản lý state giỏ hàng (thêm, xóa, cập nhật số lượng) siêu tốc mà không cần reload trang.
- **Xác thực người dùng (Authentication):** Đăng nhập, đăng ký bằng JWT (JSON Web Tokens).
- **GraphQL API:** Truy vấn dữ liệu hiệu quả và linh hoạt từ Frontend tới Backend.
- **Database & ORM:** PostgreSQL kết hợp Prisma cho phép quản lý schema, migration và thao tác dữ liệu an toàn (Type-Safe).

## 🛠 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Apollo Client, Zustand, React Router DOM.
- **Backend:** Node.js, TypeScript, Apollo Server (GraphQL), Prisma, PostgreSQL.

## 🚀 Hướng dẫn cài đặt & Sử dụng (Quick Start)

### 1. Yêu cầu hệ thống (Prerequisites)
- Node.js (v18+)
- PostgreSQL (Có thể chạy qua Docker)

### 2. Khởi động Backend
Mở terminal, di chuyển vào thư mục `backend`:
```bash
cd backend
npm install
```
Thiết lập file `.env` (copy từ `.env.example` nếu có) và cấu hình `DATABASE_URL`.

Chạy Database qua Docker (Nếu có sẵn docker-compose):
```bash
docker-compose up -d
```

Chạy Migration & Seed data:
```bash
npx prisma migrate dev
npm run seed
```

Khởi động Server Backend:
```bash
npm run dev
```
*(Backend sẽ chạy ở `http://localhost:4000`)*

### 3. Khởi động Frontend
Mở một terminal mới, di chuyển vào thư mục `frontend`:
```bash
cd frontend
npm install
npm run dev
```
*(Frontend sẽ chạy ở `http://localhost:3000`)*

Truy cập vào trình duyệt và bắt đầu trải nghiệm!

---
*Vui lòng xem thêm chi tiết trong file `README.md` nằm ở từng thư mục `frontend` và `backend`.*
