/**
 * ĐỔI THƯƠNG HIỆU Ở ĐÂY.
 * Toàn bộ tên, logo, địa chỉ, giờ mở cửa của template nhà hàng đều đọc từ file này.
 * Thay các giá trị mẫu dưới đây bằng thông tin nhà hàng của bạn; logo dùng chung nằm ở src/components/newtech-logo.tsx
 * (hoặc thay bằng <Image src="/logo.svg" /> của bạn).
 */
export const brand = {
  name: "Newtech Kitchen",
  short: "NK", // tiền tố mã đặt bàn
  tagline: "Cơm Việt nấu chậm",
  phone: "12345678",
  phoneHref: "tel:12345678",
  email: "datban@newtechkitchen.vn",
  address: "268 Lý Thường Kiệt, Phường Diên Hồng, TP. Hồ Chí Minh",
  mapsHref: "https://maps.google.com/?q=268+Ly+Thuong+Kiet+TP+Ho+Chi+Minh",
  since: 2014,
  seats: 64,
  hours: [
    { days: "Thứ Hai – Thứ Sáu", time: "10:30 – 14:00, 17:00 – 22:00" },
    { days: "Thứ Bảy, Chủ Nhật", time: "10:00 – 22:30" },
    { days: "Ngày lễ", time: "Mở cửa, nên đặt bàn trước" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;
