/// <reference path="../.astro/types.d.ts" />
// src/env.d.ts
interface ImportMetaEnv {
    VITE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
