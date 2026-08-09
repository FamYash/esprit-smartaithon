// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Provide a valid object for tanstackStart.server to satisfy the plugin Zod schema.
// An empty object will prevent the earlier ZodError (`expected object, received boolean`)
// while keeping the TanStack Start defaults for development. The project is already
// configured for static SPA deployment on Vercel via frontend/vercel.json.
export default defineConfig({
  tanstackStart: {
    server: {},
  },
});
