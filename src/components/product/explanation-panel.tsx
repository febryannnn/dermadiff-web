"use client";

import { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { parseExplanation } from "@/lib/parse-explanation";

const LOADING_MESSAGES = [
  "Analyzing dermoscopic morphology",
  "Cross-referencing the probability distribution",
  "Interpreting attention heatmap regions",
  "Drafting a structured clinical rationale",
];

const SKELETON_WIDTHS = ["100%", "94%", "88%", "97%", "60%"];

function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % LOADING_MESSAGES.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p className="shimmer text-sm font-medium text-foreground">
        {LOADING_MESSAGES[index]}…
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        {SKELETON_WIDTHS.map((w, i) => (
          <Skeleton key={i} className="h-3.5" style={{ width: w }} />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        MedGemma is reading the image, the heatmap, and the full probability
        spread. This usually takes under a minute.
      </p>
    </div>
  );
}

export function ExplanationPanel({
  status,
  text,
  errorMessage,
  onRetry,
}: {
  status: "idle" | "loading" | "error" | "done";
  text?: string;
  errorMessage?: string;
  onRetry?: () => void;
}) {
  if (status === "idle") {
    return (
      <p className="text-sm text-muted-foreground">
        The written rationale appears here once classification finishes.
      </p>
    );
  }

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-start gap-2 text-sm text-destructive">
          <WarningCircle weight="bold" className="mt-0.5 size-4 shrink-0" />
          <span>{errorMessage ?? "Couldn't generate an explanation."}</span>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <ArrowClockwise weight="bold" />
            Retry explanation
          </Button>
        )}
      </div>
    );
  }

  const sections = parseExplanation(text ?? "");
  const structured = sections.filter((s) => s.title).length >= 3;

  if (!structured) {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
        {(text ?? "").split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <div className="flex items-center gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[10px] text-muted-foreground">
                {i + 1}
              </span>
              <h4 className="text-sm font-medium text-foreground">
                {section.title}
              </h4>
            </div>
          )}
          <p className="mt-1.5 pl-7 text-sm leading-relaxed text-foreground/85">
            {section.body}
          </p>
        </div>
      ))}
    </div>
  );
}
