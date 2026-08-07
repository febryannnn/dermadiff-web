import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocSection } from "@/components/docs/doc-section";
import { FlowRow } from "@/components/docs/flow-row";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "The training and inference pipeline, PanDerm/MedGemma/Stable Diffusion model specifications, datasets, and the attention-rollout explainability method.",
};

const SD_FINETUNE_ROWS = [
  { source: "HAM10000", mel: "779", bcc: "360", akiec: "229", df: "81", vasc: "99" },
  { source: "ISIC 2019", mel: "4,522", bcc: "3,323", akiec: "867", df: "239", vasc: "253" },
  { source: "Longitudinal", mel: "69", bcc: "203", akiec: "85", df: "13", vasc: "0" },
];
const SD_FINETUNE_TOTAL = { mel: "5,370", bcc: "3,886", akiec: "1,181", df: "333", vasc: "352" };

const PANDERM_TRAIN_ROWS = [
  {
    source: "HAM10000 (real)",
    mel: "779",
    bcc: "360",
    akiec: "229",
    df: "81",
    vasc: "99",
    bkl: "1,099",
    nv: "6,705",
  },
  {
    source: "Synthetic (SD)",
    mel: "779",
    bcc: "360",
    akiec: "229",
    df: "81",
    vasc: "99",
    bkl: "0",
    nv: "0",
  },
];
const PANDERM_TRAIN_TOTAL = {
  mel: "1,558",
  bcc: "720",
  akiec: "458",
  df: "162",
  vasc: "198",
  bkl: "1,099",
  nv: "6,705",
};

function Spec({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-2.5 last:border-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-full shrink-0 font-mono text-xs text-muted-foreground sm:w-52">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function ModelCard({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="dark rounded-xl border border-border bg-background p-6 text-foreground">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <span className="text-xs text-muted-foreground">{role}</span>
      </div>
      <dl className="mt-4">{children}</dl>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <>
      <div className="max-w-2xl">
        <div className="font-mono text-xs tracking-wide text-primary uppercase">
          Methodology
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A five-way experiment isolating one variable.
        </h1>
        <p className="mt-3 text-muted-foreground">
          All five experiments share the same PanDerm configuration, split,
          and evaluation metrics — only the training data differs, which is
          what makes the comparison in{" "}
          <Link href="/documentation/results">Results</Link> meaningful.
        </p>
      </div>

      <DocSection id="pipeline" eyebrow="01" title="Pipeline">
        <p>
          The system has two distinct pipelines: a training pipeline that
          only runs offline to produce model weights, and an inference
          pipeline that runs on every image submitted through the product.
        </p>

        <h3 className="mt-6 text-sm font-medium text-foreground">Training</h3>
        <div className="mt-3">
          <FlowRow
            nodes={[
              "5 minority classes (mel, bcc, akiec, df, vasc)",
              "DoRA fine-tuning on Stable Diffusion",
              "Synthetic images, 1:1 with real",
              "+ HAM10000 majority classes (nv, bkl)",
              "PanDerm ViT-Large fine-tuning",
              "Best-validation checkpoint",
            ]}
          />
        </div>

        <h3 className="mt-8 text-sm font-medium text-foreground">
          Inference
        </h3>
        <div className="mt-3">
          <FlowRow
            nodes={[
              "Dermoscopic image",
              "PanDerm ViT-Large",
              "7-class probabilities + attention-rollout heatmap",
              "MedGemma 4B-IT",
              "5-part clinical rationale",
            ]}
          />
        </div>
        <p className="mt-6">
          Only the inference pipeline runs when you use the product — the
          classifier weights are already fixed. See{" "}
          <Link href="/product">the classifier</Link> to run it on an image.
        </p>
      </DocSection>

      <DocSection id="experiments" eyebrow="02" title="Five-way experiments">
        <p>
          The core comparison isolates the contribution of diffusion-based
          augmentation by holding everything else constant:
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Experiment</TableHead>
                <TableHead>Training data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["A — No augmentation", "Real HAM10000 images only (10,015 images)"],
                ["B — Stable Diffusion 2.1", "Real + SD 2.1 LoRA-generated synthetic minority images"],
                ["C — Stable Diffusion XL", "Real + SDXL LoRA-generated synthetic minority images"],
                ["D — Stable Diffusion 3.5 Large", "Real + SD 3.5 Large LoRA-generated synthetic minority images"],
                ["E — Stable Diffusion XL + DoRA", "Real + SDXL DoRA-generated synthetic minority images"],
              ].map(([exp, data]) => (
                <TableRow key={exp}>
                  <TableCell className="font-medium text-foreground">
                    {exp}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {data}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4">
          Experiment E isolates the fine-tuning method itself — same SDXL
          backbone as C, swapping LoRA for DoRA — see{" "}
          <Link href="/documentation/results">Results</Link> for what that
          changed.
        </p>
      </DocSection>

      <DocSection id="models" eyebrow="03" title="Models">
        <div className="flex flex-col gap-6">
          <ModelCard name="PanDerm ViT-Large" role="Classifier">
            <Spec label="Architecture" value="ViT-Large, 24 transformer blocks" />
            <Spec
              label="Input"
              value="224×224 image → 196 patch tokens (16×16 patches)"
            />
            <Spec
              label="Pretraining"
              value="Large-scale clinical dermatology corpus (Yan et al., Nature Medicine, 2025)"
            />
            <Spec
              label="Fine-tuning"
              value="AdamW, lr 5×10⁻⁴, weight decay 0.05, 50 epochs, batch size 128"
            />
            <Spec
              label="Regularization"
              value="MixUp (α=0.8), CutMix (α=1.0)"
            />
            <Spec
              label="Output"
              value="7-class softmax distribution + attention-rollout heatmap"
            />
          </ModelCard>

          <ModelCard name="MedGemma 4B-IT" role="Explanation">
            <Spec
              label="Input"
              value="Original image, attention heatmap, full 7-class probability distribution"
            />
            <Spec
              label="Output structure"
              value="Morphological findings → heatmap interpretation → reasoning for top prediction → differential reasoning → overall assessment"
            />
            <Spec
              label="Safety constraint"
              value={
                <>
                  Escalate-never-clear —{" "}
                  <span className="text-foreground">
                    never states that a lesion is safe
                  </span>
                  , to avoid a false sense of security that could delay
                  referral
                </>
              }
            />
          </ModelCard>

          <ModelCard
            name="Stable Diffusion augmentation"
            role="Training-time only"
          >
            <Spec
              label="Architectures evaluated"
              value="SD 2.1, SDXL, SD 3.5 Large"
            />
            <Spec
              label="Fine-tuning methods"
              value="LoRA (rank 16) and DoRA (rank 8), one adapter per minority class"
            />
            <Spec label="Sampling" value="DDIM scheduler, deterministic generation" />
            <Spec
              label="Prompt template"
              value={
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  a dermoscopic lesion photo of {"{class_name}"}
                </code>
              }
            />
            <Spec
              label="Evaluation metrics"
              value="FID, LPIPS, MS-SSIM"
            />
            <Spec
              label="Target classes"
              value="mel, bcc, akiec, df, vasc — the five minority classes in HAM10000"
            />
          </ModelCard>
        </div>
      </DocSection>

      <DocSection id="datasets" eyebrow="04" title="Datasets">
        <p>
          Three dermoscopic sources feed the Stable Diffusion fine-tuning
          stage: HAM10000, ISIC 2019, and a longitudinal skin-lesion
          dataset. Synthetic images are generated at a 1:1 ratio with real
          images per minority class, then combined with HAM10000 to train
          the classifier. A 70/15/15 stratified split is used throughout,
          and synthetic images are added only to the training set —
          validation and test always evaluate against real images.
        </p>

        <h3 className="mt-6 text-sm font-medium text-foreground">
          Stable Diffusion fine-tuning data
        </h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Melanoma</TableHead>
                <TableHead>BCC</TableHead>
                <TableHead>AKIEC</TableHead>
                <TableHead>DF</TableHead>
                <TableHead>VASC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SD_FINETUNE_ROWS.map((row) => (
                <TableRow key={row.source}>
                  <TableCell className="font-medium text-foreground">
                    {row.source}
                  </TableCell>
                  <TableCell className="font-mono">{row.mel}</TableCell>
                  <TableCell className="font-mono">{row.bcc}</TableCell>
                  <TableCell className="font-mono">{row.akiec}</TableCell>
                  <TableCell className="font-mono">{row.df}</TableCell>
                  <TableCell className="font-mono">{row.vasc}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-secondary/40">
                <TableCell className="font-medium text-foreground">
                  Total
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {SD_FINETUNE_TOTAL.mel}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {SD_FINETUNE_TOTAL.bcc}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {SD_FINETUNE_TOTAL.akiec}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {SD_FINETUNE_TOTAL.df}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {SD_FINETUNE_TOTAL.vasc}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3 className="mt-8 text-sm font-medium text-foreground">
          PanDerm ViT-Large training data
        </h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Melanoma</TableHead>
                <TableHead>BCC</TableHead>
                <TableHead>AKIEC</TableHead>
                <TableHead>DF</TableHead>
                <TableHead>VASC</TableHead>
                <TableHead>BKL</TableHead>
                <TableHead>NV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PANDERM_TRAIN_ROWS.map((row) => (
                <TableRow key={row.source}>
                  <TableCell className="font-medium text-foreground">
                    {row.source}
                  </TableCell>
                  <TableCell className="font-mono">{row.mel}</TableCell>
                  <TableCell className="font-mono">{row.bcc}</TableCell>
                  <TableCell className="font-mono">{row.akiec}</TableCell>
                  <TableCell className="font-mono">{row.df}</TableCell>
                  <TableCell className="font-mono">{row.vasc}</TableCell>
                  <TableCell className="font-mono">{row.bkl}</TableCell>
                  <TableCell className="font-mono">{row.nv}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-secondary/40">
                <TableCell className="font-medium text-foreground">
                  Total
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.mel}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.bcc}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.akiec}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.df}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.vasc}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.bkl}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground">
                  {PANDERM_TRAIN_TOTAL.nv}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocSection>

      <DocSection
        id="explainability"
        eyebrow="05"
        title="Explainability method"
      >
        <p>
          The heatmap is produced by{" "}
          <span className="text-foreground">attention rollout</span> (Abnar
          &amp; Zuidema, 2020) — it traces how attention actually propagates
          through all 24 of PanDerm&apos;s transformer blocks, recursively
          multiplying each block&apos;s averaged, identity-augmented
          attention matrix into a single map of which input patches most
          influenced the output. This is a structural property of the
          model&apos;s own forward pass, not a post-hoc approximation like
          Grad-CAM or a perturbation-based method like LIME.
        </p>
        <p>
          Because PanDerm is fine-tuned with mean-pooling over patch tokens
          rather than a single classification token, the rollout is adapted
          to measure the average influence each patch received across all
          other patches, instead of only tracing influence into one CLS
          token.
        </p>
        <p>
          That heatmap, together with the full ranked probability
          distribution, is what MedGemma reads to write its explanation —
          so the written rationale and the visual overlay are describing
          the same underlying computation, not two independent analyses.
        </p>
      </DocSection>
    </>
  );
}
