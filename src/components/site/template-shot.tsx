import { cn } from "@/lib/utils";
import type { ShotKind } from "@/lib/data";

/**
 * Stand-in "screenshot" of a template, drawn with divs inside a neutral browser frame.
 * Replace with real 16:10 screenshots (next/image) once templates are produced.
 */
export function BrowserFrame({
  children,
  url = "demo.newtech.vn",
  className,
  dark,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-surface shadow-[0_1px_2px_rgb(0_0_0/.06)]",
        className
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-line bg-paper px-4">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="ml-2 truncate rounded-sm bg-surface px-2 text-[12px] leading-5 text-ink-muted">{url}</span>
      </div>
      <div className={cn("relative", dark ? "bg-ink text-paper" : "bg-surface text-ink")}>{children}</div>
    </div>
  );
}

const Bar = ({ className }: { className?: string }) => <span className={cn("block rounded-sm bg-current opacity-15", className)} />;

export function TemplateShot({
  kind,
  headline,
  dark,
  className,
}: {
  kind: ShotKind;
  headline: string;
  dark?: boolean;
  className?: string;
}) {
  const soft = dark ? "bg-paper/10" : "bg-brand-soft";
  const solid = dark ? "bg-brand" : "bg-brand";
  return (
    <div className={cn("aspect-[16/10] w-full overflow-hidden p-4 text-[12px] leading-tight", className)} aria-hidden>
      {/* top nav of the mock site */}
      <div className="mb-4 flex items-center gap-2">
        <span className={cn("size-4 rounded-sm", solid)} />
        <Bar className="h-2 w-16" />
        <span className="ml-auto flex gap-2">
          <Bar className="h-2 w-8" />
          <Bar className="h-2 w-8" />
          <span className={cn("h-4 w-12 rounded-sm", solid)} />
        </span>
      </div>

      {kind === "dashboard" || kind === "crm" ? (
        <div className="grid h-[calc(100%-32px)] grid-cols-[48px_1fr] gap-2">
          <div className={cn("rounded-sm", soft)} />
          <div className="flex flex-col gap-2">
            <p className="display text-[14px] font-medium">{headline}</p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn("rounded-sm p-2", soft)}>
                  <Bar className="mb-1 h-1.5 w-8" />
                  <span className="display block text-[14px] font-medium">{["128tr", "2.430", "18,4%"][i]}</span>
                </div>
              ))}
            </div>
            {kind === "dashboard" ? (
              <div className={cn("flex flex-1 items-end gap-1 rounded-sm p-2", soft)}>
                {[40, 64, 48, 72, 56, 88, 64, 96, 72, 80].map((h, i) => (
                  <span key={i} className={cn("flex-1 rounded-t-sm", i === 7 ? solid : "bg-current opacity-25")} style={{ height: `${h}%` }} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-current/10 py-1">
                    <span className={cn("size-3 rounded-full", soft)} />
                    <Bar className="h-1.5 w-16" />
                    <Bar className="ml-auto h-1.5 w-8" />
                    <span className={cn("h-3 w-8 rounded-full", i === 1 ? solid : soft)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : kind === "shop" ? (
        <div className="flex h-[calc(100%-32px)] flex-col gap-2">
          <p className="display text-[16px] font-medium">{headline}</p>
          <div className="grid flex-1 grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className={cn("flex-1 rounded-sm", i === 1 ? solid : soft)} />
                <Bar className="h-1.5 w-3/4" />
                <span className="font-bold">{["129.000", "89.000", "245.000", "65.000"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : kind === "kit" ? (
        <div className="grid h-[calc(100%-32px)] grid-cols-3 gap-2">
          <div className={cn("col-span-2 flex flex-col justify-end rounded-sm p-2", soft)}>
            <p className="display text-[16px] font-medium">{headline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className={cn("h-4 rounded-full", solid)} />
            <span className="h-4 rounded-full border border-current/30" />
            <span className={cn("h-4 rounded-sm", soft)} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1 rounded-sm border border-current/15 p-1">
              <span className={cn("size-3 rounded-full", i === 0 ? solid : soft)} />
              <Bar className="h-1.5 flex-1" />
            </div>
          ))}
        </div>
      ) : kind === "blog" ? (
        <div className="grid h-[calc(100%-32px)] grid-cols-[1.4fr_1fr] gap-4">
          <div className="flex flex-col gap-2">
            <div className={cn("flex-1 rounded-sm", soft)} />
            <p className="display text-[16px] font-medium">{headline}</p>
            <Bar className="h-1.5 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-2">
                <span className={cn("size-8 shrink-0 rounded-sm", soft)} />
                <span className="flex flex-1 flex-col gap-1">
                  <Bar className="h-1.5 w-full" />
                  <Bar className="h-1.5 w-2/3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* landing / saas / edu / booking: split hero */
        <div className="grid h-[calc(100%-32px)] grid-cols-2 items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="display text-[18px] font-medium">{headline}</p>
            <Bar className="h-1.5 w-full" />
            <Bar className="h-1.5 w-2/3" />
            <span className="mt-1 flex gap-2">
              <span className={cn("h-4 w-16 rounded-full", solid)} />
              <span className="h-4 w-12 rounded-full border border-current/30" />
            </span>
          </div>
          <div className={cn("relative h-full rounded-sm", soft)}>
            {kind === "saas" && (
              <div className="absolute inset-4 flex items-end gap-1">
                {[48, 64, 40, 80, 56, 96].map((h, i) => (
                  <span key={i} className="flex-1 rounded-t-sm bg-current opacity-20" style={{ height: `${h}%` }} />
                ))}
              </div>
            )}
            {kind === "edu" && (
              <div className="absolute inset-4 flex flex-col justify-center gap-2">
                {[80, 56, 32].map((w, i) => (
                  <span key={i} className="h-2 rounded-full bg-current/15">
                    <span className={cn("block h-2 rounded-full", solid)} style={{ width: `${w}%` }} />
                  </span>
                ))}
              </div>
            )}
            {kind === "booking" && (
              <div className="absolute inset-2 grid grid-cols-4 gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className={cn("rounded-sm", i === 6 ? solid : "bg-current/10")} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
