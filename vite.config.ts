import { fileURLToPath, URL } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import obfuscatorPlugin from "rollup-plugin-obfuscator";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        passes: 3,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    } as any,
    rollupOptions: {
      plugins: [
        obfuscatorPlugin({
          global: true,
          options: {
            stringArray: true,
            stringArrayEncoding: ["rc4"],
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayThreshold: 1,
            splitStrings: true,
            splitStringsChunkLength: 5,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            target: "browser",
            compact: true,
            transformObjectKeys: true,
            unicodeEscapeSequence: true,
          },
        }) as any,
      ],
    },
  },
});
