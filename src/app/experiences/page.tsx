import type { Metadata } from "next";
import { Play } from "@phosphor-icons/react/dist/ssr/Play";
import { Quotes } from "@phosphor-icons/react/dist/ssr/Quotes";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "User Experiences",
  description:
    "What clinicians who have tried DermaDiff say about reading dermoscopic lesions with it.",
};

const FEATURED = {
  name: "dr. Amelia Wibowo, Sp.KK",
  role: "Dermatologist, private practice",
  initials: "AW",
  quote:
    "What changed my mind was the heatmap. I can see the exact patches the model weighted before I even read MedGemma's writeup, so I'm agreeing with a visible argument, not a black box.",
};

const REVIEWS = [
  {
    name: "dr. Bagus Santoso",
    role: "General practitioner, rural clinic",
    initials: "BS",
    quote:
      "We don't have a dermatologist on staff, so DermaDiff is the second opinion I didn't have before. It's fast enough to run while the patient is still in the room.",
  },
  {
    name: "dr. Nadia Prameswari",
    role: "Dermatology resident",
    initials: "NP",
    quote:
      "I read the lesion myself first, then check DermaDiff's rationale against my own. It's caught patch-level detail I'd glossed over more than once.",
  },
  {
    name: "Yulia Ramadhani",
    role: "Telehealth triage coordinator",
    initials: "YR",
    quote:
      "For remote referrals, the five-part write-up gives the referring physician something concrete to act on instead of a bare percentage.",
  },
];

const AVATAR_TONES = [
  "bg-risk-info text-risk-info-foreground",
  "bg-risk-moderate text-risk-moderate-foreground",
  "bg-risk-low text-risk-low-foreground",
];

export default function ExperiencesPage() {
  return (
    <div className="pt-12 pb-20 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs tracking-wide text-primary uppercase">
              User experiences
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Clinicians reading lesions with DermaDiff.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Early feedback from clinicians who used DermaDiff as a second
              opinion during dermoscopic review.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="dark mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-background text-foreground lg:grid-cols-2">
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 border-b border-border bg-card lg:aspect-auto lg:border-r lg:border-b-0">
              <span className="flex size-20 items-center justify-center rounded-full bg-secondary font-mono text-xl font-medium text-foreground">
                {FEATURED.initials}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Play weight="fill" className="size-3" />
                View full video
              </button>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <Quotes
                weight="fill"
                className="size-6 text-muted-foreground/40"
              />
              <p className="mt-3 text-lg leading-relaxed text-foreground">
                {FEATURED.quote}
              </p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  {FEATURED.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {FEATURED.role}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <Quotes
                  weight="fill"
                  className="size-5 text-muted-foreground/30"
                />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                  {review.quote}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`flex size-9 items-center justify-center rounded-full font-mono text-xs font-medium ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                  >
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
