/**
 * Traditional Mongolian Unicode code points and classification helpers.
 *
 * Ported to TypeScript from suragch/mongol_code (CC0-1.0), which implements
 * the GB/T 25914-2023 standard. Only the classification logic is adapted here;
 * this library renders via native CSS/OpenType and does not convert to Menksoft.
 */

// Control characters (U+180A–U+180F)
export const NIRUGU = 0x180a;
export const FVS1 = 0x180b;
export const FVS2 = 0x180c;
export const FVS3 = 0x180d;
export const MVS = 0x180e; // Mongolian Vowel Separator
export const FVS4 = 0x180f;

// Narrow No-Break Space — connects stem and suffix
export const NNBSP = 0x202f;

// Vowels (U+1820–U+1827)
export const A = 0x1820;
export const E = 0x1821;
export const I = 0x1822;
export const O = 0x1823;
export const U = 0x1824;
export const OE = 0x1825;
export const UE = 0x1826;
export const EE = 0x1827;

// Consonants (U+1828–U+1842)
export const NA = 0x1828;
export const BA = 0x182a;
export const GA = 0x182d;
export const SA = 0x1830;
export const DA = 0x1833;
export const RA = 0x1837;
export const CHI = 0x1842;

// Mongolian block bounds
export const MONGOLIAN_BLOCK_START = 0x1800;
export const MONGOLIAN_BLOCK_END = 0x18af;

export function isMongolianLetter(cp: number): boolean {
  return cp >= A && cp <= CHI;
}

export function isConsonant(cp: number): boolean {
  return cp >= NA && cp <= CHI;
}

export function isVowel(cp: number): boolean {
  return cp >= A && cp <= EE;
}

export function isMasculineVowel(cp: number): boolean {
  return cp === A || cp === O || cp === U;
}

export function isFeminineVowel(cp: number): boolean {
  return cp === E || cp === EE || cp === OE || cp === UE;
}

export function isFVS(cp: number): boolean {
  return cp === FVS1 || cp === FVS2 || cp === FVS3 || cp === FVS4;
}

/** FVS or MVS control character (U+180A–U+180F). */
export function isControlCharacter(cp: number): boolean {
  return cp >= NIRUGU && cp <= FVS4;
}

export function isMongolianBlock(cp: number): boolean {
  return cp >= MONGOLIAN_BLOCK_START && cp <= MONGOLIAN_BLOCK_END;
}
