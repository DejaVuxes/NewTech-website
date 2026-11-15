/**
 * ĐỔI THƯƠNG HIỆU Ở ĐÂY.
 * Toàn bộ tên, logo, địa chỉ, giờ mở cửa của template nhà hàng đều đọc từ file này.
 * Thay các giá trị mẫu dưới đây bằng thông tin nhà hàng của bạn; logo nằm ở `Logo` trong logo.tsx
 * (hoặc thay bằng <Image src="/logo.svg" /> của bạn).
 */
export const brand = {
  name: "Bếp Nhà Mây",
  short: "NM", // chữ trong logo monogram mẫu
  tagline: "Cơm Việt nấu chậm",
  phone: "0901 234 567",
  phoneHref: "tel:0901234567",
  email: "datban@bepnhamay.vn",
  address: "24 Ngõ Hoa Sữa, Phường Văn Miếu, Hà Nội",
  mapsHref: "https://maps.google.com/?q=Van+Mieu+Ha+Noi",
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
