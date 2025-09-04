"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-5 w-full items-center bg-[var(--bsui-blue)] text-[var(--bsui-gray-0)] text-sm px-4 font-semibold">
      <span className="ml-2">{time}</span>
    </div>
  );
}
