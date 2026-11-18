"use client";

import { useState } from "react";

interface Props {
  id: string;
  title: string;
  start?: number;
}

// Thumbnail and play button until clicked; the iframe (and all of YouTube's
// scripts) only load after the click.
export function LiteYouTube({ id, title, start }: Props) {
  const [playing, setPlaying] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start) params.set("start", String(Math.floor(start)));

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-white">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
