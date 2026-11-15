"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { brand } from "./brand";
import { BrandLogo } from "./brand-logo";
import { totalPrice, type Selection } from "./configurator";
import { formatVnd, models, typeLabel, type Model, type VehicleType } from "./data";
import { Silhouette } from "./silhouette";

const types = Object.keys(typeLabel) as VehicleType[];

function SectionHead({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <h2 className="display text-[32px] font-extrabold text-ink md:text-[48px] lg:col-span-6">{title}</h2>
      <p className="self-end text-ink-muted lg:col-span-5 lg:col-start-8">{text}</p>
    </div>
  );
}

function TypeTabs({ children, className }: { children: (t: VehicleType) => React.ReactNode; className?: string }) {
  return (
    <Tabs defaultValue="car" className={cn("gap-8", className)}>
      <TabsList className="h-auto gap-2 bg-transparent p-0">
        {types.map((t) => (
          <TabsTrigger
            key={t}
            value={t}
            className="h-10 flex-none rounded-full border border-line bg-surface px-6 text-[14px] font-semibold text-ink-muted data-active:border-brand data-active:bg-brand data-active:text-paper dark:data-active:border-brand dark:data-active:bg-brand dark:data-active:text-paper"
          >
            {typeLabel[t]}
          </TabsTrigger>
        ))}
      </TabsList>
      {types.map((t) => (
        <TabsContent key={t} value={t}>
          {children(t)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

/* ------------------------------------------------------------ lineup */

export function Lineup({ onConfigure }: { onConfigure: (m: Model) => void }) {
  return (
    <section id="dong-xe" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6">
        <SectionHead
          title="Dòng xe đang bán"
          text="Mỗi mẫu đều có xe lái thử tại showroom. Chọn một mẫu để cấu hình màu, mâm và xem giá ngay."
        />
        <TypeTabs className="mt-12">
          {(t) => (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {models
                .filter((m) => m.type === t)
                .map((m) => (
                  <article key={m.id} className="flex flex-col rounded-lg border border-line bg-surface p-4 transition-colors duration-150 hover:border-ink-muted">
                    <div className="rounded-md bg-paper px-8 py-6">
                      <Silhouette shape={m.shape} />
                    </div>
                    <h3 className="display mt-6 text-[24px] font-extrabold text-ink">{m.name}</h3>
                    <p className="text-[14px] text-ink-muted">{m.tagline}</p>
                    <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
                      {m.specs.slice(0, 3).map((s) => (
                        <div key={s.label}>
                          <dt className="text-[12px] text-ink-muted">{s.label}</dt>
                          <dd className="text-[14px] font-semibold text-ink">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <p>
                        <span className="block text-[12px] text-ink-muted">Giá từ</span>
                        <span className="display text-[20px] font-extrabold text-ink">{formatVnd(m.price)}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => onConfigure(m)}
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[14px] font-semibold text-ink transition-colors duration-150 hover:bg-chip"
                      >
                        <SlidersHorizontal className="size-4 stroke-[1.5]" aria-hidden />
                        Cấu hình
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </TypeTabs>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ specs table */

export function SpecTable() {
  return (
    <section id="thong-so" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6">
        <SectionHead title="So sánh thông số" text="Số liệu do nhà sản xuất công bố, đo trong điều kiện tiêu chuẩn." />
        <TypeTabs className="mt-12">
          {(t) => {
            const list = models.filter((m) => m.type === t);
            return (
              <div className="overflow-x-auto" data-lenis-prevent>
                <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
                  <caption className="sr-only">Thông số các mẫu {typeLabel[t].toLowerCase()}</caption>
                  <thead>
                    <tr className="border-b border-ink">
                      <th scope="col" className="w-1/4 py-4 pr-4 font-semibold text-ink-muted">Thông số</th>
                      {list.map((m) => (
                        <th key={m.id} scope="col" className="display py-4 pr-4 text-[20px] font-extrabold text-ink">
                          {m.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 font-normal text-ink-muted">Giá niêm yết</th>
                      {list.map((m) => (
                        <td key={m.id} className="py-4 pr-4 font-semibold text-ink">{formatVnd(m.price)}</td>
                      ))}
                    </tr>
                    {list[0].specs.map((s, i) => (
                      <tr key={s.label} className="border-b border-line">
                        <th scope="row" className="py-4 pr-4 font-normal text-ink-muted">{s.label}</th>
                        {list.map((m) => (
                          <td key={m.id} className="py-4 pr-4 text-ink">{m.specs[i].value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </TypeTabs>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ finance */

const TERMS = [12, 24, 36, 48, 60, 72, 84];

export function Finance({ sel }: { sel: Selection }) {
  const price = totalPrice(sel);
  const isBike = sel.model.type === "bike";
  const terms = isBike ? TERMS.slice(0, 3) : TERMS;
  const [down, setDown] = useState(30);
  const [termPick, setTermPick] = useState(60);
  const [rate, setRate] = useState(8.5);
  const term = terms.includes(termPick) ? termPick : terms[terms.length - 1];

  const loan = price * (1 - down / 100);
  const i = rate / 100 / 12;
  const monthly = i === 0 ? loan / term : (loan * i) / (1 - Math.pow(1 + i, -term));
  const r = { loan, monthly, interest: monthly * term - loan };

  return (
    <section id="tra-gop" className="scroll-mt-32 bg-brand text-paper">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <h2 className="display text-[32px] font-extrabold md:text-[48px]">Ước tính trả góp</h2>
          <p className="mt-4 opacity-80">
            Đang tính cho {sel.model.name}, {sel.paint.name.toLowerCase()}, giá {formatVnd(price)}. Đổi cấu hình ở phần đầu trang, số liệu cập nhật theo.
          </p>

          <div className="mt-12 flex flex-col gap-8">
            <label className="block">
              <span className="flex justify-between text-[14px] font-semibold">
                Trả trước <span>{down}% ({formatVnd(price * (down / 100))})</span>
              </span>
              <input
                type="range"
                min={isBike ? 10 : 20}
                max={80}
                step={5}
                value={down}
                onChange={(e) => setDown(+e.target.value)}
                className="xe-range mt-4 w-full"
              />
            </label>

            <fieldset>
              <legend className="text-[14px] font-semibold">Kỳ hạn vay</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {terms.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" name="term" value={t} checked={t === term} onChange={() => setTermPick(t)} className="peer sr-only" />
                    <span className="inline-flex h-10 items-center rounded-full border border-paper/30 px-4 text-[14px] font-semibold transition-colors duration-150 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paper">
                      {t} tháng
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="flex justify-between text-[14px] font-semibold">
                Lãi suất <span>{rate.toFixed(1).replace(".", ",")}%/năm</span>
              </span>
              <input type="range" min={6} max={12} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="xe-range mt-4 w-full" />
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <p className="text-[14px] opacity-80">Trả hàng tháng</p>
          <p className="display text-[48px] font-extrabold leading-none md:text-[88px]" aria-live="polite">
            {formatVnd(r.monthly)}
          </p>
          <dl className="mt-8 grid grid-cols-1 border-t border-paper/20 sm:grid-cols-3">
            {[
              ["Số tiền vay", r.loan],
              ["Tổng tiền lãi", r.interest],
              ["Tổng phải trả", r.loan + r.interest + price * (down / 100)],
            ].map(([k, v]) => (
              <div key={k as string} className="border-b border-paper/20 py-4 sm:border-b-0 sm:pr-4">
                <dt className="text-[14px] opacity-80">{k}</dt>
                <dd className="display text-[20px] font-extrabold">{formatVnd(v as number)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[14px] opacity-70">Số liệu minh hoạ theo phương thức dư nợ giảm dần. Lãi suất thực tế do ngân hàng đối tác duyệt.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ test drive */

type Errors = Partial<Record<"name" | "phone" | "date" | "consent", string>>;

export function TestDrive({ sel }: { sel: Selection }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState({ name: "", model: "", showroom: "", date: "" });
  const dateRef = useRef<HTMLInputElement>(null);
  const isoToday = () => new Date().toISOString().slice(0, 10);
  // set the date picker's minimum on the client (a render-time Date would be frozen at prerender)
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = isoToday();
  }, [status]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const today = isoToday();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const date = String(f.get("date") ?? "");
    const next: Errors = {};
    if (name.length < 2) next.name = "Nhập họ và tên để showroom xưng hô đúng.";
    if (!/^\+?\d{8,11}$/.test(phone)) next.phone = "Số điện thoại gồm 8–11 chữ số, ví dụ 12345678.";
    if (!date) next.date = "Chọn ngày bạn muốn đến lái thử.";
    else if (date < today) next.date = "Ngày lái thử phải từ hôm nay trở đi.";
    if (!f.get("consent")) next.consent = "Cần đồng ý để tư vấn viên gọi xác nhận lịch.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const room = brand.showrooms.find((s) => s.id === f.get("showroom"));
    setSummary({
      name,
      model: String(f.get("model")),
      showroom: room ? `${room.city}, ${room.address}` : "",
      date: new Date(date).toLocaleDateString("vi-VN"),
    });
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900); // thay bằng API của bạn
  }

  const field =
    "mt-2 h-12 w-full rounded-md border border-line bg-surface px-4 text-ink transition-colors duration-150 placeholder:text-ink-muted/70 hover:border-ink-muted focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`err-${k}`} className="mt-2 block text-[14px] text-danger">
        {errors[k]}
      </span>
    ) : null;

  return (
    <section id="lai-thu" className="scroll-mt-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <h2 className="display text-[32px] font-extrabold text-ink md:text-[48px]">Đặt lịch lái thử</h2>
          <p className="mt-4 text-ink-muted">Tư vấn viên gọi lại trong 30 phút (8:00–20:00) để xác nhận giờ. Lái thử miễn phí, mang theo bằng lái phù hợp.</p>
          <ul className="mt-8 flex flex-col gap-4 text-[14px]">
            {brand.showrooms.map((s) => (
              <li key={s.id} className="flex gap-2">
                <MapPin className="mt-1 size-4 shrink-0 stroke-[1.5] text-ink-muted" aria-hidden />
                <span>
                  <span className="font-semibold text-ink">{s.city}</span>
                  <span className="block text-ink-muted">{s.address}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {status === "done" ? (
            <div role="status" className="rounded-lg border border-line bg-surface p-8">
              <CheckCircle2 className="size-8 stroke-[1.5] text-success" aria-hidden />
              <h3 className="display mt-4 text-[32px] font-extrabold text-ink">Đã gửi yêu cầu lái thử</h3>
              <p className="mt-2 text-ink-muted">
                Cảm ơn {summary.name}. Showroom sẽ gọi xác nhận lịch {summary.model} ngày {summary.date} tại {summary.showroom}.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex h-12 items-center rounded-full border border-line px-6 font-semibold text-ink transition-colors duration-150 hover:bg-chip"
              >
                Đặt lịch khác
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
              <label className="block text-[14px] font-semibold text-ink">
                Họ và tên
                <input name="name" autoComplete="name" placeholder="Nguyễn Minh Anh" className={field} aria-invalid={!!errors.name} aria-describedby="err-name" />
                {err("name")}
              </label>
              <label className="block text-[14px] font-semibold text-ink">
                Số điện thoại
                <input name="phone" type="tel" autoComplete="tel" placeholder="12345678" className={field} aria-invalid={!!errors.phone} aria-describedby="err-phone" />
                {err("phone")}
              </label>
              <label className="block text-[14px] font-semibold text-ink">
                Mẫu xe
                <select key={sel.model.id} name="model" defaultValue={sel.model.name} className={field}>
                  {types.map((t) => (
                    <optgroup key={t} label={typeLabel[t]}>
                      {models.filter((m) => m.type === t).map((m) => (
                        <option key={m.id}>{m.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label className="block text-[14px] font-semibold text-ink">
                Ngày mong muốn
                <input ref={dateRef} name="date" type="date" className={field} aria-invalid={!!errors.date} aria-describedby="err-date" />
                {err("date")}
              </label>
              <fieldset className="sm:col-span-2">
                <legend className="text-[14px] font-semibold text-ink">Showroom</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {brand.showrooms.map((s, i) => (
                    <label key={s.id} className="cursor-pointer">
                      <input type="radio" name="showroom" value={s.id} defaultChecked={i === 0} className="peer sr-only" />
                      <span className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[14px] font-semibold text-ink-muted transition-colors duration-150 peer-checked:border-ink peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                        {s.city}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="flex gap-2 text-[14px] text-ink-muted sm:col-span-2">
                <input name="consent" type="checkbox" className="mt-1 size-4 accent-[var(--ink)]" aria-invalid={!!errors.consent} aria-describedby="err-consent" />
                <span>
                  Tôi đồng ý để {brand.name} gọi điện tư vấn và xác nhận lịch lái thử.
                  {err("consent")}
                </span>
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 font-semibold text-paper transition-[filter,opacity] duration-150 hover:brightness-125 disabled:opacity-60"
                >
                  {status === "sending" ? "Đang gửi yêu cầu" : "Gửi yêu cầu lái thử"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ footer */

export function XeFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <BrandLogo />
          <p className="mt-4 max-w-[320px] text-[14px] text-ink-muted">Đại lý ô tô và xe máy chính hãng, bảo hành 5 năm hoặc 150.000 km.</p>
        </div>
        <nav aria-label="Liên kết chân trang" className="grid grid-cols-2 gap-6 text-[14px] lg:col-span-4">
          <ul className="flex flex-col gap-2">
            <li><a href="#dong-xe" className="text-ink-muted hover:text-ink">Ô tô</a></li>
            <li><a href="#dong-xe" className="text-ink-muted hover:text-ink">Xe máy</a></li>
            <li><a href="#tra-gop" className="text-ink-muted hover:text-ink">Trả góp</a></li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li><a href="#lai-thu" className="text-ink-muted hover:text-ink">Lái thử</a></li>
            <li><a href="#thong-so" className="text-ink-muted hover:text-ink">Thông số</a></li>
            <li><a href="#cau-hinh" className="text-ink-muted hover:text-ink">Bảo hành</a></li>
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 text-[14px] lg:col-span-4">
          <li className="flex items-center gap-2 text-ink"><Phone className="size-4 stroke-[1.5]" aria-hidden />{brand.hotline}</li>
          <li className="flex items-center gap-2 text-ink"><Mail className="size-4 stroke-[1.5]" aria-hidden />{brand.email}</li>
        </ul>
      </div>
      <p className="mx-auto max-w-[1280px] border-t border-line px-4 py-6 text-[12px] text-ink-muted md:px-6">
        © 2026 {brand.name}. Tên, logo và số liệu trong bản demo là nội dung mẫu.
      </p>
    </footer>
  );
}
