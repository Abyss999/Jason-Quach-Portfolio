"use client";
import { useEffect, useRef } from 'react';

interface NetNode {
  x: number; y: number;
  vx: number; vy: number;
  r: number; pulse: number;
}

function NeuralCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const NODE_COUNT = 62;
    const MAX_DIST = 190;
    let W = 0, H = 0, animId = 0;
    const nodes: NetNode[] = [];

    function mkNode(): NetNode {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.7,
        pulse: 0,
      };
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) nodes.push(mkNode());
    }

    // Dark: bright orange on near-black. Light: darker orange on warm white.
    const edgeColor  = isDark ? '249,115,22' : '194,65,12';   // orange-500 vs orange-800
    const nodeColor  = isDark ? '249,115,22' : '194,65,12';
    const glowBg     = isDark ? '0,0,0'      : '255,255,255';
    const edgeAlpha  = isDark ? 0.38         : 0.30;
    const nodeAlpha  = isDark ? 0.42         : 0.55;

    let pTimer = 0;
    function loop() {
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse = Math.max(0, n.pulse - 0.013);
      }

      if (++pTimer > 85) {
        pTimer = 0;
        nodes[Math.floor(Math.random() * nodes.length)].pulse = 1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * edgeAlpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${edgeColor},${a})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const a = nodeAlpha + n.pulse * 0.45;
        const r = n.r + n.pulse * 2.8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor},${a})`;
        ctx.fill();

        if (n.pulse > 0.22) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26);
          grd.addColorStop(0, `rgba(${nodeColor},${n.pulse * 0.38})`);
          grd.addColorStop(1, `rgba(${glowBg},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 26, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function SiteBackground({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {/* 1 — warm dark base */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, #0a0805 0%, #050402 55%, #080603 100%)' }}
        />

        {/* 2 — neural net canvas */}
        <NeuralCanvas isDark={true} />

        {/* 3 — hero glow */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: 'radial-gradient(ellipse 75% 52% at 50% 17%, rgba(234,88,12,0.45), transparent 72%)' }}
        />

        {/* 4 — edge vignette */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 50%, transparent 48%, rgba(0,0,0,0.72) 100%)' }}
        />

        {/* 5 — orange grid */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,88,12,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,88,12,.08) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            WebkitMaskImage: 'radial-gradient(ellipse 88% 58% at 50% 28%, black 25%, transparent 78%)',
            maskImage: 'radial-gradient(ellipse 88% 58% at 50% 28%, black 25%, transparent 78%)',
          }}
        />

        {/* 6 — bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[3]"
          style={{ height: '38%', background: 'linear-gradient(to bottom, transparent, #050402)' }}
        />
      </div>
    );
  }

  // Light mode
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* 1 — warm light base */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(150deg, #fff8f3 0%, #fdfaf7 55%, #fffbf8 100%)' }}
      />

      {/* 2 — neural net canvas */}
      <NeuralCanvas isDark={false} />

      {/* 3 — hero glow (soft warm bloom) */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 75% 52% at 50% 17%, rgba(234,88,12,0.18), transparent 72%)' }}
      />

      {/* 4 — subtle warm vignette (light, not dark) */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 50%, transparent 48%, rgba(253,245,235,0.6) 100%)' }}
      />

      {/* 5 — orange grid */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(194,65,12,.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(194,65,12,.09) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          WebkitMaskImage: 'radial-gradient(ellipse 88% 58% at 50% 28%, black 25%, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 88% 58% at 50% 28%, black 25%, transparent 78%)',
        }}
      />

      {/* 6 — bottom fade to warm white */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3]"
        style={{ height: '38%', background: 'linear-gradient(to bottom, transparent, #fdfaf7)' }}
      />
    </div>
  );
}
