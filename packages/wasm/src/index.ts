export interface ShapedGlyph {
  glyphId: number;
  cluster: number;
  xAdvance: number;
  yAdvance: number;
  xOffset: number;
  yOffset: number;
}

export interface ShapeResult {
  glyphs: ShapedGlyph[];
  text: string;
}

export interface WasmShaperOptions {
  fontUrl?: string;
  fontData?: ArrayBuffer;
}

type HarfbuzzModule = {
  Blob: new (data: ArrayBuffer) => { destroy: () => void };
  Face: new (blob: unknown, index: number) => { destroy: () => void };
  Font: new (face: unknown) => { destroy: () => void };
  Buffer: new () => {
    addText: (text: string) => void;
    guessSegmentProperties: () => void;
    json: () => ShapedGlyph[];
    destroy: () => void;
  };
  shape: (font: unknown, buffer: unknown) => void;
};

let hbModule: HarfbuzzModule | null = null;

/**
 * Lazily load harfbuzzjs WASM module.
 * Only needed for Canvas/PDF export or legacy browser fallback.
 */
export async function loadHarfbuzz(): Promise<HarfbuzzModule> {
  if (hbModule) return hbModule;

  try {
    const hb = await import('harfbuzzjs');
    hbModule = hb as unknown as HarfbuzzModule;
    return hbModule;
  } catch {
    throw new Error(
      'harfbuzzjs is not installed. Install it with: npm install harfbuzzjs'
    );
  }
}

/**
 * Shape Mongolian text using Harfbuzz WASM.
 * Use only when native browser shaping is insufficient.
 */
export async function shapeMongolianText(
  text: string,
  options: WasmShaperOptions = {}
): Promise<ShapeResult> {
  const hb = await loadHarfbuzz();

  let fontData: ArrayBuffer;
  if (options.fontData) {
    fontData = options.fontData;
  } else if (options.fontUrl) {
    const response = await fetch(options.fontUrl);
    fontData = await response.arrayBuffer();
  } else {
    throw new Error('Either fontUrl or fontData must be provided');
  }

  const blob = new hb.Blob(fontData);
  const face = new hb.Face(blob, 0);
  const font = new hb.Font(face);
  const buffer = new hb.Buffer();

  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(font, buffer);

  const glyphs = buffer.json();

  buffer.destroy();
  font.destroy();
  face.destroy();
  blob.destroy();

  return { glyphs, text };
}

/**
 * Check if WASM shaping is available in the current environment.
 */
export async function isWasmShapingAvailable(): Promise<boolean> {
  try {
    await loadHarfbuzz();
    return true;
  } catch {
    return false;
  }
}
