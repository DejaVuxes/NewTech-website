export type ShotKind = "landing" | "dashboard" | "shop" | "crm" | "saas" | "blog" | "kit" | "edu" | "booking";

export type Template = {
  slug: string;
  name: string;
  seller: string;
  category: "landing" | "dashboard" | "kit" | "pages";
  stack: string[];
  price: number;
  kind: ShotKind;
  altKind: ShotKind;
  dark?: boolean;
  headline: string;
  isNew?: boolean;
};

export const templates: Template[] = [
  { slug: "sen-saas", name: "Sen — SaaS landing", seller: "NewTech Studio", category: "landing", stack: ["Next.js", "Tailwind"], price: 390000, kind: "saas", altKind: "landing", headline: "Quản lý ca làm cho chuỗi cửa hàng", isNew: true },
  { slug: "dong-ho-admin", name: "Đồng Hồ — admin bán lẻ", seller: "NewTech Studio", category: "dashboard", stack: ["React", "shadcn/ui"], price: 590000, kind: "dashboard", altKind: "crm", dark: true, headline: "Doanh thu tuần này" },
  { slug: "cho-phien", name: "Chợ Phiên — e-commerce", seller: "NewTech Studio", category: "pages", stack: ["Next.js", "Tailwind"], price: 490000, kind: "shop", altKind: "landing", headline: "Đặc sản ba miền, giao trong ngày" },
  { slug: "la-tre-crm", name: "Lá Tre — CRM bán hàng", seller: "NewTech Studio", category: "dashboard", stack: ["Vue 3", "Tailwind"], price: 590000, kind: "crm", altKind: "dashboard", headline: "Khách hàng tiềm năng", isNew: true },
  { slug: "but-chi", name: "Bút Chì — blog & tạp chí", seller: "NewTech Studio", category: "pages", stack: ["Next.js", "MDX"], price: 290000, kind: "blog", altKind: "landing", headline: "Ghi chép của một đội sản phẩm" },
  { slug: "gom-ui-kit", name: "Gốm — UI kit 120 component", seller: "NewTech Studio", category: "kit", stack: ["React", "Figma"], price: 790000, kind: "kit", altKind: "saas", headline: "Gốm UI kit" },
  { slug: "lop-hoc", name: "Lớp Học — nền tảng khoá học", seller: "NewTech Studio", category: "pages", stack: ["Next.js", "Tailwind"], price: 490000, kind: "edu", altKind: "dashboard", headline: "Luyện IELTS 6.5 trong 12 tuần" },
  { slug: "hen-gio", name: "Hẹn Giờ — đặt lịch spa", seller: "NewTech Studio", category: "landing", stack: ["React", "Tailwind"], price: 350000, kind: "booking", altKind: "landing", dark: true, headline: "Đặt lịch chăm sóc da" },
  { slug: "nen-tang", name: "Nền Tảng — startup landing", seller: "NewTech Studio", category: "landing", stack: ["Next.js", "Tailwind"], price: 390000, kind: "landing", altKind: "saas", headline: "Ra mắt sản phẩm trong một tuần" },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";

export const nav = [
  { label: "Template", href: "#kho-template" },
  { label: "Dashboard", href: "#kho-template" },
  { label: "Đặt UI riêng", href: "#kiem-duyet" },
  { label: "Giấy phép & giá", href: "#gia" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
];
