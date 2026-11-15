"use client";

import { Component, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Rotate3d, ZoomIn, ZoomOut } from "lucide-react";
import type { BikeShape, CarShape, Model, Paint, Rim } from "./data";
import { Silhouette } from "./silhouette";

/** Skeleton shown while three.js loads (no spinner). */
function ViewerSkeleton({ shape, label }: { shape: CarShape | BikeShape; label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex w-2/3 max-w-[360px] flex-col items-center gap-4 opacity-40 motion-safe:animate-pulse">
        <Silhouette shape={shape} />
        <p className="text-[14px] text-ink-muted">{label}</p>
      </div>
    </div>
  );
}

const Scene = dynamic(() => import("./vehicle-scene"), {
  ssr: false,
  loading: () => <ViewerSkeleton shape={"suv"} label="Đang tải mô hình 3D" />,
});

/** If WebGL is unavailable the configurator still works with the line drawing. */
class WebglBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function Viewer({ model, paint, rim }: { model: Model; paint: Paint; rim: Rim }) {
  const [zoom, setZoom] = useState(0.45);
  const step = (d: number) => setZoom((z) => Math.min(1, Math.max(0, +(z + d).toFixed(2))));
  return (
    <>
    <div className="relative h-[320px] sm:h-[400px] lg:h-[520px]">
      <WebglBoundary
        key={model.id}
        fallback={<ViewerSkeleton shape={model.shape} label="Không tải được mô hình 3D. Vui lòng tải lại trang." />}
      >
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Scene model={model} paint={paint} rim={rim} zoom={zoom} />
        </div>
      </WebglBoundary>
      <div className="absolute right-0 top-0 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => step(0.25)}
          disabled={zoom >= 1}
          aria-label="Phóng to"
          className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-chip disabled:opacity-40"
        >
          <ZoomIn className="size-4 stroke-[1.5]" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => step(-0.25)}
          disabled={zoom <= 0}
          aria-label="Thu nhỏ"
          className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-chip disabled:opacity-40"
        >
          <ZoomOut className="size-4 stroke-[1.5]" aria-hidden />
        </button>
      </div>
      <p className="pointer-events-none absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-[14px] text-ink-muted">
        <Rotate3d className="size-4 stroke-[1.5]" aria-hidden />
        Kéo để xoay xe
      </p>
    </div>
    </>
  );
}
