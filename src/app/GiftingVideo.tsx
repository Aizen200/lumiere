"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GiftingVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export default function GiftingVideo({ src, poster, label }: GiftingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);

  // Catch a load failure that happened before React attached onError
  useEffect(() => {
    const video = videoRef.current;
    if (video && (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) {
      setFailed(true);
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // play() rejects when the source is missing or unsupported
      video.play().catch(() => setFailed(true));
    } else {
      video.pause();
    }
  };

  // No usable video file: fall back to the poster still, without controls
  if (failed) {
    return (
      <Image
        src={poster}
        alt={label}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Swarovski-style circular mute / pause controls */}
      <div className="absolute bottom-5 right-5 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="w-11 h-11 rounded-full bg-black/25 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/40 transition-colors cursor-pointer"
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="m16 9 5 6M21 9l-5 6" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="w-11 h-11 rounded-full bg-black/25 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/40 transition-colors cursor-pointer"
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5v14M15 5v14" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
