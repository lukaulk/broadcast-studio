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
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setSquares(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {squares.map((sq) => (
        <div
          key={sq.id}
          className="absolute w-32 h-32 border-2 bg-cyan-500/10 border-cyan-400 rotate-45 animate-pulse"
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
