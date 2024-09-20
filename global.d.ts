// global.d.ts
export {};

declare global {
  interface Window {
    PickupsSDK: {
      onClick: () => void;
      setDefaults: (json: string) => void;
    };
  }
}