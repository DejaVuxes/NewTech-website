import { cn } from "@/lib/utils";
import type { BikeShape, CarShape } from "./data";

/** Line-art side view of each model, used on lineup cards and as the 3D loading / fallback state. */
const CAR_PATH: Record<CarShape, { d: string; r: number; wheels: [number, number] }> = {
  sedan: {
    d: "M16 70 L16 58 Q18 51 32 49 L72 46 Q92 28 112 26 L150 26 Q170 28 188 44 L220 49 Q230 51 230 60 L230 70",
    r: 14,
    wheels: [62, 186],
  },
  suv: {
    d: "M14 72 L14 48 Q16 40 28 38 L46 36 Q56 18 72 16 L156 16 Q172 18 188 36 L220 43 Q230 46 230 56 L230 72",
    r: 16,
    wheels: [64, 184],
  },
  coupe: {
    d: "M16 72 L16 61 Q18 55 32 53 L64 51 Q98 30 122 30 L146 30 Q170 34 194 50 L222 56 Q230 58 230 64 L230 72",
    r: 14,
    wheels: [64, 188],
  },
};

const BIKE_PATH: Record<BikeShape, string> = {
  scooter: "M64 66 L150 66 L158 44 L112 42 Q84 40 70 54 M100 38 L150 36 M172 70 Q162 44 172 22 L184 20",
  naked: "M60 70 L104 56 L150 56 L176 44 L160 32 L112 34 L84 46 L60 70 M70 42 L110 36 M180 70 L170 26 L156 22",
  cafe: "M60 70 L104 58 L150 56 L172 42 Q130 28 96 44 L72 46 Q64 38 70 36 M180 70 L172 30 L162 32",
};

export function Silhouette({ shape, className }: { shape: CarShape | BikeShape; className?: string }) {
  const isCar = shape in CAR_PATH;
  return (
    <svg viewBox="0 0 240 100" className={cn("w-full text-ink", className)} aria-hidden fill="none">
      <line x1="8" y1="88" x2="232" y2="88" className="stroke-line" strokeWidth="2" />
      {isCar ? (
        (() => {
          const c = CAR_PATH[shape as CarShape];
          return (
            <>
              <path d={c.d} stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              {c.wheels.map((x) => (
                <g key={x}>
                  <circle cx={x} cy={88 - c.r - 2} r={c.r} stroke="currentColor" strokeWidth="3" />
                  <circle cx={x} cy={88 - c.r - 2} r={c.r * 0.4} className="fill-accent" />
                </g>
              ))}
            </>
          );
        })()
      ) : (
        <>
          <path d={BIKE_PATH[shape as BikeShape]} stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {[60, 180].map((x) => (
            <g key={x}>
              <circle cx={x} cy={64} r={22} stroke="currentColor" strokeWidth="3" />
              <circle cx={x} cy={64} r={5} className="fill-accent" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
