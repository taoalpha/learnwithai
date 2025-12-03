import { useState, useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const playStation = (station) => {
    if (!station) return;
    const url = station.url_resolved || station.url;
    
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.error("Playback error:", err);
          setIsPlaying(false);
          setError("Signal Lost");
        });
    } else {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, error, playStation, togglePlay };
};
