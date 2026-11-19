export type ShotKind = "landing" | "dashboard" | "shop" | "crm" | "saas" | "blog" | "kit" | "edu" | "booking";

export type TemplateCategory = "commerce" | "booking" | "edu";

export type Template = {
  slug: string;
  name: string;
  seller: string;
  category: TemplateCategory;
  stack: string[];
  price: number;
  /** 16:10 screenshot in /public; altShot is shown on hover */
  shot: string;
  altShot?: string;
  /** live demo: internal route/static file, or an external prototype link */
  demo: string;
  external?: boolean;
  demoLabel?: string;
  summary: string;
  isNew?: boolean;
  /** drawn fallback while a screenshot is missing */
  kind: ShotKind;
  headline: string;
};

/** Websites designed by NewTech Studio and offered for sale. */
export const templates: Template[] = [
  {
    slug: "ticket4u",
    name: "Ticket4U — web đặt vé xem phim",
    seller: "NewTech Studio",
    category: "booking",
    stack: ["HTML/CSS", "Bootstrap", "jQuery"],
    price: 290000,
    shot: "/demos/thumbs/ve-phim.png",
    altShot: "/demos/thumbs/ve-phim-2.png",
    demo: "/demos/ve-phim/index.html",
    summary: "Lịch chiếu, chọn suất, chọn ghế, thanh toán và vé điện tử. Có chế độ sáng và tối.",
    kind: "booking",
    headline: "Phim đang chiếu",
  },
  {
    slug: "ielts-evaluator",
    name: "IELTS Evaluator Pro — nền tảng khoá học IELTS",
    seller: "NewTech Studio",
    category: "edu",
    stack: ["Figma", "Prototype"],
    price: 390000,
    shot: "/demos/thumbs/ielts.png",
    altShot: "/demos/thumbs/ielts-2.png",
    demo: "https://www.figma.com/proto/NeGUfcpGjZffniN6GyBwxb/IELTS-Evaluator-Pro---UI-UX-Prototype?node-id=278-271&t=Kvza7EK2LJBNGGBR-1&scaling=min-zoom&content-scaling=fixed&page-id=244%3A282&starting-point-node-id=278%3A271&show-proto-sidebar=1",
    external: true,
    demoLabel: "Xem prototype",
    summary: "Khoá học, đề luyện 4 kỹ năng, chấm bài Writing, theo dõi band điểm. Bản thiết kế Figma có prototype.",
    kind: "edu",
    headline: "Luyện IELTS 6.5 trong 12 tuần",
  },
  {
    slug: "showroom-xe",
    name: "Honda Bảo Huy — showroom ô tô & xe máy 3D",
    seller: "NewTech Studio",
    category: "commerce",
    stack: ["Next.js", "Three.js", "Tailwind"],
    price: 490000,
    shot: "/demos/thumbs/xe-v5.webp",
    altShot: "/demos/thumbs/xe-2-v5.webp",
    demo: "/demo/xe",
    summary: "Mô hình 3D xoay 360°, đổi màu sơn trực tiếp, so sánh thông số, tính trả góp, đặt lái thử.",
    isNew: true,
    kind: "landing",
    headline: "Chọn màu cho chiếc xe của bạn",
  },
  {
    slug: "thoi-trang",
    name: "ThreeHN Saigon Artelier — cửa hàng thời trang",
    seller: "NewTech Studio",
    category: "commerce",
    stack: ["Next.js", "Tailwind"],
    price: 390000,
    shot: "/demos/thumbs/thoi-trang-v4.webp",
    altShot: "/demos/thumbs/thoi-trang-2-v4.webp",
    demo: "/demo/thoi-trang",
    summary: "Sào đồ tương tác, lookbook, lọc theo size và màu, xem nhanh sản phẩm, giỏ hàng với VietQR, MoMo, ZaloPay.",
    isNew: true,
    kind: "shop",
    headline: "Bộ sưu tập mới",
  },
  {
    slug: "nha-hang",
    name: "Newtech Kitchen — website nhà hàng",
    seller: "NewTech Studio",
    category: "booking",
    stack: ["Next.js", "Tailwind"],
    price: 390000,
    shot: "/demos/thumbs/nha-hang-v4.png",
    altShot: "/demos/thumbs/nha-hang-2-v4.png",
    demo: "/demo/nha-hang",
    summary: "Thực đơn theo nhóm món, món đặc trưng, không gian, đánh giá và form đặt bàn.",
    isNew: true,
    kind: "booking",
    headline: "Đặt bàn tối nay",
  },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";

export const nav = [
  { label: "Template", href: "#kho-template" },
  { label: "Dashboard", href: "#kho-template" },
  { label: "Đặt UI riêng", href: "#kiem-duyet" },
  { label: "Giấy phép & giá", href: "#gia" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
];
