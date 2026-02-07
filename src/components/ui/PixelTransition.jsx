import { useEffect, useRef } from "react";

export default function PixelTransition({
  pixelSize = 24,
  duration = 1200,
  color = "#000",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      start();
    };

    window.addEventListener("resize", resize);

    let pixels = [];

    const start = () => {
      pixels = [];

      for (let x = 0; x < width; x += pixelSize) {
        for (let y = 0; y < height; y += pixelSize) {
          pixels.push({
            x,
            y,
            delay: Math.random() * duration,
            life: 1,
          });
        }
      }

      animate();
    };

    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      ctx.clearRect(0, 0, width, height);

      pixels.forEach((p) => {
        const t = Math.min(
          Math.max((elapsed - p.delay) / 400, 0),
          1
        );

        const alpha = 1 - t;
        const scale = 1 - t * 0.8;

        if (alpha > 0) {
          ctx.fillStyle = `rgba(0,0,0,${alpha})`;
          ctx.fillRect(
            p.x + pixelSize * (1 - scale) * 0.5,
            p.y + pixelSize * (1 - scale) * 0.5,
            pixelSize * scale,
            pixelSize * scale
          );
        }
      });

      if (elapsed < duration + 500) {
        requestAnimationFrame(animate);
      }
    };

    start();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [pixelSize, duration, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
