import type { GarmentKind, RailGarment } from "@/components/ui/product-rail-gallery";

// Garment views supplied with the clothing rail component reference.
const pieces: { id: string; name: string; kind: GarmentKind; color: string; description: string }[] = [
  { id: "bone-tee", name: "Áo thun cotton màu kem", kind: "tee", color: "#EFEBE2", description: "Phom suông, cổ tròn và chất cotton dày dặn." },
  { id: "cc-graphic", name: "Áo thun graphic đen", kind: "tee", color: "#101214", description: "Họa tiết in ở cả mặt trước và mặt sau trên nền đen." },
  { id: "oxford-sky", name: "Sơ mi Oxford xanh nhạt", kind: "shirt", color: "#A3D3EB", description: "Cổ cài nút, túi ngực và sắc xanh dịu nhẹ." },
  { id: "cardigan-olive", name: "Cardigan len xanh olive", kind: "knit", color: "#758151", description: "Len đan nổi, cổ chữ V và hàng nút gỗ." },
  { id: "hoodie-heather", name: "Hoodie xám melange", kind: "hoodie", color: "#A0A5AB", description: "Mũ trùm rộng, túi trước và bo tay mềm mại." },
  { id: "sweat-lilac", name: "Sweatshirt tím lilac", kind: "knit", color: "#CCB2E0", description: "Áo nỉ cổ tròn với sắc tím nhẹ và hình in nổi." },
  { id: "polo-forest", name: "Polo xanh rừng", kind: "tee", color: "#185B37", description: "Cổ bẻ hai nút, chất vải piqué và hình thêu trước ngực." },
  { id: "henley-brick", name: "Henley đỏ gạch", kind: "knit", color: "#B05139", description: "Tay dài, cổ ba nút và tông đỏ gạch trầm." },
  { id: "breton", name: "Áo dài tay kẻ Breton", kind: "knit", color: "#E4DFD3", description: "Cổ thuyền và những đường kẻ tương phản trên nền kem." },
  { id: "oversized-ochre", name: "Áo thun oversized vàng đất", kind: "tee", color: "#DE9C31", description: "Phom rộng, vai trễ và hình in lớn phía sau." },
];

export const railGarments: RailGarment[] = pieces.map((piece) => ({
  ...piece,
  image: `/images/fashion/rail/${piece.id}-front.webp`,
  backImage: `/images/fashion/rail/${piece.id}-back.webp`,
  sideImage: `/images/fashion/rail/${piece.id}-side.webp`,
}));
