import type { Metadata } from "next";
import { DocSection } from "@/components/docs/doc-section";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The three-person team behind DermaDiff, and the four-week timeline the three parallel tracks ran on.",
};

const TEAM = [
  {
    initials: "FF",
    name: "Farel Febryan Ghiffari P.A.",
    id: "5025241137",
    track: "Fine-tuned Stable Diffusion 2.1",
    tone: "bg-risk-info text-risk-info-foreground",
  },
  {
    initials: "JK",
    name: "Jason Kumarkono",
    id: "5025241105",
    track: "Fine-tuned Stable Diffusion XL (LoRA + DoRA)",
    tone: "bg-risk-moderate text-risk-moderate-foreground",
  },
  {
    initials: "IR",
    name: "M. Ilyas Rusdi",
    id: "5025241007",
    track: "Fine-tuned Stable Diffusion 3.5 Large",
    tone: "bg-risk-low text-risk-low-foreground",
  },
];

const TIMELINE = [
  {
    week: 1,
    days: "1–5",
    theme: "Setup",
    farel: "Dataset scraping, PanDerm setup, baseline classifier (Exp A)",
    jason: "Longitudinal dataset request, stratified split, PanDerm setup",
    ilyas: "Dataset exploration, environment and pipeline planning",
  },
  {
    week: 2,
    days: "6–10",
    theme: "Fine-tuning",
    farel: "SD 2.1 LoRA pipeline and fine-tuning on all three datasets",
    jason: "SDXL LoRA fine-tuning, hyperparameter tuning, 1x/2x generation",
    ilyas: "SD 3.5 Large pipeline, LoRA training runs, generation evaluation",
  },
  {
    week: 3,
    days: "11–15",
    theme: "Evaluation",
    farel: "Experiment C training, comparison tables, SD 2.1 deployed",
    jason: "FID/LPIPS/SSIM across experiments, real-vs-synthetic grids, SDXL deployed",
    ilyas: "Training-strategy iteration, F1/recall plots for SD 3.5",
  },
  {
    week: 4,
    days: "16–20",
    theme: "Ship",
    farel: "Site documentation, PanDerm classifier deployed, final presentation",
    jason: "SDXL+DoRA experiment (E), cross-domain PAD-UFES-20 evaluation, methodology write-up",
    ilyas: "Presentation slides, Medium write-up, paper draft",
  },
];

export default function TeamPage() {
  return (
    <>
      <div className="max-w-2xl">
        <div className="font-mono text-xs tracking-wide text-primary uppercase">
          Team
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Three people, one month.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Three tracks ran in parallel through Weeks 1–2 — one fine-tuned
          Stable Diffusion architecture each — then converged in Week 3 for
          integration and cross-experiment comparison.
        </p>
      </div>

      <DocSection id="roster" eyebrow="01" title="Roster">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.id}
              className="dark rounded-xl border border-border bg-background p-5 text-foreground"
            >
              <div
                className={`flex size-11 items-center justify-center rounded-full font-mono text-sm font-medium ${member.tone}`}
              >
                {member.initials}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {member.id}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {member.track}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Department of Informatics, Institut Teknologi Sepuluh Nopember.
        </p>
      </DocSection>

      <DocSection id="timeline" eyebrow="02" title="Four-week timeline">
        <p>
          Each person owned one diffusion architecture end to end — fine-tune,
          generate, evaluate — before the team converged on a shared
          comparison methodology.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {TIMELINE.map((row) => (
            <div
              key={row.week}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-muted-foreground">
                  {row.week}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  Week {row.week}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  Days {row.days}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {row.theme}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-1 gap-2.5 border-t border-border pt-3 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium text-foreground">
                    Farel
                  </dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {row.farel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-foreground">
                    Jason
                  </dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {row.jason}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-foreground">
                    Ilyas
                  </dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {row.ilyas}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </DocSection>
    </>
  );
}
