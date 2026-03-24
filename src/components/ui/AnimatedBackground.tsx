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
      opacity: Math.random() * 0.12 + 0.03,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * 20 - 10,
    });

    for (let i = 0; i < 8; i++) streaks.push(createStreak());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base gradient — orange dominant, deep red sections
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#1f0d00");
      grad.addColorStop(0.3, "#2e1200");
      grad.addColorStop(0.6, "#1a0a00");
      grad.addColorStop(1, "#0d0300");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orange radial glow — dominant, behind hero
      const radOrange = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.3,
        0,
        canvas.width / 2, canvas.height * 0.3,
        canvas.width * 0.65
      );
      radOrange.addColorStop(0, "rgba(249, 125, 0, 0.22)");
      radOrange.addColorStop(0.45, "rgba(249, 125, 0, 0.08)");
      radOrange.addColorStop(1, "transparent");
      ctx.fillStyle = radOrange;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deep red accent glow — bottom section
      const radRed = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.8,
        0,
        canvas.width * 0.15, canvas.height * 0.8,
        canvas.width * 0.5
      );
      radRed.addColorStop(0, "rgba(200, 16, 46, 0.18)");
      radRed.addColorStop(0.5, "rgba(200, 16, 46, 0.06)");
      radRed.addColorStop(1, "transparent");
      ctx.fillStyle = radRed;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light streaks
      streaks.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate((s.angle * Math.PI) / 180);

        const streakGrad = ctx.createLinearGradient(0, 0, 0, s.height);
        streakGrad.addColorStop(0, `rgba(249, 125, 0, 0)`);
        streakGrad.addColorStop(0.5, `rgba(249, 125, 0, ${s.opacity})`);
        streakGrad.addColorStop(1, `rgba(249, 125, 0, 0)`);

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
