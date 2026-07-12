/**
 * Mongolian vowel harmony (gender) detection.
 *
 * Ported from suragch/mongol_code (CC0-1.0). Vowel harmony determines the
 * masculine/feminine/neuter class of a word, which drives correct suffix
 * selection and disambiguates otherwise-identical looking vowels (e.g. O/U).
 */
import { isMasculineVowel, isFeminineVowel } from './mongol-letters.js';

export type Gender = 'masculine' | 'feminine' | 'neuter';

/**
 * Determine the gender of a word by scanning its vowels from the end.
 * Matches the last-vowel-wins rule of the GB/T 25914-2023 model.
 *
 * @param word Array of Unicode code points.
 * @param beforeIndex Optional index to scan backwards from (exclusive upper bound handling matches source).
 */
export function genderOf(word: number[], beforeIndex?: number): Gender {
  const start = beforeIndex ?? word.length - 1;
  for (let i = start; i >= 0; i--) {
    if (isMasculineVowel(word[i])) return 'masculine';
    if (isFeminineVowel(word[i])) return 'feminine';
  }
  return 'neuter';
}

/** Convenience wrapper: gender of a string. */
export function genderOfString(word: string): Gender {
  return genderOf(Array.from(word, (ch) => ch.codePointAt(0)!));
}
