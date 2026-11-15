/**
 * BRAND CONFIG — đổi tên, hotline và logo của bạn tại đây.
 * Toàn bộ template /demo/xe chỉ đọc thương hiệu từ file này (logo dùng chung nằm ở src/components/newtech-logo.tsx).
 * "Newtech Car" là tên mẫu, không phải thương hiệu thật.
 */
export const brand = {
  name: "Newtech Car",
  short: "Newtech",
  hotline: "12345678",
  email: "lienhe@newtechcar.vn",
  showrooms: [
    { id: "hcm", city: "TP. Hồ Chí Minh", address: "268 Lý Thường Kiệt, Phường Diên Hồng" },
  ],
} as const;
