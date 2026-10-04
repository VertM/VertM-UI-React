export interface IconDefinition {
  name: string;
  /** Whether this icon has a directional meaning (arrow, chevron, etc.). */
  directional?: boolean;
  viewBox?: string;
  paths: string | string[];
}

/** Whether a directional icon should rotate 90° in vertical writing. */
export function shouldRotateIcon(
  def: Pick<IconDefinition, 'directional'>,
  opts: { vertical: boolean; rotateForVertical: boolean }
): boolean {
  return !!def.directional && opts.rotateForVertical && opts.vertical;
}

export const chevronRightDef: IconDefinition = {
  name: 'chevron-right',
  directional: true,
  paths: 'M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.04z',
};

export const chevronLeftDef: IconDefinition = {
  name: 'chevron-left',
  directional: true,
  paths: 'M14.71 6.71a1 1 0 0 1 0 1.41L10.83 12l3.88 3.88a1 1 0 1 1-1.41 1.41l-4.59-4.59a1 1 0 0 1 0-1.41l4.59-4.59a1 1 0 0 1 1.41 0z',
};

export const chevronUpDef: IconDefinition = {
  name: 'chevron-up',
  directional: true,
  paths: 'M6.71 14.71a1 1 0 0 0 1.41 0L12 10.83l3.88 3.88a1 1 0 1 0 1.41-1.41l-4.59-4.59a1 1 0 0 0-1.41 0L6.7 13.3a1 1 0 0 0 .01 1.41z',
};

export const chevronDownDef: IconDefinition = {
  name: 'chevron-down',
  directional: true,
  paths: 'M6.71 9.29a1 1 0 0 1 1.41 0L12 13.17l3.88-3.88a1 1 0 1 1 1.41 1.41l-4.59 4.59a1 1 0 0 1-1.41 0L6.7 10.7a1 1 0 0 1 .01-1.41z',
};

export const arrowRightDef: IconDefinition = {
  name: 'arrow-right',
  directional: true,
  paths: 'M13.17 12l-4.59-4.59L10 6l6 6-6 6-1.41-1.41z',
};

export const arrowLeftDef: IconDefinition = {
  name: 'arrow-left',
  directional: true,
  paths: 'M10.83 12l4.59 4.59L14 18l-6-6 6-6 1.41 1.41z',
};

export const closeDef: IconDefinition = {
  name: 'close',
  paths: 'M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z',
};

export const checkDef: IconDefinition = {
  name: 'check',
  paths: 'M9.55 17.3a1 1 0 0 1-.71-.29L4.7 12.87a1 1 0 1 1 1.41-1.42l3.44 3.44 8.34-8.34a1 1 0 1 1 1.41 1.41l-9.05 9.05a1 1 0 0 1-.7.29z',
};

export const plusDef: IconDefinition = {
  name: 'plus',
  paths: 'M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z',
};

export const minusDef: IconDefinition = {
  name: 'minus',
  paths: 'M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z',
};

export const loadingDef: IconDefinition = {
  name: 'loading',
  paths: 'M12 2a10 10 0 1 0 10 10h-2.5A7.5 7.5 0 1 1 12 4.5V2zm0 4.5V2A10 10 0 0 0 2 12h2.5A7.5 7.5 0 0 1 12 6.5z',
};

export const searchDef: IconDefinition = {
  name: 'search',
  paths: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
};

export const infoCircleDef: IconDefinition = {
  name: 'info-circle',
  paths: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
};

export const warningCircleDef: IconDefinition = {
  name: 'warning-circle',
  paths: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
};

export const closeCircleDef: IconDefinition = {
  name: 'close-circle',
  paths: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 12.3a1 1 0 0 1-1.41 1.41L12 13.41l-2.89 2.9a1 1 0 0 1-1.41-1.42L10.59 12 7.7 9.11a1 1 0 1 1 1.41-1.41L12 10.59l2.89-2.9a1 1 0 0 1 1.41 1.41L13.41 12l2.89 2.9z',
};

export const checkCircleDef: IconDefinition = {
  name: 'check-circle',
  paths: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
};

export const expandDef: IconDefinition = {
  name: 'expand',
  directional: true,
  paths: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
};

export const collapseDef: IconDefinition = {
  name: 'collapse',
  directional: true,
  paths: 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z',
};

export const ellipsisDef: IconDefinition = {
  name: 'ellipsis',
  paths: 'M6 10a2 2 0 1 0 0.001 4.001A2 2 0 0 0 6 10zm6 0a2 2 0 1 0 0.001 4.001A2 2 0 0 0 12 10zm6 0a2 2 0 1 0 0.001 4.001A2 2 0 0 0 18 10z',
};

export const copyDef: IconDefinition = {
  name: 'copy',
  paths: [
    'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  ],
};

export const editDef: IconDefinition = {
  name: 'edit',
  directional: true,
  paths: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z',
};

export const eyeDef: IconDefinition = {
  name: 'eye',
  directional: true,
  paths: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
};

export const eyeInvisibleDef: IconDefinition = {
  name: 'eye-invisible',
  directional: true,
  paths: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
};

export const vertMIconDef: IconDefinition = {
  name: 'vertm',
  paths: 'M8 3v18h2V3H8zm6 0v18h2V3h-2z',
};
