"use client";
import { useEffect, useState } from "react";

type Square = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
};

const NetworkPattern = () => {
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    // Use a fixed seed-like approach to generate consistent positions
    const generated = Array.from({ length: 15 }, (_, i) => {
      // Use a simple hash function based on index for consistent "random" values
      const hash = (i * 37) % 100;
      const hash2 = (i * 73) % 100;
      const hash3 = (i * 101) % 3;
      const hash4 = (i * 127) % 2;
      
      return {
        id: i,
        left: `${hash}%`,
        top: `${hash2}%`,
        delay: `${hash3}s`,
        duration: `${3 + hash4}s`,
      };
    });
    setSquares(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {squares.map((sq) => (
        <div
          key={sq.id}
          className="absolute w-32 h-32 border-2 bg-cyan-500/5  sm:bg-cyan-500/10 border-cyan-400 rotate-45 animate-pulse"
          style={{
            left: sq.left,
            top: sq.top,
            animationDelay: sq.delay,
            animationDuration: sq.duration,
          }}
        />
      ))}
    </div>
  );
};

export default NetworkPattern;
