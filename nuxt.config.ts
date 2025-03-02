// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/test-utils/module", "@pinia/nuxt"],
  ssr: true,
  nitro: {
    preset: "static",
    serveStatic: true,
  },
  experimental: {
    payloadExtraction: false,
  },
  routeRules: {
    "/**": { ssr: true },
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
});
