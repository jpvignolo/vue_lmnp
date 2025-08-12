// src/shims-theme.d.ts
declare module '@theme' {
  export const brandName: string;
  export const pricing: {
    simple: string;
    fec: string;
  };
  export const logo_white: string;
  export const logo_dark: string;
}

declare module '@theme/*' {
  // Tous les imports via @theme/... (images, assets) renvoient une URL string
  const value: string;
  export default value;
}