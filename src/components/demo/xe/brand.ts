/**
 * BRAND CONFIG — đổi tên, hotline và logo của bạn tại đây.
 * Toàn bộ template /demo/xe chỉ đọc thương hiệu từ file này (và component <BrandLogo /> trong brand-logo.tsx).
 * "Nova Motors" là tên mẫu, không phải thương hiệu thật.
 */
export const brand = {
  name: "Nova Motors",
  short: "Nova",
  hotline: "1900 6868",
  email: "lienhe@novamotors.vn",
  showrooms: [
    { id: "hn", city: "Hà Nội", address: "68 Nguyễn Văn Cừ, Long Biên" },
    { id: "hcm", city: "TP.HCM", address: "120 Nguyễn Văn Linh, Quận 7" },
    { id: "dn", city: "Đà Nẵng", address: "45 Nguyễn Văn Linh, Hải Châu" },
  ],
} as const;
