/** Ảnh mẫu từ Unsplash (giấy phép Unsplash, dùng miễn phí). Thay bằng ảnh sản phẩm thật khi triển khai. */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Category = "nam" | "nu" | "phu-kien";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "Free";

export type Colour = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  salePrice?: number;
  image: string;
  altImage: string;
  colours: Colour[];
  sizes: Size[];
  material: string;
  isNew?: boolean;
  /** dùng để sắp xếp "Bán chạy" */
  sold: number;
};

const C = {
  trang: { name: "Trắng ngà", hex: "#F2EFE8" },
  den: { name: "Đen", hex: "#1E1E1E" },
  be: { name: "Be", hex: "#D8C8AE" },
  nau: { name: "Nâu hạt dẻ", hex: "#7A4B2E" },
  xanh: { name: "Xanh sương", hex: "#9DB4CC" },
  reu: { name: "Xanh rêu", hex: "#5C6B4A" },
  xam: { name: "Xám chì", hex: "#8A8A8C" },
  camel: { name: "Camel", hex: "#B5865A" },
} satisfies Record<string, Colour>;

export const colourFilters: Colour[] = Object.values(C);
export const sizeFilters: Size[] = ["XS", "S", "M", "L", "XL"];

export const priceFilters = [
  { id: "duoi-500", label: "Dưới 500.000 ₫", min: 0, max: 499999 },
  { id: "500-1tr", label: "500.000 – 1.000.000 ₫", min: 500000, max: 1000000 },
  { id: "tren-1tr", label: "Trên 1.000.000 ₫", min: 1000001, max: Infinity },
] as const;

export const products: Product[] = [
  { id: "so-mi-linen", name: "Sơ mi linen cổ trụ", category: "nam", price: 590000, image: unsplash("1713881587420-113c1c43e28a"), altImage: unsplash("1591357037205-166318b51afd"), colours: [C.trang, C.xanh, C.be], sizes: ["S", "M", "L", "XL"], material: "100% linen Đà Lạt, giặt mềm", isNew: true, sold: 412 },
  { id: "so-mi-ke", name: "Sơ mi kẻ sọc Oxford", category: "nam", price: 520000, image: unsplash("1713881842156-3d9ef36418cc"), altImage: unsplash("1617117475026-2eb3e68b63cf"), colours: [C.xanh, C.trang], sizes: ["S", "M", "L", "XL"], material: "Cotton Oxford 140 gsm", sold: 268 },
  { id: "ao-thun-tron", name: "Áo thun cotton dày", category: "nam", price: 290000, salePrice: 232000, image: unsplash("1693443688057-85f57b872a3c"), altImage: unsplash("1760245773960-200dbe893696"), colours: [C.xam, C.den, C.trang], sizes: ["S", "M", "L", "XL"], material: "Cotton Mỹ 220 gsm, không xù", sold: 980 },
  { id: "mang-to-nam", name: "Măng tô dạ dáng dài", category: "nam", price: 1890000, image: unsplash("1619603364937-8d7af41ef206"), altImage: unsplash("1559907252-60b1e6e600da"), colours: [C.camel, C.den], sizes: ["M", "L", "XL"], material: "Dạ pha 60% len", isNew: true, sold: 96 },
  { id: "suit-linen", name: "Bộ vest linen sáng màu", category: "nam", price: 2450000, image: unsplash("1770662368022-0665169d45f5"), altImage: unsplash("1622192613646-1c1b077dbb9b"), colours: [C.be, C.trang], sizes: ["S", "M", "L"], material: "Linen pha cotton, lót mỏng", sold: 58 },
  { id: "len-nau", name: "Áo len dệt kim cổ tròn", category: "nu", price: 690000, image: unsplash("1773747310662-e7cc9e681226"), altImage: unsplash("1574201635302-388dd92a4c3f"), colours: [C.nau, C.xam, C.be], sizes: ["XS", "S", "M", "L"], material: "Len merino pha, dệt tại Bắc Ninh", isNew: true, sold: 322 },
  { id: "len-co-lo", name: "Áo len cổ lọ mỏng", category: "nu", price: 620000, salePrice: 496000, image: unsplash("1687275161342-8699c61e4364"), altImage: unsplash("1641642231157-0849081598a2"), colours: [C.trang, C.be], sizes: ["XS", "S", "M"], material: "Len cashmere pha 20%", sold: 205 },
  { id: "khoac-camel", name: "Áo khoác dạ camel", category: "nu", price: 1690000, image: unsplash("1618244965061-1d27b208d6e8"), altImage: unsplash("1618244972963-dbee1a7edc95"), colours: [C.camel, C.nau], sizes: ["S", "M", "L"], material: "Dạ pha 50% len, lót satin", sold: 141 },
  { id: "blazer-den", name: "Blazer đen vai suông", category: "nu", price: 1290000, image: unsplash("1592833578500-1082e18665a3"), altImage: unsplash("1613915617430-8ab0fd7c6baf"), colours: [C.den, C.xam], sizes: ["XS", "S", "M", "L"], material: "Tuyết mưa co giãn nhẹ", sold: 233 },
  { id: "quan-ong-rong", name: "Quần ống rộng cạp cao", category: "nu", price: 560000, image: unsplash("1789110853687-71692f0e86be"), altImage: unsplash("1603344797033-f0f4f587ab60"), colours: [C.be, C.trang, C.den], sizes: ["XS", "S", "M", "L"], material: "Tencel rủ, không nhăn", sold: 517 },
  { id: "dam-lua", name: "Đầm lụa hai dây", category: "nu", price: 890000, image: unsplash("1789110519342-6d3f6b07a749"), altImage: unsplash("1664076458686-3449062080ac"), colours: [C.be, C.den], sizes: ["XS", "S", "M"], material: "Lụa tơ tằm Bảo Lộc", isNew: true, sold: 88 },
  { id: "tote-da", name: "Túi tote da thật", category: "phu-kien", price: 1350000, image: unsplash("1624687943971-e86af76d57de"), altImage: unsplash("1598532163257-ae3c6b2524b6"), colours: [C.nau, C.camel], sizes: ["Free"], material: "Da bò thuộc thực vật", sold: 174 },
  { id: "deo-cheo", name: "Túi đeo chéo nắp gập", category: "phu-kien", price: 890000, salePrice: 712000, image: unsplash("1600857062241-98e5dba7f214"), altImage: unsplash("1511405946472-a37e3b5ccd47"), colours: [C.nau, C.den], sizes: ["Free"], material: "Da bò, khoá đồng", sold: 302 },
  { id: "sneaker-trang", name: "Giày sneaker da trắng", category: "phu-kien", price: 1150000, image: unsplash("1599670998937-441a3a74b2f1"), altImage: unsplash("1637868796504-32f45a96d5a0"), colours: [C.trang], sizes: ["S", "M", "L"], material: "Da bò, đế cao su tự nhiên", sold: 266 },
];

export const categories: { id: Category; label: string; image: string; note: string }[] = [
  { id: "nu", label: "Nữ", image: unsplash("1618333452884-5c8d211ed2ad"), note: "Len, dạ, lụa cho mùa lạnh" },
  { id: "nam", label: "Nam", image: unsplash("1627138510245-445e78928d1c"), note: "Sơ mi, vest, măng tô" },
  { id: "phu-kien", label: "Phụ kiện", image: unsplash("1575032617751-6ddec2089882"), note: "Túi da, giày, thắt lưng" },
];

export const sizeGuide = [
  { size: "XS", chest: "80–84", waist: "62–66", height: "150–155" },
  { size: "S", chest: "84–88", waist: "66–70", height: "155–160" },
  { size: "M", chest: "88–94", waist: "70–76", height: "160–168" },
  { size: "L", chest: "94–100", waist: "76–82", height: "168–175" },
  { size: "XL", chest: "100–106", waist: "82–88", height: "175–182" },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";
export const priceOf = (p: Product) => p.salePrice ?? p.price;
