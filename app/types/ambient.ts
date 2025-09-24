// types/ambient.d.ts

// Minimal shims so TypeScript doesn't error on these packages.
// (We keep them intentionally loose; the API surface we use is small.)
declare module "pdf-parse";
declare module "mammoth";


// app/types/ambient.ts
export {};

declare global {
  interface Window {
    __MOCK_PROFESSIONALS__?: any[];
  }
}
