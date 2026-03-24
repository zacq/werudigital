"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const streaks: Streak[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Streak = {
      x: number;
      y: number;
      width: number;
      height: number;
      opacity: number;
      speed: number;
      angle: number;
    };

    const createStreak = (): Streak => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: Math.random() * 2 + 0.5,
      height: Math.random() * 120 + 60,
      opacity: Math.random() * 0.2 + 0.07,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * 20 - 10,
    });

    for (let i = 0; i < 8; i++) streaks.push(createStreak());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base gradient — vivid orange top, red-dark fade toward bottom
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0,    "#f97d00");   // vivid orange top
      grad.addColorStop(0.35, "#e06500");   // deep orange mid
      grad.addColorStop(0.65, "#8B2200");   // dark orange-red
      grad.addColorStop(1,    "#1a0400");   // near-black bottom
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bright orange burst at top-centre — hero zone
      const radTop = ctx.createRadialGradient(
        canvas.width / 2, 0,
        0,
        canvas.width / 2, 0,
        canvas.width * 0.7
      );
      radTop.addColorStop(0,   "rgba(255, 160, 30, 0.45)");
      radTop.addColorStop(0.5, "rgba(249, 125, 0, 0.15)");
      radTop.addColorStop(1,   "transparent");
      ctx.fillStyle = radTop;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deep red shadow — bottom corners for depth
      const radBL = ctx.createRadialGradient(
        0, canvas.height,
        0,
        0, canvas.height,
        canvas.width * 0.6
      );
      radBL.addColorStop(0,   "rgba(140, 10, 30, 0.55)");
      radBL.addColorStop(0.6, "rgba(80, 5, 15, 0.2)");
      radBL.addColorStop(1,   "transparent");
      ctx.fillStyle = radBL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radBR = ctx.createRadialGradient(
        canvas.width, canvas.height,
        0,
        canvas.width, canvas.height,
        canvas.width * 0.55
      );
      radBR.addColorStop(0,   "rgba(100, 5, 20, 0.45)");
      radBR.addColorStop(0.6, "rgba(50, 3, 10, 0.15)");
      radBR.addColorStop(1,   "transparent");
      ctx.fillStyle = radBR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light streaks
      streaks.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate((s.angle * Math.PI) / 180);

        const streakGrad = ctx.createLinearGradient(0, 0, 0, s.height);
        streakGrad.addColorStop(0,   `rgba(255, 220, 120, 0)`);
        streakGrad.addColorStop(0.5, `rgba(255, 220, 120, ${s.opacity})`);
        streakGrad.addColorStop(1,   `rgba(255, 220, 120, 0)`);

        ctx.fillStyle = streakGrad;
        ctx.fillRect(-s.width / 2, 0, s.width, s.height);
        ctx.restore();

        s.y -= s.speed;
        if (s.y + s.height < 0) {
          s.y = canvas.height + s.height;
          s.x = Math.random() * canvas.width;
        }
      });

      // Grain texture (sparse dots)
      for (let i = 0; i < 80; i++) {
        const gx = Math.random() * canvas.width;
        const gy = Math.random() * canvas.height;
        const ga = Math.random() * 0.04;
        ctx.fillStyle = `rgba(255,255,255,${ga})`;
        ctx.fillRect(gx, gy, 1, 1);
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
