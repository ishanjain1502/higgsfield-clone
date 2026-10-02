"use client";

import Image from "next/image";
import { useRef } from "react";

import type { HfAspect } from "@/lib/higgsfield-home-constants";
import { cn } from "@/lib/utils";

type HfMediaProps = {
  image?: string;
  video?: string;
  alt?: string;
  aspect?: HfAspect;
  /** `always` loops muted on mount; `hover` plays only while the pointer is over the card. */
  play?: "always" | "hover";
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function HfMedia({
  image,
  video,
  alt = "",
  aspect,
  play = "hover",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  className,
  children,
}: HfMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverVideo = video && play === "hover";

  return (
    <div
      className={cn("group/media relative overflow-hidden bg-white/5", className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
      onMouseEnter={hoverVideo ? () => void videoRef.current?.play().catch(() => {}) : undefined}
      onMouseLeave={
        hoverVideo
          ? () => {
              const v = videoRef.current;
              if (!v) return;
              v.pause();
              v.currentTime = 0;
            }
          : undefined
      }
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          autoPlay={play === "always"}
          preload={play === "always" ? "auto" : "none"}
          className={cn(
            "absolute inset-0 size-full object-cover",
            hoverVideo && image && "opacity-0 transition-opacity duration-300 group-hover/media:opacity-100",
          )}
        />
      ) : null}
      {children}
    </div>
  );
}
