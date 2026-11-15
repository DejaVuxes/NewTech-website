export type VehicleType = "car" | "bike";
export type CarShape = "sedan" | "suv" | "coupe";
export type BikeShape = "scooter" | "naked" | "cafe";

export type Spec = { label: string; value: string };

export type Model = {
  id: string;
  type: VehicleType;
  name: string;
  tagline: string;
  price: number;
  shape: CarShape | BikeShape;
  photo: string;
  specs: Spec[];
  asset?: {
    src: string;
    paintMaterial: string;
    rimMaterial?: string;
    creator: string;
    source: string;
    license: string;
    licenseUrl: string;
  };
};

export const models: Model[] = [
  {
    id: "s3",
    type: "car",
    name: "Honda Civic RS",
    photo: "/images/honda/civic-rs.webp",
    tagline: "Sedan thể thao 5 chỗ, động cơ VTEC Turbo",
    price: 889_000_000,
    shape: "sedan",
    asset: {
      src: "/models/honda/civic-rs.glb",
      paintMaterial: "^premium_crystal_red_metallic(?: \\[|_CENSOR|_sukima)",
      creator: "geyges",
      source: "https://sketchfab.com/3d-models/honda-civic-rs-24cdb4612a394cf4827326dbad0126a5",
      license: "Sketchfab Free Standard",
      licenseUrl: "https://sketchfab.com/licenses",
    },
    specs: [
      { label: "Động cơ", value: "1.5L VTEC Turbo" },
      { label: "Công suất", value: "176 mã lực" },
      { label: "Hộp số", value: "Vô cấp CVT" },
      { label: "Tiêu hao nhiên liệu", value: "6,94 L/100 km" },
      { label: "Số chỗ ngồi", value: "5" },
    ],
  },
  {
    id: "x5",
    type: "car",
    name: "Honda CR-V 2026",
    photo: "/images/honda/cr-v.webp",
    tagline: "SUV gia đình, phiên bản e:HEV RS hybrid",
    price: 1_250_000_000,
    shape: "suv",
    asset: {
      src: "/models/honda/cr-v.glb",
      paintMaterial: "^R_81_BODY_PAINT ",
      rimMaterial: "^NH_547_MIRROR_wheel ",
      creator: "geyges",
      source: "https://sketchfab.com/3d-models/honda-cr-v-2026-806e25ce44ed441c93ef265dcfe135f9",
      license: "Sketchfab Free Standard",
      licenseUrl: "https://sketchfab.com/licenses",
    },
    specs: [
      { label: "Động cơ", value: "2.0L e:HEV Hybrid" },
      { label: "Công suất", value: "204 mã lực" },
      { label: "Hộp số", value: "e-CVT" },
      { label: "Tiêu hao nhiên liệu", value: "5,2 L/100 km" },
      { label: "Số chỗ ngồi", value: "5" },
    ],
  },
  {
    id: "gt",
    type: "car",
    name: "Honda Vezel RS (HR-V)",
    photo: "/images/honda/hr-v.webp",
    tagline: "SUV đô thị 5 chỗ, phong cách thể thao RS",
    price: 871_000_000,
    shape: "suv",
    asset: {
      src: "/models/honda/hr-v.glb",
      paintMaterial: "^M_Body_(?:PremiumCrystalRed|CrystalBlack)(?: \\[|_Blocker)",
      rimMaterial: "^M_RIM_Common_Black ",
      creator: "geyges",
      source: "https://sketchfab.com/3d-models/honda-vezel-rs-hr-v-c324676fb14b4effafe5eacb45d2d415",
      license: "Sketchfab Free Standard",
      licenseUrl: "https://sketchfab.com/licenses",
    },
    specs: [
      { label: "Động cơ", value: "1.5L VTEC Turbo" },
      { label: "Công suất", value: "174 mã lực" },
      { label: "Hộp số", value: "Vô cấp CVT" },
      { label: "Tiêu hao nhiên liệu", value: "6,7 L/100 km" },
      { label: "Số chỗ ngồi", value: "5" },
    ],
  },
  {
    id: "u125",
    type: "bike",
    name: "Honda PCX 160 ABS",
    photo: "/images/honda/pcx.webp",
    tagline: "Xe tay ga eSP+, phanh ABS, cốp 27 lít",
    price: 87_000_000,
    shape: "scooter",
    asset: {
      src: "/models/honda/pcx.glb",
      paintMaterial: "^Body$",
      creator: "DevanirGrau",
      source: "https://sketchfab.com/3d-models/honda-pcx-cb4b2c153e204b88bd3848af1157eb47",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    specs: [
      { label: "Động cơ", value: "156,9 cc, eSP+" },
      { label: "Công suất", value: "16 mã lực" },
      { label: "Trọng lượng", value: "131 kg" },
      { label: "Tiêu hao nhiên liệu", value: "Theo điều kiện sử dụng" },
      { label: "Chiều cao yên", value: "764 mm" },
    ],
  },
  {
    id: "st300",
    type: "bike",
    name: "Honda CB 300F Twister",
    photo: "/images/honda/twister-300.webp",
    tagline: "Naked bike 1 xi-lanh, hộp số 6 cấp, phanh ABS",
    price: 129_000_000,
    shape: "naked",
    asset: {
      src: "/models/honda/twister-300.glb",
      paintMaterial: "^(?:cor_moto\\.002|Matte__FFFF0000__spec_\\.003)(?: Vermelha)?$",
      creator: "DevanirGrau",
      source: "https://sketchfab.com/3d-models/honda-twister-300-00113e0c1e724703ab14ebaaeb9aa1c5",
      license: "Sketchfab Free Standard",
      licenseUrl: "https://sketchfab.com/licenses",
    },
    specs: [
      { label: "Động cơ", value: "293,5 cc, 1 xi-lanh" },
      { label: "Công suất", value: "24,5 mã lực (xăng)" },
      { label: "Trọng lượng", value: "139 kg (khô)" },
      { label: "Tiêu hao nhiên liệu", value: "Theo điều kiện sử dụng" },
      { label: "Chiều cao yên", value: "789 mm" },
    ],
  },
  {
    id: "c650",
    type: "bike",
    name: "Honda CB500X",
    photo: "/images/honda/cb500x.webp",
    tagline: "Adventure touring 2 xi-lanh, phanh ABS",
    price: 219_000_000,
    shape: "naked",
    asset: {
      src: "/models/honda/cb500x.glb",
      paintMaterial: "^azul(?: Vermelha| Verde)?$",
      creator: "DevanirGrau",
      source: "https://sketchfab.com/3d-models/honda-cb500x-c2e1bff4afa34fc0b1957a5c418d666a",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    specs: [
      { label: "Động cơ", value: "471 cc, 2 xi-lanh" },
      { label: "Công suất", value: "35 kW (47,6 PS)" },
      { label: "Trọng lượng", value: "199 kg" },
      { label: "Tiêu hao nhiên liệu", value: "3,6 L/100 km" },
      { label: "Chiều cao yên", value: "830 mm" },
    ],
  },
];

export type Paint = { id: string; name: string; hex: string; car: number; bike: number };

/** Giá cộng thêm theo loại xe (ô tô / xe máy). */
export const paints: Paint[] = [
  { id: "pearl", name: "Trắng ngọc trai", hex: "#E6E7E3", car: 12_000_000, bike: 1_000_000 },
  { id: "graphite", name: "Đen graphite", hex: "#1C2026", car: 0, bike: 0 },
  { id: "titan", name: "Xám titan", hex: "#7C848C", car: 0, bike: 0 },
  { id: "ocean", name: "Xanh đại dương", hex: "#1F4C78", car: 8_000_000, bike: 800_000 },
  { id: "ruby", name: "Đỏ ruby", hex: "#8C1C26", car: 8_000_000, bike: 800_000 },
  { id: "signal", name: "Vàng tín hiệu", hex: "#E3B21A", car: 15_000_000, bike: 1_500_000 },
];

export type Rim = { id: string; name: string; hex: string; metalness: number; roughness: number; car: number; bike: number };

export const rims: Rim[] = [
  { id: "silver", name: "Bạc phay xước", hex: "#C9CDD1", metalness: 1, roughness: 0.28, car: 0, bike: 0 },
  { id: "black", name: "Đen bóng", hex: "#22262B", metalness: 0.7, roughness: 0.18, car: 6_000_000, bike: 600_000 },
  { id: "bronze", name: "Đồng thể thao", hex: "#8E6A3E", metalness: 1, roughness: 0.32, car: 18_000_000, bike: 2_400_000 },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(Math.round(n)) + " ₫";

export const typeLabel: Record<VehicleType, string> = { car: "Ô tô", bike: "Xe máy" };
