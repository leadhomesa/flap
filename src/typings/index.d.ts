/* eslint-disable no-unused-vars */

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.json" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PUBLIC_URL: string;
    readonly VERSION: string;
    readonly PORT: number;
  }
}
