export type PanDermResult = {
  probs: Record<string, number>;
  predicted_class: string;
  predicted_prob: number;
  heatmap_png_b64: string;
};

export type ExplainResult = {
  explanation: string;
};

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const RAW_BASE = process.env.NEXT_PUBLIC_MODAL_API_URL ?? "";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

export function isApiConfigured() {
  return API_BASE.length > 0;
}

async function messageFromResponse(res: Response): Promise<string> {
  try {
    const data = await res.clone().json();
    if (typeof data?.detail === "string") return data.detail;
    if (typeof data?.error === "string") return data.error;
  } catch {
    // response wasn't JSON — fall through to status text
  }
  return `${res.status} ${res.statusText}`.trim();
}

export async function classifyImage(
  file: File,
  signal?: AbortSignal,
): Promise<PanDermResult> {
  if (!isApiConfigured()) {
    throw new ApiError(
      "NEXT_PUBLIC_MODAL_API_URL isn't set. The classifier backend has no address to call.",
    );
  }
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${API_BASE}/api/classify`, {
    method: "POST",
    body: form,
    signal,
  });
  if (!res.ok) throw new ApiError(await messageFromResponse(res), res.status);
  return res.json();
}

export async function explainImage(
  file: File,
  pandermResult: PanDermResult,
  signal?: AbortSignal,
): Promise<ExplainResult> {
  if (!isApiConfigured()) {
    throw new ApiError(
      "NEXT_PUBLIC_MODAL_API_URL isn't set. The classifier backend has no address to call.",
    );
  }
  const form = new FormData();
  form.append("image", file);
  form.append("panderm_result", JSON.stringify(pandermResult));

  const res = await fetch(`${API_BASE}/api/explain`, {
    method: "POST",
    body: form,
    signal,
  });
  if (!res.ok) throw new ApiError(await messageFromResponse(res), res.status);
  return res.json();
}
