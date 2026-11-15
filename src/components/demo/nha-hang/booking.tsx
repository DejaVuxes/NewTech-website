"use client";

import { useState, useSyncExternalStore } from "react";
import { CalendarCheck, Minus, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "./brand";

/* Ngày được tính ở trình duyệt (tránh lệch giờ giữa server và client). */
const subscribe = () => () => {};
const getToday = () => new Date().toDateString();
const getServerToday = () => null;

const weekday = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const lunch = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];
const dinner = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

/** Giả lập khung giờ đã kín. Nối API đặt bàn của bạn vào đây. */
const isFull = (dayIndex: number, time: string) => ["12:00", "19:00"].includes(time) || (dayIndex % 3 === 1 && time === "18:30");

type Status = "idle" | "submitting" | "done";
type Errors = Partial<Record<"time" | "name" | "phone", string>>;

const field =
  "h-12 w-full rounded-md border border-line bg-surface px-4 text-[16px] text-ink placeholder:text-ink-muted/70 transition-colors duration-150 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger";

export function Booking() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const days = today
    ? Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        return d;
      })
    : null;

  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState("");

  const chosenDate = days?.[day];
  const dateLabel = chosenDate
    ? chosenDate.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "numeric" })
    : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!time) next.time = "Chọn một khung giờ còn trống.";
    if (name.trim().length < 2) next.name = "Nhập tên người đặt bàn.";
    if (!/^(0|\+84)\d{9}$/.test(phone.replace(/\s/g, ""))) next.phone = "Số điện thoại gồm 10 số, ví dụ 0901 234 567.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("submitting");
    // Demo: giả lập gọi API. Thay bằng fetch tới hệ thống đặt bàn của bạn.
    window.setTimeout(() => {
      setCode("NM" + Math.floor(1000 + Math.random() * 9000));
      setStatus("done");
    }, 900);
  }

  function reset() {
    setStatus("idle");
    setTime(null);
    setNote("");
  }

  const slotGroup = (label: string, slots: string[]) => (
    <div>
      <p className="text-[14px] font-semibold text-ink-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {slots.map((t) => {
          const full = isFull(day, t);
          const active = time === t;
          return (
            <button
              key={t}
              type="button"
              disabled={full}
              aria-pressed={active}
              onClick={() => {
                setTime(t);
                setErrors((er) => ({ ...er, time: undefined }));
              }}
              className={cn(
                "h-10 min-w-[72px] rounded-md border px-4 text-[14px] font-semibold transition-colors duration-150",
                active ? "border-brand bg-brand text-primary-foreground" : "border-line bg-surface text-ink hover:border-brand",
                full && "cursor-not-allowed border-dashed bg-transparent text-ink-muted/60 line-through hover:border-line"
              )}
            >
              {t}
              {full && <span className="sr-only"> (đã kín)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="dat-ban" aria-labelledby="dat-ban-title" className="scroll-mt-32 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <h2 id="dat-ban-title" className="display text-[32px] font-extrabold text-ink sm:text-[48px]">
            Đặt bàn
          </h2>
          <p className="mt-6 text-ink-muted">
            Bàn được giữ 15 phút sau giờ hẹn. Nhóm trên 12 người, gọi {brand.phone} để đặt phòng riêng và thực đơn tiệc.
          </p>
          <ul className="mt-8 space-y-2 text-ink-muted">
            <li>Xác nhận qua tin nhắn trong 1 phút</li>
            <li>Đổi giờ hoặc huỷ miễn phí trước 2 tiếng</li>
            <li>Không cần đặt cọc với nhóm dưới 8 người</li>
          </ul>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {status === "done" ? (
            <div role="status" className="rounded-xl border border-line bg-paper p-6 sm:p-8">
              <CalendarCheck className="size-6 stroke-[1.5] text-success" aria-hidden />
              <h3 className="display mt-4 text-[32px] font-extrabold text-ink">Đã giữ bàn cho {name.trim()}</h3>
              <p className="mt-2 text-ink-muted">Tin nhắn xác nhận đã gửi tới {phone}. Đưa mã này cho nhân viên khi đến.</p>
              <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-4">
                {[
                  { k: "Mã đặt bàn", v: code },
                  { k: "Ngày", v: dateLabel },
                  { k: "Giờ", v: time },
                  { k: "Số khách", v: `${guests} người` },
                ].map((r) => (
                  <div key={r.k}>
                    <dt className="text-[14px] text-ink-muted">{r.k}</dt>
                    <dd className="display mt-1 text-[20px] font-extrabold text-ink first-letter:uppercase">{r.v}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={reset}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-semibold text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                <RotateCcw className="size-4 stroke-[1.5]" aria-hidden />
                Đặt thêm một bàn
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-8" aria-busy={status === "submitting"}>
              <fieldset>
                <legend className="font-semibold text-ink">Ngày</legend>
                <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {days
                    ? days.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-pressed={day === i}
                          onClick={() => {
                            setDay(i);
                            setTime(null);
                          }}
                          className={cn(
                            "flex h-16 flex-col items-center justify-center rounded-md border text-[14px] transition-colors duration-150",
                            day === i ? "border-brand bg-brand text-primary-foreground" : "border-line bg-surface text-ink hover:border-brand"
                          )}
                        >
                          <span className="font-semibold">{i === 0 ? "Hôm nay" : weekday[d.getDay()]}</span>
                          <span className="display text-[20px] font-extrabold leading-none">{d.getDate()}</span>
                        </button>
                      ))
                    : Array.from({ length: 7 }, (_, i) => <span key={i} className="h-16 animate-pulse rounded-md bg-brand-soft" aria-hidden />)}
                </div>
              </fieldset>

              <fieldset aria-describedby={errors.time ? "err-time" : undefined}>
                <legend className="font-semibold text-ink">Giờ</legend>
                <div className="mt-2 space-y-4">
                  {slotGroup("Bữa trưa", lunch)}
                  {slotGroup("Bữa tối", dinner)}
                </div>
                {errors.time && (
                  <p id="err-time" className="mt-2 text-[14px] text-danger">
                    {errors.time}
                  </p>
                )}
              </fieldset>

              <div>
                <span id="guests-label" className="font-semibold text-ink">
                  Số khách
                </span>
                <div className="mt-2 flex items-center gap-4" role="group" aria-labelledby="guests-label">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors duration-150 hover:border-brand disabled:opacity-40"
                    aria-label="Bớt một khách"
                  >
                    <Minus className="size-4 stroke-[1.5]" />
                  </button>
                  <output aria-live="polite" className="display w-16 text-center text-[32px] font-extrabold text-ink">
                    {guests}
                  </output>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    disabled={guests >= 20}
                    className="grid size-12 place-items-center rounded-full border border-line text-ink transition-colors duration-150 hover:border-brand disabled:opacity-40"
                    aria-label="Thêm một khách"
                  >
                    <Plus className="size-4 stroke-[1.5]" />
                  </button>
                  {guests > 12 && <span className="text-[14px] text-ink-muted">Nhóm lớn sẽ được xếp vào phòng riêng tầng ba.</span>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nm-name" className="font-semibold text-ink">
                    Tên người đặt
                  </label>
                  <input
                    id="nm-name"
                    className={cn(field, "mt-2")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Nguyễn Thị Hoa"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-2 text-[14px] text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="nm-phone" className="font-semibold text-ink">
                    Số điện thoại
                  </label>
                  <input
                    id="nm-phone"
                    type="tel"
                    inputMode="tel"
                    className={cn(field, "mt-2")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="0901 234 567"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "err-phone" : undefined}
                  />
                  {errors.phone && (
                    <p id="err-phone" className="mt-2 text-[14px] text-danger">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="nm-note" className="font-semibold text-ink">
                  Ghi chú <span className="font-normal text-ink-muted">(không bắt buộc)</span>
                </label>
                <textarea
                  id="nm-note"
                  rows={3}
                  className={cn(field, "mt-2 h-auto py-4")}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Dị ứng, ghế trẻ em, sinh nhật…"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 border-t border-line pt-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-14 items-center rounded-full bg-brand px-8 text-[16px] font-bold text-primary-foreground transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px disabled:opacity-70"
                >
                  {status === "submitting" ? "Đang giữ bàn…" : "Xác nhận đặt bàn"}
                </button>
                <p className="text-[14px] text-ink-muted" aria-live="polite">
                  {time && chosenDate ? `${guests} khách, ${time}, ${dateLabel}` : "Chưa chọn giờ"}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
