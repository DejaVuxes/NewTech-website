import Image from "next/image";
import { ExternalLink, Quote, Star } from "lucide-react";
import { brand } from "./brand";
import { formatVnd, img, photos, reviews, signatures } from "./data";

function SectionHead({ id, title, lead }: { id?: string; title: string; lead?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <h2 id={id} className="display text-[32px] font-extrabold text-ink sm:text-[48px] lg:col-span-7">
        {title}
      </h2>
      {lead && <p className="self-end text-[16px] text-ink-muted lg:col-span-4 lg:col-start-9">{lead}</p>}
    </div>
  );
}

/** Món đặc trưng: một món lớn bên trái, hai món nhỏ bên phải, không đóng khung thẻ. */
export function Signatures() {
  const [first, ...rest] = signatures;
  return (
    <section aria-labelledby="mon-dac-trung" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
        <SectionHead
          id="mon-dac-trung"
          title="Ba món khách quay lại để gọi"
          lead="Mỗi món mất từ một đến mười hai tiếng chuẩn bị. Chúng tôi chỉ nấu đủ số suất trong ngày."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <figure className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={img(first.photo!, 1400)} alt={first.name} fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span>
                <span className="display block text-[24px] font-extrabold text-ink">{first.name}</span>
                <span className="text-ink-muted">{first.desc}</span>
              </span>
              <span className="display shrink-0 text-[24px] font-extrabold text-brand">{formatVnd(first.price)}</span>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-12 lg:col-span-5 lg:justify-center">
            {rest.map((d) => (
              <figure key={d.name} className="grid grid-cols-[120px_1fr] items-center gap-6 sm:grid-cols-[200px_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image src={img(d.photo!, 600)} alt={d.name} fill sizes="200px" className="object-cover" />
                </div>
                <figcaption>
                  <span className="text-[14px] text-ink-muted">{d.category}</span>
                  <span className="display mt-1 block text-[24px] font-extrabold text-ink">{d.name}</span>
                  <span className="mt-2 block text-ink-muted">{d.desc}</span>
                  <span className="display mt-2 block text-[20px] font-extrabold text-brand">{formatVnd(d.price)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="cau-chuyen" aria-labelledby="cau-chuyen-title" className="scroll-mt-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image src={img(photos.chef, 1000)} alt="Bếp trưởng đang đảo chảo trên lửa lớn" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 right-4 hidden w-[45%] overflow-hidden rounded-xl border-[8px] border-paper sm:block">
            <div className="relative aspect-square">
              <Image src={img(photos.plating, 600)} alt="Bếp trưởng bày món" fill sizes="240px" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <h2 id="cau-chuyen-title" className="display text-[32px] font-extrabold text-ink sm:text-[48px]">
            Sinh Viên Bách Khoa
          </h2>
          <p className="mt-6 text-ink-muted">
            Nguyên Phạm lớn lên ở Hải Phòng. Năm 2024, anh đậu Bách Khoa Hồ Chí Minh với một nguyên tắc: Quyết tâm không học lại.
          </p>
          <blockquote className="mt-8 border-l-2 border-brand pl-6">
            <Quote className="size-6 stroke-[1.5] text-brand" aria-hidden />
            <p className="display mt-2 text-[24px] font-extralight leading-[1.3] text-ink">
              Tôi là sinh viên Bách Khoa
            </p>
            <footer className="mt-4 text-[14px] text-ink-muted">Nguyên Phạm, sinh viên HCMUT</footer>
          </blockquote>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t sm:gap-6 border-line pt-6">
            {[
              { k: "12 giờ", v: "ninh nước dùng mỗi ngày" },
              { k: "5:30", v: "giờ đi chợ" },
              { k: "trang trại", v: "rau sạch" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="display text-[20px] font-extrabold text-ink sm:text-[24px]">{s.k}</dt>
                <dd className="mt-1 text-[14px] text-ink-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Space() {
  const shots = [
    { id: photos.lanterns, alt: "Sảnh chính với đèn lồng thả trần", cls: "col-span-2 row-span-2" },
    { id: photos.roomWood, alt: "Phòng riêng với kệ gỗ và bàn trải khăn trắng", cls: "" },
    { id: photos.roomTable, alt: "Bàn tròn gỗ cạnh cửa sổ", cls: "" },
    { id: photos.roomEvening, alt: "Khu bàn dài buổi tối", cls: "col-span-2" },
  ];
  return (
    <section id="khong-gian" aria-labelledby="khong-gian-title" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
        <SectionHead
          id="khong-gian-title"
          title="Ba tầng, một phòng riêng cho gia đình"
          lead={`Sảnh chính ${brand.seats - 12} chỗ, phòng riêng tầng ba nhận tối đa 12 khách, có màn chiếu cho tiệc sinh nhật và gặp mặt.`}
        />
        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4 md:gap-6 lg:auto-rows-[240px]">
          {shots.map((s) => (
            <div key={s.id} className={`relative overflow-hidden rounded-xl ${s.cls}`}>
              <Image src={img(s.id, 1000)} alt={s.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="danh-gia" className="border-t border-line bg-brand text-primary-foreground dark:bg-surface dark:text-ink">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="danh-gia" className="display max-w-[40rem] text-[32px] font-extrabold sm:text-[48px]">
            Khách nói gì sau bữa ăn
          </h2>
          <p className="flex items-center gap-2 text-[16px]">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-accent stroke-accent stroke-[1.5]" />
              ))}
            </span>
            <span>4,8 trên 1.260 đánh giá Google</span>
          </p>
        </div>
        <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-6">
          {reviews.map((r) => (
            <li key={r.quote} className="border-t border-current/25 pt-6">
              <p className="text-[20px] leading-[1.5]">&ldquo;{r.quote}&rdquo;</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="lien-he" aria-labelledby="lien-he-title" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <h2 id="lien-he-title" className="display text-[32px] font-extrabold text-ink sm:text-[48px]">
            Tìm đường đến bếp
          </h2>
          <p className="mt-6 text-[20px] text-ink">{brand.address}</p>
          <p className="mt-2 text-ink-muted">Gửi xe máy miễn phí trước cửa. Ô tô gửi tại bãi xe gần nhất, cách 200 m.</p>
          <table className="mt-8 w-full text-left">
            <caption className="sr-only">Giờ mở cửa</caption>
            <tbody>
              {brand.hours.map((h) => (
                <tr key={h.days} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 align-top font-semibold text-ink">
                    {h.days}
                  </th>
                  <td className="py-4 text-ink-muted">{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex flex-wrap gap-6">
            <a href={brand.phoneHref} className="font-semibold text-brand underline decoration-1 underline-offset-4">
              {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="font-semibold text-brand underline decoration-1 underline-offset-4">
              {brand.email}
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <MapPlaceholder />
        </div>
      </div>
    </section>
  );
}

/** Bản đồ minh hoạ. Thay bằng iframe Google Maps / Mapbox của bạn. */
function MapPlaceholder() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-brand-soft">
      <svg viewBox="0 0 600 450" className="absolute inset-0 size-full text-brand" aria-hidden preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="14" strokeLinecap="round">
          <path d="M-20 120 L620 90" />
          <path d="M-20 330 L620 360" />
          <path d="M160 -20 L200 470" />
          <path d="M430 -20 L400 470" />
        </g>
        <g fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="6">
          <path d="M-20 220 L620 230" />
          <path d="M300 -20 L310 470" />
          <path d="M60 -20 L80 470" />
          <path d="M520 -20 L540 470" />
        </g>
        <rect x="210" y="130" width="180" height="90" rx="6" fill="currentColor" fillOpacity="0.12" />
        <text x="300" y="182" textAnchor="middle" fontSize="14" fill="currentColor" fillOpacity="0.7">
          ĐH Bách Khoa
        </text>
      </svg>
      <div className="absolute left-[52%] top-[62%] -translate-x-1/2 -translate-y-full">
        <div className="rounded-full bg-surface px-4 py-2 text-[14px] font-semibold text-ink shadow-[0_1px_2px_rgb(0_0_0/.06)] ring-1 ring-line">
          {brand.name}
        </div>
        <div className="mx-auto mt-1 size-4 rounded-full border-4 border-surface bg-brand ring-1 ring-line" />
      </div>
      <a
        href={brand.mapsHref}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[14px] font-semibold text-ink ring-1 ring-line hover:text-brand"
      >
        Mở Google Maps
        <ExternalLink className="size-4 stroke-[1.5]" aria-hidden />
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="display text-[24px] font-extrabold text-ink">{brand.name}</p>
          <p className="mt-1 text-[14px] text-ink-muted">{brand.address}</p>
        </div>
        <ul className="flex gap-6">
          {brand.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="text-[14px] font-semibold text-ink hover:text-brand">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-ink-muted">© 2026 {brand.name}. Nội dung mẫu.</p>
      </div>
    </footer>
  );
}
