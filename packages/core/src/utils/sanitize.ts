/** Strip characters outside the printable ASCII range U+0020–U+007E. */
export function stripNonPrintableAscii(value: string): string {
  return value.replace(/[^\u0020-\u007E]/g, '');
}
