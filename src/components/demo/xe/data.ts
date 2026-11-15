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
  specs: Spec[];
};

export const models: Model[] = [
  {
    id: "s3",
    type: "car",
    name: "Nova S3",
    tagline: "Sedan hạng C, 5 chỗ, động cơ hybrid",
    price: 899_000_000,
    shape: "sedan",
    specs: [
      { label: "Động cơ", value: "1.8L Hybrid" },
      { label: "Công suất", value: "140 mã lực" },
      { label: "Tăng tốc 0–100 km/h", value: "8,9 giây" },
      { label: "Tiêu hao nhiên liệu", value: "4,2 L/100 km" },
      { label: "Số chỗ ngồi", value: "5" },
    ],
  },
  {
    id: "x5",
    type: "car",
    name: "Nova X5",
    tagline: "SUV 7 chỗ, dẫn động 4 bánh",
    price: 1_290_000_000,
    shape: "suv",
    specs: [
      { label: "Động cơ", value: "2.5L Hybrid AWD" },
      { label: "Công suất", value: "218 mã lực" },
      { label: "Tăng tốc 0–100 km/h", value: "8,1 giây" },
      { label: "Tiêu hao nhiên liệu", value: "5,6 L/100 km" },
      { label: "Số chỗ ngồi", value: "7" },
    ],
  },
  {
    id: "gt",
    type: "car",
    name: "Nova GT",
    tagline: "Coupe thể thao 2+2, dẫn động cầu sau",
    price: 1_690_000_000,
    shape: "coupe",
    specs: [
      { label: "Động cơ", value: "2.0L Turbo" },
      { label: "Công suất", value: "300 mã lực" },
      { label: "Tăng tốc 0–100 km/h", value: "5,4 giây" },
      { label: "Tiêu hao nhiên liệu", value: "7,9 L/100 km" },
      { label: "Số chỗ ngồi", value: "4" },
    ],
  },
  {
    id: "u125",
    type: "bike",
    name: "Nova Urban 125",
    tagline: "Xe tay ga đô thị, cốp 30 lít",
    price: 46_900_000,
    shape: "scooter",
    specs: [
      { label: "Động cơ", value: "125 cc, 4 thì" },
      { label: "Công suất", value: "11,3 mã lực" },
      { label: "Trọng lượng", value: "118 kg" },
      { label: "Tiêu hao nhiên liệu", value: "2,1 L/100 km" },
      { label: "Chiều cao yên", value: "765 mm" },
    ],
  },
  {
    id: "st300",
    type: "bike",
    name: "Nova Street 300",
    tagline: "Naked bike 2 xi-lanh, ABS 2 kênh",
    price: 129_000_000,
    shape: "naked",
    specs: [
      { label: "Động cơ", value: "300 cc, 2 xi-lanh" },
      { label: "Công suất", value: "38 mã lực" },
      { label: "Trọng lượng", value: "164 kg" },
      { label: "Tiêu hao nhiên liệu", value: "3,4 L/100 km" },
      { label: "Chiều cao yên", value: "795 mm" },
    ],
  },
  {
    id: "c650",
    type: "bike",
    name: "Nova Café 650",
    tagline: "Café racer cổ điển, tay lái thấp",
    price: 219_000_000,
    shape: "cafe",
    specs: [
      { label: "Động cơ", value: "650 cc, 2 xi-lanh" },
      { label: "Công suất", value: "47 mã lực" },
      { label: "Trọng lượng", value: "198 kg" },
      { label: "Tiêu hao nhiên liệu", value: "4,1 L/100 km" },
      { label: "Chiều cao yên", value: "804 mm" },
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
