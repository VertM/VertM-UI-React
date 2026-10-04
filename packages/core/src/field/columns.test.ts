import { describe, expect, it } from 'vitest';
import { computeFieldColumns } from './columns.js';

describe('computeFieldColumns', () => {
  it('keeps single-line maxColumns=1 at one rendered column', () => {
    expect(
      computeFieldColumns({ text: 'abcdefgh', rows: 1, columnDepth: 4, maxColumns: 1 })
    ).toEqual({
      needed: 2,
      effective: 1,
      min: 1,
      autoColumns: false,
      capped: false,
      wide: false,
    });
  });

  it('uses rows as min/needed/effective for multiline maxColumns=1', () => {
    expect(
      computeFieldColumns({ text: 'a\nb\nc', rows: 3, columnDepth: 4, maxColumns: 1 })
    ).toEqual({
      needed: 3,
      effective: 3,
      min: 3,
      autoColumns: false,
      capped: false,
      wide: false,
    });
  });

  it('grows within maxColumns without capping', () => {
    expect(
      computeFieldColumns({ text: 'abcdefghijkl', rows: 1, columnDepth: 4, maxColumns: 3 })
    ).toEqual({
      needed: 3,
      effective: 3,
      min: 1,
      autoColumns: true,
      capped: false,
      wide: true,
    });
  });

  it('marks capped when content exceeds maxColumns', () => {
    expect(
      computeFieldColumns({ text: 'abcdefghijklmnop', rows: 1, columnDepth: 4, maxColumns: 3 })
    ).toEqual({
      needed: 4,
      effective: 3,
      min: 1,
      autoColumns: true,
      capped: true,
      wide: true,
    });
  });

  it('handles empty text', () => {
    expect(
      computeFieldColumns({ text: '', rows: 1, columnDepth: 4, maxColumns: 1 })
    ).toEqual({
      needed: 1,
      effective: 1,
      min: 1,
      autoColumns: false,
      capped: false,
      wide: false,
    });
  });
});
