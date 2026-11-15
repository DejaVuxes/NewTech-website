"use client";

import Image from "next/image";
import { useState } from "react";
import type { Template } from "@/lib/data";
import { cn } from "@/lib/utils";
import { TemplateShot } from "./template-shot";

/**
 * Real 16:10 screenshot of a template (from /public/demos/thumbs).
 * Falls back to the drawn TemplateShot if the file is missing.
 */
export function TemplateThumb({
  t,
  alt = false,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  t: Template;
  alt?: boolean;
  sizes?: string;
  className?: string;
}) {
  const src = alt ? t.altShot : t.shot;
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <TemplateShot kind={t.kind} headline={t.headline} className={className} />;
  }

  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-paper", className)}>
      <Image
        src={src}
        alt={alt ? "" : `Ảnh chụp ${t.name}`}
        fill
        sizes={sizes}
        className="object-cover object-left-top"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
