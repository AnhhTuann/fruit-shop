# 🎨 Fruit Shop Frontend

Phần Frontend của dự án được xây dựng trên nền tảng **React (Vite)**, tập trung vào trải nghiệm người dùng (UX) và hiệu năng giao diện (UI) ở mức tối đa.

## 📦 Các Package chính (Core Packages)
- **`react` & `react-dom`**: Thư viện cốt lõi xây dựng UI.
- **`vite`**: Build tool cực nhanh, hỗ trợ HMR (Hot Module Replacement) tức thì trong lúc dev.
- **`@apollo/client` & `graphql`**: Xử lý giao tiếp API với Backend bằng GraphQL thay vì REST truyền thống.
- **`tailwindcss`**: Utility-first CSS framework giúp thiết kế giao diện linh hoạt, không cần viết file CSS rời rạc.
- **`zustand`**: Thư viện quản lý State siêu nhẹ, dùng để quản lý Giỏ hàng (Cart) và Xác thực (Auth).
- **`react-router-dom`**: Quản lý điều hướng (Routing) giữa các trang như Home, Product Detail, Profile.
- **`lucide-react`**: Bộ icon SVG đẹp, hiện đại.

## 📂 Cấu trúc thư mục (Directory Structure)

```text
frontend/src/
├── components/     # Chứa các UI Component dùng chung
│   ├── CartDrawer.tsx      # Quản lý giao diện Giỏ hàng trượt từ bên phải
│   ├── Header.tsx          # Thanh điều hướng trên cùng
│   ├── ProductCard.tsx     # Thẻ hiển thị sản phẩm thu gọn
│   └── ...
├── graphql/        # Các truy vấn (Queries) và biến đổi (Mutations) GraphQL
│   └── queries.ts          # Chứa GET_PRODUCTS, GET_PRODUCT_BY_ID, ...
├── pages/          # Chứa các component đại diện cho từng Trang
│   └── ProductDetail.tsx   # Trang xem chi tiết một trái cây
├── store/          # Quản lý Global State bằng Zustand
│   ├── authStore.ts        # Lưu trạng thái Đăng nhập, thông tin User
│   └── cartStore.ts        # Lưu danh sách món hàng trong giỏ, tính tổng tiền
├── types.ts        # Định nghĩa kiểu dữ liệu TypeScript (Product, User, CartItem)
├── App.tsx         # Component gốc, định nghĩa các Router chính
└── main.tsx        # Entry point, bọc App bằng ApolloProvider
```

## ⚙️ Cách thức hoạt động (How it works)
1. **Routing:** Khi user truy cập `/product/1`, `react-router-dom` sẽ render component `ProductDetail`.
2. **Data Fetching:** Component sử dụng hook `useQuery(GET_PRODUCT_BY_ID)` của Apollo Client để gọi API. Trong lúc chờ, UI sẽ hiển thị bộ khung tải ảo (Skeleton Loading).
3. **State Management:** Khi user nhấn "Add to Cart", hàm `addToCart` từ `cartStore` được gọi. Do Zustand quản lý state này cục bộ, số lượng hiển thị trên Header (Cart icon) sẽ lập tức tăng lên mà không cần tải lại component.
4. **Caching:** Apollo Client tự động lưu cache các response. Trở lại trang chủ (Home) sẽ lập tức load danh sách mà không phải request lại từ đầu.

## 📜 Các lệnh cơ bản (Scripts)
- `npm run dev`: Chạy server phát triển (cổng 3000).
- `npm run build`: Build dự án ra mã tĩnh (chuẩn bị đẩy lên Vercel/Netlify).
- `npm run preview`: Chạy thử file build cục bộ.

## 🖼️ Ảnh sản phẩm (Product Images)

Ảnh trái cây được lưu tại `public/fruits/` và phục vụ thẳng từ Vite static server — không cần request ra ngoài.

| File | Mô tả |
|---|---|
| `public/fruits/apple.jpg` | Ảnh từng loại trái cây, tên theo format `tên-viết-thường.jpg` |
| `public/fruits/default-fruit.jpg` | Ảnh dự phòng nếu một trái cây chưa có ảnh riêng |

Để tải ảnh về máy (thực hiện ở thư mục `backend`):
```bash
node scripts/downloadFruitImages.js
```

