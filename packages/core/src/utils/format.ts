/** Format remaining milliseconds as `HH:MM:SS`. */
export function formatCountdown(remainingMs: number): string {
  const totalSec = Math.ceil(remainingMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

/** Fixed-point formatting; returns the number unchanged when precision is omitted. */
export function formatFixed(value: number, precision?: number): string | number {
  if (precision != null) return value.toFixed(precision);
  return value;
}
