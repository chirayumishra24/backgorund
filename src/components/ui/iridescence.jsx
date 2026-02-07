import { useEffect, useRef } from "react";

export default function Iridescence() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const colors = [
      [255, 0, 150],
      [0, 200, 255],
      [120, 255, 200],
    ];

    let t = 0;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < colors.length; i++) {
        const [r, g, b] = colors[i];
        const x = width / 2 + Math.sin(t + i) * width * 0.25;
        const y = height / 2 + Math.cos(t + i * 1.3) * height * 0.25;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, width * 0.6);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.35)`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  );
}
