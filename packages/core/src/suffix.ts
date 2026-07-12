/**
 * Traditional Mongolian suffix table and gender-aware selection.
 *
 * Ported from suragch/mongol_code (CC0-1.0), GB/T 25914-2023 model.
 * Every suffix is prefixed with MVS (U+180E) in this table, mirroring the
 * source. Suffixes attach to the stem via a narrow no-break space (NNBSP,
 * U+202F) which both prevents line breaks and triggers final-form shaping.
 */
import { NA, BA, GA, SA, RA, DA, isVowel } from './mongol-letters.js';
import type { Gender } from './vowel-harmony.js';

const MVS = '\u180E';

// prettier-ignore
export const SUFFIXES = {
  YIN: MVS + '\u1836\u1822\u1828',
  UN: MVS + '\u1824\u1828',
  UEN: MVS + '\u1826\u1828',
  U: MVS + '\u1824',
  UE: MVS + '\u1826',
  I: MVS + '\u1822',
  YI: MVS + '\u1836\u1822',
  DU: MVS + '\u1833\u1824',
  DUE: MVS + '\u1833\u1826',
  TU: MVS + '\u1832\u1824',
  TUE: MVS + '\u1832\u1826',
  DUR: MVS + '\u1833\u1824\u1837',
  DUER: MVS + '\u1833\u1826\u1837',
  TUR: MVS + '\u1832\u1824\u1837',
  TUER: MVS + '\u1832\u1826\u1837',
  DAQI: MVS + '\u1833\u1820\u182C\u1822',
  DEQI: MVS + '\u1833\u1821\u182C\u1822',
  TAQI: MVS + '\u1832\u1820\u182C\u1822',
  TEQI: MVS + '\u1832\u1821\u182C\u1822',
  ACHA: MVS + '\u1820\u1834\u1820',
  ECHE: MVS + '\u1821\u1834\u1821',
  BAR: MVS + '\u182A\u1820\u1837',
  BER: MVS + '\u182A\u1821\u1837',
  IYAR: MVS + '\u1822\u1836\u1820\u1837',
  IYER: MVS + '\u1822\u1836\u1821\u1837',
  TAI: MVS + '\u1832\u1820\u1822',
  TEI: MVS + '\u1832\u1821\u1822',
  LUGA: MVS + '\u182F\u1824\u182D' + MVS + '\u1820',
  LUEGE: MVS + '\u182F\u1826\u182D\u1821',
  BAN: MVS + '\u182A\u1820\u1828',
  BEN: MVS + '\u182A\u1821\u1828',
  IYAN: MVS + '\u1822\u1836\u1820\u1828',
  IYEN: MVS + '\u1822\u1836\u1821\u1828',
  YUGAN: MVS + '\u1836\u1824\u182D\u1820\u1828',
  YUEGEN: MVS + '\u1836\u1826\u182D\u1821\u1828',
  DAGAN: MVS + '\u1833\u1820\u182D\u1820\u1828',
  DEGEN: MVS + '\u1833\u1821\u182D\u1821\u1828',
  TAGAN: MVS + '\u1832\u1820\u182D\u1820\u1828',
  TEGEN: MVS + '\u1832\u1821\u182D\u1821\u1828',
  ACHAGAN: MVS + '\u1820\u1834\u1820\u182D\u1820\u1828',
  ECHEGEN: MVS + '\u1821\u1834\u1821\u182D\u1821\u1828',
  TAIGAN: MVS + '\u1832\u1820\u1822\u182D\u1820\u1828',
  TEIGEN: MVS + '\u1832\u1821\u1822\u182D\u1821\u1828',
  UD: MVS + '\u1824\u1833',
  UED: MVS + '\u1826\u1833',
  NUGUD: MVS + '\u1828\u1824\u182D\u1824\u1833',
  NUEGUED: MVS + '\u1828\u1826\u182D\u1826\u1833',
  NAR: MVS + '\u1828\u1820\u1837',
  NER: MVS + '\u1828\u1821\u1837',
  UU: MVS + '\u1824\u1824',
  UEUE: MVS + '\u1826\u1826',
  DA: MVS + '\u1833\u1820',
  DE: MVS + '\u1833\u1821',
  CHU: MVS + '\u1834\u1824',
  CHUE: MVS + '\u1834\u1826',
} as const;

function isBGDRS(cp: number): boolean {
  return cp === BA || cp === GA || cp === DA || cp === RA || cp === SA;
}

/**
 * YIN after a vowel, UN after a consonant, U/UE after N.
 * Selects the genitive suffix form.
 */
export function yinUnU(gender: Gender, lastChar: number): string {
  if (isVowel(lastChar)) return SUFFIXES.YIN;
  if (lastChar === NA) {
    return gender === 'masculine' ? SUFFIXES.U : SUFFIXES.UE;
  }
  return gender === 'masculine' ? SUFFIXES.UN : SUFFIXES.UEN;
}

/** TU after B/G/D/R/S, otherwise DU. Dative-locative form. */
export function tuDu(gender: Gender, lastChar: number): string {
  if (isBGDRS(lastChar)) {
    return gender === 'masculine' ? SUFFIXES.TU : SUFFIXES.TUE;
  }
  return gender === 'masculine' ? SUFFIXES.DU : SUFFIXES.DUE;
}

/** TAGAN/DAGAN/TEGEN/DEGEN reflexive-possessive form. */
export function taganDagan(gender: Gender, lastChar: number): string {
  if (isBGDRS(lastChar)) {
    return gender === 'masculine' ? SUFFIXES.TAGAN : SUFFIXES.TEGEN;
  }
  return gender === 'masculine' ? SUFFIXES.DAGAN : SUFFIXES.DEGEN;
}

/** TAQI/DAQI/TEQI/DEQI form. */
export function taqiDaqi(gender: Gender, lastChar: number): string {
  if (isBGDRS(lastChar)) {
    return gender === 'masculine' ? SUFFIXES.TAQI : SUFFIXES.TEQI;
  }
  return gender === 'masculine' ? SUFFIXES.DAQI : SUFFIXES.DEQI;
}

/** All suffix strings, useful for line-break / hanging-suffix detection. */
export const ALL_SUFFIXES: string[] = Object.values(SUFFIXES);
