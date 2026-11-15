/** Nội dung mẫu: thay ảnh, món, giá cho nhà hàng của bạn. Ảnh: Unsplash (miễn phí). */
export const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const photos = {
  hero: "1582878826629-29b7ad1cdc43",
  spread: "1641440615059-42c8ed3af8c8",
  chef: "1600565193348-f74bd3c7ccdf",
  plating: "1577219491135-ce391730fb2c",
  lanterns: "1557770401-95a068e9440e",
  roomWood: "1766832255363-c9f060ade8b0",
  roomTable: "1544148103-0773bf10d330",
  roomEvening: "1602232037779-30b01ac3c457",
  roomLight: "1551632436-cbf8dd35adfa",
};

export type Dish = {
  name: string;
  desc: string;
  price: number;
  veg?: boolean;
  spicy?: boolean;
  signature?: boolean;
  photo?: string;
};

export type MenuCategory = { id: string; label: string; dishes: Dish[] };

export const menu: MenuCategory[] = [
  {
    id: "khai-vi",
    label: "Khai vị",
    dishes: [
      { name: "Gỏi cuốn tôm thịt", desc: "Bánh tráng phơi sương, rau thơm vườn, chấm tương đậu phộng.", price: 85000, photo: "1618406854423-ef169758d6a6" },
      { name: "Nem rán Hà Nội", desc: "Cuốn bánh đa nem, nhân thịt, mộc nhĩ, miến; rán hai lần cho giòn lâu.", price: 95000, signature: true, photo: "1695712641569-05eee7b37b6d" },
      { name: "Gỏi ngó sen", desc: "Ngó sen giòn, rau răm, lạc rang, nước trộn chanh tỏi.", price: 89000, veg: true },
      { name: "Đậu hũ non chiên sả ớt", desc: "Đậu nhà làm mỗi sáng, sả phi vàng, ớt sừng.", price: 75000, veg: true, spicy: true },
    ],
  },
  {
    id: "mon-chinh",
    label: "Món chính",
    dishes: [
      { name: "Phở bò tái lăn", desc: "Nước dùng ninh xương 12 giờ, thịt bò tái lăn gừng tỏi.", price: 95000, signature: true, photo: "1582878826629-29b7ad1cdc43" },
      { name: "Thịt kho tộ", desc: "Ba chỉ kho nước dừa trong niêu đất, ăn kèm dưa cải muối.", price: 145000, photo: "1628997323766-c846909a7049" },
      { name: "Cá nướng than hoa", desc: "Cá lóc đồng ướp riềng mẻ, nướng than, cuốn bánh tráng.", price: 265000, signature: true, photo: "1551014700-0ca41391f312" },
      { name: "Bún chả que tre", desc: "Chả kẹp que tre nướng than, nước chấm đu đủ xanh.", price: 89000 },
      { name: "Cơm rang lá é", desc: "Gạo tám thơm, nấm hương, lá é Đà Lạt.", price: 99000, veg: true },
    ],
  },
  {
    id: "lau",
    label: "Lẩu",
    dishes: [
      { name: "Lẩu riêu cua sườn sụn", desc: "Gạch cua đồng, sườn sụn, đậu rán, chuối xanh. Cho 2–3 người.", price: 425000, photo: "1614104030967-5ca61a54247b" },
      { name: "Lẩu gà lá é", desc: "Gà ta thả vườn, lá é, măng chua. Cho 2–3 người.", price: 395000 },
      { name: "Lẩu Thái hải sản", desc: "Tôm, mực, nghêu, nước lẩu chua cay sả tắc. Cho 3–4 người.", price: 485000, spicy: true },
    ],
  },
  {
    id: "trang-mieng",
    label: "Tráng miệng",
    dishes: [
      { name: "Xôi xoài nước cốt dừa", desc: "Xôi nếp cái hoa vàng, xoài cát chín cây.", price: 65000, veg: true, photo: "1705234384751-84081009588e" },
      { name: "Chè khúc bạch", desc: "Khúc bạch hạnh nhân, vải, nhãn, nước đường phèn.", price: 55000, veg: true },
      { name: "Bánh flan cà phê", desc: "Caramel đắng nhẹ, cà phê phin rưới tại bàn.", price: 45000, veg: true },
    ],
  },
  {
    id: "do-uong",
    label: "Đồ uống",
    dishes: [
      { name: "Cà phê sữa đá", desc: "Robusta Cầu Đất pha phin, sữa đặc.", price: 45000, veg: true, photo: "1461023058943-07fcbe16d735" },
      { name: "Trà sen Tây Hồ", desc: "Trà Thái Nguyên ướp gạo sen, ấm cho 2 người.", price: 120000, veg: true },
      { name: "Nước sấu ngâm", desc: "Sấu non ngâm đường phèn, gừng.", price: 39000, veg: true },
      { name: "Rượu mơ Yên Tử", desc: "Ngâm 18 tháng, ly 50ml.", price: 59000, veg: true },
    ],
  },
];

export const signatures = menu.flatMap((c) => c.dishes.filter((d) => d.signature).map((d) => ({ ...d, category: c.label })));

export const reviews = [
  { quote: "Nước phở trong mà ngọt sâu, đúng vị Hà Nội tôi nhớ. Nhân viên nhớ cả việc tôi không ăn hành.", name: "Chị Thu Hà", source: "Google, tháng 9" },
  { quote: "Cá nướng than lên bàn còn xèo xèo, cuốn bánh tráng ăn mãi không chán. Phòng riêng hợp đi gia đình.", name: "Anh Minh Quân", source: "Foody, tháng 8" },
  { quote: "Không gian yên, bát đĩa men lam rất đẹp. Đặt bàn qua web nhận xác nhận ngay trong một phút.", name: "Chị Lan Anh", source: "Google, tháng 10" },
];

export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";
