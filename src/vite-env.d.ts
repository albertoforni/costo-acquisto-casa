/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
