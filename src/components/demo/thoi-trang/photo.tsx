"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/** Unsplash resizes on its CDN, so we hand next/image a loader instead of proxying full-size originals. */
const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?w=${width}&q=${quality ?? 70}&auto=format&fit=crop`;

export function Photo(props: Omit<ImageProps, "loader">) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image loader={unsplashLoader} {...props} />;
}
