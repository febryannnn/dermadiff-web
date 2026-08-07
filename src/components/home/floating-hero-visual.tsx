"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { PatchGridVisual } from "@/components/home/patch-grid-visual";
import { LogoMark } from "@/components/logo-mark";

function Float({
  children,
  duration,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  duration: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

const LOG_LINES = [
  "Reading attention heatmap",
  "Cross-referencing probabilities",
  "Rationale drafted",
];

export const FloatingHeroVisual = memo(function FloatingHeroVisual() {
  return (
    <div className="relative hidden h-[460px] w-full lg:block">
      <svg
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        <line
          x1="34%"
          y1="26%"
          x2="41%"
          y2="39%"
          className="stroke-foreground/15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="49%"
          y1="41%"
          x2="60%"
          y2="18%"
          className="stroke-foreground/15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="30%"
          y1="52%"
          x2="18%"
          y2="20%"
          className="stroke-foreground/15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="46%"
          y1="47%"
          x2="34%"
          y2="58%"
          className="stroke-foreground/15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="52%"
          y1="45%"
          x2="70%"
          y2="63%"
          className="stroke-foreground/15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>

      <Float
        duration={7}
        className="absolute top-0 left-0 w-[220px] rotate-[-7deg]"
      >
        <div className="rounded-xl border border-border bg-card p-2.5 shadow-[0_24px_48px_-24px_rgba(28,20,16,0.28)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/akiec.jpg"
            alt="Placeholder dermoscopic image — replace with a real capture"
            className="aspect-square w-full rounded-lg object-cover grayscale-[15%]"
          />
          <div className="mt-2 flex items-center justify-between px-0.5">
            <span className="font-mono text-[10px] text-muted-foreground">
              lesion_0192.jpg
            </span>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </Float>

      <Float
        duration={8.5}
        delay={0.4}
        className="absolute top-8 right-0 z-20 w-[240px] rotate-[4deg]"
      >
        <div className="rounded-xl border border-border bg-card p-4 shadow-[0_24px_48px_-24px_rgba(28,20,16,0.28)]">
          <div className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            Classification
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-base font-semibold text-foreground">
              Melanoma
            </span>
            <span className="font-mono text-sm text-primary">62.4%</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[62%] rounded-full bg-risk-high-foreground" />
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[21%] rounded-full bg-risk-low-foreground opacity-50" />
            </div>
          </div>
        </div>
      </Float>

      <Float
        duration={6}
        delay={0.25}
        className="absolute top-[38%] left-[40%] z-30 w-24 rotate-[-6deg]"
      >
        <div className="flex aspect-square w-24 items-center justify-center rounded-2xl border border-border bg-accent shadow-[inset_0_2px_5px_rgba(28,20,16,0.16),0_20px_40px_-20px_rgba(28,20,16,0.3)]">
          <LogoMark className="size-9 opacity-90" />
        </div>
      </Float>

      <Float
        duration={9}
        delay={0.15}
        className="absolute bottom-6 left-12 w-[190px] rotate-[-4deg]"
      >
        <div className="w-[190px]">
          <PatchGridVisual />
        </div>
      </Float>

      <Float
        duration={7.5}
        delay={0.6}
        className="absolute right-2 bottom-0 z-20 w-[250px] rotate-[5deg]"
      >
        <div className="rounded-xl border border-foreground/10 bg-foreground p-4 text-background shadow-[0_24px_48px_-24px_rgba(28,20,16,0.4)]">
          <div className="font-mono text-[10px] tracking-wide text-background/50 uppercase">
            POST /api/explain
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {LOG_LINES.map((line) => (
              <li
                key={line}
                className="flex items-center gap-1.5 font-mono text-xs text-background/85"
              >
                <CheckCircle
                  weight="fill"
                  className="size-3.5 shrink-0 text-primary"
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Float>
    </div>
  );
});
