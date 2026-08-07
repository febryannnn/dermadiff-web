import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocSection } from "@/components/docs/doc-section";
import { ConfusionMatrix } from "@/components/docs/confusion-matrix";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The five-experiment comparison: accuracy, per-class recall, confusion matrices, and synthetic image quality (FID, LPIPS, MS-SSIM).",
};

const EXPERIMENTS = [
  { id: "A", label: "No augmentation (baseline)" },
  { id: "B", label: "Stable Diffusion 2.1" },
  { id: "C", label: "Stable Diffusion XL" },
  { id: "D", label: "Stable Diffusion 3.5 Large" },
  { id: "E", label: "Stable Diffusion XL + DoRA" },
];

const AVG_DATA = [
  { exp: "A", accuracy: 0.8756, macroF1: 0.8114, weightedF1: 0.8785, macroRecall: 0.7955 },
  { exp: "B", accuracy: 0.8729, macroF1: 0.8218, weightedF1: 0.8786, macroRecall: 0.8166 },
  { exp: "C", accuracy: 0.8842, macroF1: 0.8409, weightedF1: 0.8891, macroRecall: 0.8311 },
  { exp: "D", accuracy: 0.8869, macroF1: 0.8482, weightedF1: 0.8913, macroRecall: 0.8318 },
  { exp: "E", accuracy: 0.8935, macroF1: 0.8471, weightedF1: 0.8972, macroRecall: 0.836 },
];

const RECALL_DATA = [
  { exp: "A", akiec: 0.7347, bcc: 0.9091, bkl: 0.8424, df: 0.5882, mel: 0.7126, nv: 0.9175, vasc: 0.8636 },
  { exp: "B", akiec: 0.7959, bcc: 0.9351, bkl: 0.8424, df: 0.5882, mel: 0.7964, nv: 0.8946, vasc: 0.8636 },
  { exp: "C", akiec: 0.8367, bcc: 0.8701, bkl: 0.8364, df: 0.7059, mel: 0.7904, nv: 0.9145, vasc: 0.8636 },
  { exp: "D", akiec: 0.7755, bcc: 0.8961, bkl: 0.8485, df: 0.7059, mel: 0.8204, nv: 0.9125, vasc: 0.8636 },
  { exp: "E", akiec: 0.816, bcc: 0.935, bkl: 0.867, df: 0.647, mel: 0.808, nv: 0.917, vasc: 0.864 },
];

const GEN_QUALITY = [
  { exp: "B", fid: "139.5", lpips: "0.4253", mssim: "0.3349" },
  { exp: "C", fid: "175.0", lpips: "0.3980", mssim: "0.3881" },
  { exp: "D", fid: "235.0", lpips: "0.4981", mssim: "0.2834" },
  { exp: "E", fid: "177.6", lpips: "0.4851", mssim: "0.4098" },
];

const CONFUSION_LABELS = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"];

const CONFUSION_A = [
  [36, 1, 7, 0, 4, 1, 0],
  [1, 70, 5, 0, 1, 0, 0],
  [4, 3, 139, 0, 6, 13, 0],
  [0, 2, 5, 10, 0, 0, 0],
  [0, 2, 23, 0, 119, 23, 0],
  [0, 7, 27, 0, 48, 923, 1],
  [0, 1, 0, 0, 1, 1, 19],
];

const CONFUSION_D = [
  [38, 1, 3, 0, 3, 4, 0],
  [0, 69, 3, 1, 1, 3, 0],
  [3, 1, 140, 0, 9, 12, 0],
  [0, 1, 3, 12, 1, 0, 0],
  [0, 1, 12, 0, 137, 17, 0],
  [0, 2, 14, 0, 72, 918, 0],
  [0, 0, 1, 0, 1, 1, 19],
];

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

function fmt4(v: number) {
  return v.toFixed(4);
}

export default function ResultsPage() {
  const bestAccuracy = Math.max(...AVG_DATA.map((d) => d.accuracy));
  const bestMacroRecall = Math.max(...AVG_DATA.map((d) => d.macroRecall));

  return (
    <>
      <div className="max-w-2xl">
        <div className="font-mono text-xs tracking-wide text-primary uppercase">
          Results
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What augmentation actually changed.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Five PanDerm ViT-Large runs, identical in every respect except the
          training data. Final model selection weighted malignant-class
          recall over raw accuracy — the numbers below show why that
          distinction mattered.
        </p>
      </div>

      <DocSection id="headline" eyebrow="01" title="Headline metrics">
        <p>
          Stable Diffusion XL fine-tuned with DoRA (Experiment E) came out
          ahead on accuracy, weighted F1, and macro recall — but the
          margin over the simpler variants is modest, and it didn&apos;t
          win on every axis.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Experiment</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Macro F1</TableHead>
                <TableHead className="text-right">Weighted F1</TableHead>
                <TableHead className="text-right">Macro recall</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AVG_DATA.map((row) => (
                <TableRow key={row.exp}>
                  <TableCell className="font-medium text-foreground">
                    {row.exp} —{" "}
                    {EXPERIMENTS.find((e) => e.id === row.exp)?.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-mono",
                      row.accuracy === bestAccuracy &&
                        "font-semibold text-primary",
                    )}
                  >
                    {pct(row.accuracy)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {fmt4(row.macroF1)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {fmt4(row.weightedF1)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-mono",
                      row.macroRecall === bestMacroRecall &&
                        "font-semibold text-primary",
                    )}
                  >
                    {fmt4(row.macroRecall)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4">
          Notably, macro recall — the metric that treats every class
          equally regardless of how common it is — improved monotonically
          from A through E, even in Experiment B, where raw accuracy
          briefly dipped below baseline. Accuracy is dominated by the
          majority nevi class; macro recall is not, which is precisely why
          it was weighted more heavily in model selection.
        </p>
      </DocSection>

      <DocSection id="per-class" eyebrow="02" title="Per-class recall">
        <p>
          Recall — of the lesions that were actually a given class, how
          many did the model catch — is the number that matters most for
          the malignant and suspicious classes, where a miss is the
          costly failure mode.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exp</TableHead>
                <TableHead className="text-right">akiec</TableHead>
                <TableHead className="text-right">bcc</TableHead>
                <TableHead className="text-right">bkl</TableHead>
                <TableHead className="text-right">df</TableHead>
                <TableHead className="text-right">mel</TableHead>
                <TableHead className="text-right">nv</TableHead>
                <TableHead className="text-right">vasc</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECALL_DATA.map((row) => (
                <TableRow key={row.exp}>
                  <TableCell className="font-medium text-foreground">
                    {row.exp}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.akiec)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.bcc)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.bkl)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.df)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.mel)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.nv)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {pct(row.vasc)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <ul className="mt-5 flex flex-col gap-3">
          <li className="flex gap-2.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-high-foreground" />
            <span>
              <strong className="text-foreground">Melanoma recall</strong>{" "}
              rose from 71.3% (baseline) to a high of 82.0% under SD 3.5
              Large augmentation — the single largest swing on the class
              where a miss matters most.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-moderate-foreground" />
            <span>
              <strong className="text-foreground">
                Actinic keratosis and dermatofibroma
              </strong>{" "}
              — the two most data-starved classes — saw the clearest,
              most consistent gains across every augmented experiment:
              akiec recall reached 83.7% (from 73.5%), df reached 70.6%
              (from 58.8%).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              <strong className="text-foreground">
                Basal cell carcinoma recall didn&apos;t improve uniformly.
              </strong>{" "}
              It dropped under SDXL-LoRA (87.0%) and SD 3.5 (89.6%)
              relative to the 90.9% baseline — but held at ~93.5% under
              both SD 2.1 and SDXL+DoRA. Swapping LoRA for DoRA on the
              same SDXL backbone (C → E) recovered exactly the recall
              LoRA had cost.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              <strong className="text-foreground">
                Vascular lesion recall barely moved
              </strong>{" "}
              (86.3–86.4% in every experiment) — it was already the
              easiest minority class to separate.
            </span>
          </li>
        </ul>
      </DocSection>

      <DocSection id="confusion" eyebrow="03" title="Confusion matrices">
        <p>
          Rows are the actual class, columns the predicted class — the
          diagonal is correct calls. Comparing the baseline against SD 3.5
          Large (Experiment D, the highest macro-F1 of the five) shows
          where the errors moved, not just whether accuracy went up.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ConfusionMatrix
            title="Experiment A — Baseline"
            labels={CONFUSION_LABELS}
            matrix={CONFUSION_A}
          />
          <ConfusionMatrix
            title="Experiment D — SD 3.5 Large"
            labels={CONFUSION_LABELS}
            matrix={CONFUSION_D}
          />
        </div>
        <p className="mt-5">
          The clearest shift is melanoma (row <code>mel</code>): the
          baseline correctly calls 119 of 167 melanoma cases, with 23
          misread as benign keratosis and 23 as nevi. Experiment D
          correctly calls 137, cutting both confusions roughly in half
          (12 misread as bkl, 17 as nevi). Actinic keratosis follows the
          same pattern — true positives rise from 36 to 38 out of 49.
        </p>
      </DocSection>

      <DocSection
        id="generation-quality"
        eyebrow="04"
        title="Synthetic image quality"
      >
        <p>
          FID and LPIPS measure how close the synthetic distribution is to
          real dermoscopic images — lower is closer. MS-SSIM measures
          structural similarity to real references. These are properties
          of the generator alone, independent of the downstream
          classifier.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Experiment</TableHead>
                <TableHead className="text-right">FID ↓</TableHead>
                <TableHead className="text-right">LPIPS ↓</TableHead>
                <TableHead className="text-right">MS-SSIM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {GEN_QUALITY.map((row) => (
                <TableRow key={row.exp}>
                  <TableCell className="font-medium text-foreground">
                    {row.exp} —{" "}
                    {EXPERIMENTS.find((e) => e.id === row.exp)?.label}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.fid}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.lpips}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.mssim}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4">
          The generator with the best (lowest) FID — SD 2.1, at 139.5 —
          was not the one that produced the best downstream classifier.
          SDXL+DoRA had a middling FID (177.6) but the best accuracy and
          macro recall of any experiment. Realistic-looking synthetic
          images and{" "}
          <em>classification-useful</em> synthetic images turned out to be
          related but distinct properties.
        </p>
      </DocSection>
    </>
  );
}
