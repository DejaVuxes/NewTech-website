# NewTech website — Honda Bảo Huy demo

## Chạy nhánh demo xe

Yêu cầu Node.js **20.9 trở lên** và npm. Cài đặt thư viện theo `package-lock.json`:

```bash
git clone --branch demo-web-xe-done https://github.com/DejaVuxes/NewTech-website.git
cd NewTech-website
npm ci
npm run dev
```

Nếu đã clone repository:

```bash
git fetch origin
git switch --track origin/demo-web-xe-done
npm ci
npm run dev
```

Mở **http://localhost:3000/demo/xe**. Các link chọn nhanh xe máy:

- PCX: http://localhost:3000/demo/xe?xe=u125
- CB 300F Twister: http://localhost:3000/demo/xe?xe=st300
- CB500X: http://localhost:3000/demo/xe?xe=c650

### Model và ảnh đã đi kèm repository

- Sáu model GLB nằm trong `public/models/honda/`, tổng dung lượng khoảng 26,6 MB.
- Sáu ảnh sản phẩm và logo nằm trong `public/images/honda/`.
- GLB đã đóng gói texture bên trong; bộ giải nén Meshopt được import từ gói
  `three` và đóng gói cùng ứng dụng, không tải decoder từ CDN.
- Không cần Unity, Blender, file ZIP trong Downloads, Git LFS hay biến môi trường
  riêng để xem các model. Chỉ model được chọn mới được tải.
- Trình duyệt cần hỗ trợ WebGL. Nếu tải lỗi, thử tải lại trang hoặc kiểm tra tab
  Network xem đường dẫn `/models/honda/*.glb` có trả về HTTP 200 hay không.
- Nguồn model và ảnh: `public/models/honda/CREDITS.md` và
  `public/images/honda/SOURCES.md`. Phần ghi công có trong chân trang demo xe.

Khi cài thư viện và build lần đầu cần kết nối Internet; dự án dùng Google Fonts.
Các trang demo khác vẫn có thể dùng ảnh từ nguồn bên ngoài như Unsplash.

Kiểm tra bản production:

```bash
npm run build
npm start
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
