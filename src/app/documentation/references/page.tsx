import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocSection } from "@/components/docs/doc-section";

export const metadata: Metadata = {
  title: "References",
  description:
    "The published research DermaDiff is built on and validated against.",
};

type Reference = {
  authors: string;
  title: string;
  venue: string;
  tag: string;
  url: string;
};

const REFERENCES: Reference[] = [
  {
    authors: "Yan, S. et al.",
    title: "A multimodal vision foundation model for clinical dermatology",
    venue: "Nature Medicine, 2025",
    tag: "Classification",
    url: "https://www.nature.com/articles/s41591-024-03399-4",
  },
  {
    authors: "Sellergren, A. et al.",
    title: "MedGemma 1.5 Technical Report",
    venue: "arXiv:2604.05081, 2026",
    tag: "Explanation",
    url: "https://arxiv.org/abs/2604.05081",
  },
  {
    authors: "Tschandl, P., Rosendahl, C. & Kittler, H.",
    title: "The HAM10000 dataset",
    venue: "Scientific Data 5, 180161, 2018",
    tag: "Dataset",
    url: "https://doi.org/10.1038/sdata.2018.161",
  },
  {
    authors: "Codella, N. et al.",
    title: "Skin Lesion Analysis Toward Melanoma Detection: 2018/2019 Challenge",
    venue: "ISIC Archive / arXiv:1902.03368",
    tag: "Dataset",
    url: "https://arxiv.org/abs/1902.03368",
  },
  {
    authors: "Pacheco, A. et al.",
    title:
      "PAD-UFES-20: A skin lesion dataset composed of patient data and clinical images collected from smartphones",
    venue: "Data in Brief 32, 106221, 2020",
    tag: "Dataset",
    url: "https://data.mendeley.com/datasets/zr7vgbcyr2/1",
  },
  {
    authors: "Rombach, R. et al.",
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    venue: "CVPR, 2022",
    tag: "Diffusion",
    url: "https://arxiv.org/abs/2112.10752",
  },
  {
    authors: "Hu, E. et al.",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    venue: "ICLR, 2022",
    tag: "Fine-tuning",
    url: "https://arxiv.org/abs/2106.09685",
  },
  {
    authors: "Liu, S.-Y. et al.",
    title: "DoRA: Weight-Decomposed Low-Rank Adaptation",
    venue: "ICML, 2024",
    tag: "Fine-tuning",
    url: "https://arxiv.org/abs/2402.09353",
  },
  {
    authors: "Kim, M. et al.",
    title:
      "Diffusion-based skin disease data augmentation with fine-grained detail preservation",
    venue: "PLOS ONE 20(1), 2025",
    tag: "Augmentation",
    url: "https://doi.org/10.1371/journal.pone.0315498",
  },
  {
    authors: "Fayyad, J. et al.",
    title: "LesionGen: A Concept-Guided Diffusion Model for Dermatology Image Synthesis",
    venue: "MICCAI, 2025",
    tag: "Generation",
    url: "https://arxiv.org/abs/2507.23001",
  },
  {
    authors: "—",
    title:
      "SkinDualGen: Prompt-Driven Dual Generation of Skin Images and Masks",
    venue: "arXiv:2507.19970, 2025",
    tag: "Generation",
    url: "https://arxiv.org/abs/2507.19970",
  },
];

export default function ReferencesPage() {
  return (
    <>
      <div className="max-w-2xl">
        <div className="font-mono text-xs tracking-wide text-primary uppercase">
          References
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What DermaDiff is built on.
        </h1>
        <p className="mt-3 text-muted-foreground">
          The foundation models, datasets, and fine-tuning methods this
          project depends on — and the wider augmentation and
          explainability literature it sits alongside.
        </p>
      </div>

      <DocSection id="reading-list" eyebrow="—" title="Reading list">
        <ul className="flex flex-col divide-y divide-border border-t border-border">
          {REFERENCES.map((ref) => (
            <li key={ref.url} className="py-4">
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground underline-offset-3 hover:underline"
              >
                {ref.title}
              </a>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span>{ref.authors}</span>
                <span aria-hidden="true">·</span>
                <span>{ref.venue}</span>
                <Badge variant="outline" className="ml-1">
                  {ref.tag}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
