// Next, React
import { FC, useState } from 'react';
import pkg from '../../../package.json';

// ❌ DO NOT EDIT ANYTHING ABOVE THIS LINE

export const HomeView: FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* HEADER – fake Scrolly feed tabs */}
      <header className="flex items-center justify-center border-b border-white/10 py-3">
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-[11px]">
          <button className="rounded-full bg-slate-900 px-3 py-1 font-semibold text-white">
            Feed
          </button>
          <button className="rounded-full px-3 py-1 text-slate-400">
            Casino
          </button>
          <button className="rounded-full px-3 py-1 text-slate-400">
            Kids
          </button>
        </div>
      </header>

      {/* MAIN – central game area (phone frame) */}
      <main className="flex flex-1 items-center justify-center px-4 py-3">
        <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-[0_0_40px_rgba(56,189,248,0.35)]">
          {/* Fake “feed card” top bar inside the phone */}
          <div className="flex items-center justify-between px-3 py-2 text-[10px] text-slate-400">
            <span className="rounded-full bg-white/5 px-2 py-1 text-[9px] uppercase tracking-wide">
              Scrolly Game
            </span>
            <span className="text-[9px] opacity-70">#NoCodeJam</span>
          </div>

          {/* The game lives INSIDE this phone frame */}
          <div className="flex h-[calc(100%-26px)] flex-col items-center justify-start px-3 pb-3 pt-1">
            <GameSandbox />
          </div>
        </div>
      </main>

      {/* FOOTER – tiny version text */}
      <footer className="flex h-5 items-center justify-center border-t border-white/10 px-2 text-[9px] text-slate-500">
        <span>Scrolly · v{pkg.version}</span>
      </footer>
    </div>
  );
};

// ✅ THIS IS THE ONLY PART YOU EDIT FOR THE JAM
// Replace this entire GameSandbox component with the one AI generates.
// Keep the name `GameSandbox` and the `FC` type.
import React from 'react';

const GameSandbox: FC = () => {
  // 🎯⚡ SCROLLY GAME: "HIT THE BEAT (CHILL MODE)"
  // Same concept, but SCROLLY-paced:
  // Slow → readable → hypnotic → addictive

  const [status, setStatus] = React.useState<"idle" | "play" | "over">("idle");
  const [score, setScore] = React.useState(0);
  const [best, setBest] = React.useState(0);

  // Needle (small line)
  const [needle, setNeedle] = React.useState(0);
  const [needleDir, setNeedleDir] = React.useState<1 | -1>(1);

  // Target zone
  const [zoneCenter, setZoneCenter] = React.useState(50);
  const [zoneDir, setZoneDir] = React.useState<1 | -1>(1);
  const [zoneWidth, setZoneWidth] = React.useState(32);

  // 🔽 MUCH SLOWER, SCROLLY-FRIENDLY SPEEDS
  const needleSpeed = Math.min(1.1 + score * 0.05, 1.6);
  const zoneSpeed = Math.min(0.8 + score * 0.03, 0.9);

  // Needle movement
  React.useEffect(() => {
    if (status !== "play") return;

    const i = setInterval(() => {
      setNeedle((p) => {
        let next = p + needleDir * needleSpeed;
        if (next >= 100) {
          setNeedleDir(-1);
          return 100;
        }
        if (next <= 0) {
          setNeedleDir(1);
          return 0;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(i);
  }, [status, needleDir, needleSpeed]);

  // Zone movement
  React.useEffect(() => {
    if (status !== "play") return;

    const i = setInterval(() => {
      setZoneCenter((p) => {
        const half = zoneWidth / 2;
        let next = p + zoneDir * zoneSpeed;

        if (next + half >= 100) {
          setZoneDir(-1);
          return 100 - half;
        }
        if (next - half <= 0) {
          setZoneDir(1);
          return half;
        }
        return next;
      });
    }, 32);

    return () => clearInterval(i);
  }, [status, zoneDir, zoneSpeed, zoneWidth]);

  const tap = () => {
    if (status !== "play") return;

    const start = zoneCenter - zoneWidth / 2;
    const end = zoneCenter + zoneWidth / 2;

    if (needle >= start && needle <= end) {
      setScore((s) => s + 1);
      setZoneWidth((w) => Math.max(10, w - 2)); // gentler shrink
    } else {
      setStatus("over");
      setBest((b) => Math.max(b, score));
    }
  };

  const start = () => {
    setScore(0);
    setNeedle(0);
    setNeedleDir(1);
    setZoneCenter(50);
    setZoneDir(1);
    setZoneWidth(32);
    setStatus("play");
  };

  return (
    <div className="flex justify-center w-full">
      {/* Phone Card */}
      <div className="w-[360px] h-[640px] rounded-[2.5rem] bg-gradient-to-b from-black via-zinc-900 to-black shadow-2xl p-6 flex flex-col justify-between text-white select-none">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-black tracking-widest">
            ⚡ HIT THE BEAT
          </h1>
          <p className="text-xs opacity-60 mt-1">
            Calm. Focus. Tap.
          </p>
        </div>

        {/* Game Area */}
        <div
          onClick={tap}
          className="flex flex-col items-center justify-center gap-10"
        >
          {/* Track */}
          <div className="relative w-full h-6 bg-zinc-700/70 rounded-full overflow-hidden">
            {/* Target Zone */}
            <div
              className="absolute top-0 h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 opacity-90 blur-[1px]"
              style={{
                left: `${zoneCenter - zoneWidth / 2}%`,
                width: `${zoneWidth}%`,
              }}
            />

            {/* Needle */}
            <div
              className="absolute -top-4 w-[4px] h-14 rounded bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
              style={{
                left: `${needle}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>

          <p className="text-sm tracking-wider opacity-80">
            {status === "play" ? "TAP ⚡" : "READY?"}
          </p>
        </div>

        {/* Score */}
        <div className="text-center">
          <p className="text-xl font-bold">🔥 {score}</p>
          <p className="text-xs opacity-50">Best {best}</p>
        </div>

        {/* Controls */}
        <div className="text-center space-y-2">
          {status !== "play" && (
            <button
              onClick={start}
              className="w-full py-3 rounded-2xl bg-white text-black font-extrabold tracking-wide active:scale-95 transition"
            >
              {status === "idle" ? "START 🚀" : "TRY AGAIN 🔁"}
            </button>
          )}
          {status === "over" && (
            <p className="text-sm font-semibold text-red-400">
              Too early… or too late 😌
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
