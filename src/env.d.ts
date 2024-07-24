/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MAILGUN_KEY: string;
  readonly MAILGUN_ENDPOINT: string;
  readonly PUBLIC_EMAIL: string;
  readonly PUBLIC_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
