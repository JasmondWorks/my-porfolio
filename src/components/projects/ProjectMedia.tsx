"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface ProjectMediaProps {
  coverImage?: string;
  demoVideo?: string;
  title: string;
}

export function ProjectMedia({ coverImage, demoVideo, title }: ProjectMediaProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function startVideo() {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  }

  function stopVideo() {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted/20 aspect-video shadow-xl">
      {/* Cover image */}
      {coverImage ? (
        <Image
          src={coverImage}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
          priority
        />
      ) : (
        <div className={`absolute inset-0 flex items-center justify-center bg-muted/30 ${playing ? "opacity-0" : "opacity-100"} transition-opacity`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
            Preview unavailable
          </span>
        </div>
      )}

      {/* Video */}
      {demoVideo && (
        <video
          ref={videoRef}
          src={demoVideo}
          loop
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Play button overlay */}
      {demoVideo && !playing && (
        <button
          onClick={startVideo}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/20 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/30 group"
          aria-label="Play demo"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-200 group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5 text-gray-900" />
          </div>
          <span className="rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Watch Demo
          </span>
        </button>
      )}

      {/* Stop button (when playing) */}
      {playing && (
        <button
          onClick={stopVideo}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/80"
          aria-label="Stop video"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
