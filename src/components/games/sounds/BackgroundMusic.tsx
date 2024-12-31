'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      autoPlay
      src="/sounds/game-music.mp3"
    />
  );
} 