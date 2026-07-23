import { useEffect, useRef, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  label?: string;
}

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      setValue(Math.round(easeOutExpo(p) * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export function ScoreRing({ score, size = 200, label }: ScoreRingProps) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const [mounted, setMounted] = useState(false);
  const display = useCountUp(pct);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const offset = mounted ? c - (pct / 100) * c : c;

  return (
    <div
      className="relative inline-flex items-center justify-center animate-scale-in-soft"
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden
        className="absolute inset-2 rounded-full blur-2xl opacity-40 animate-glow-pulse"
        style={{ background: "conic-gradient(from 90deg, oklch(0.72 0.18 258 / 0.6), oklch(0.72 0.2 330 / 0.6), oklch(0.72 0.18 258 / 0.6))" }}
      />
      <svg width={size} height={size} className="-rotate-90 relative">
        <defs>
          <linearGradient id="gs-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 258)" />
            <stop offset="100%" stopColor="oklch(0.72 0.2 330)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#gs-ring)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-semibold tracking-tight tabular-nums">{display}</div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label ?? "GitScope"}</div>
      </div>
    </div>
  );
}
