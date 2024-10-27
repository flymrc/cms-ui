import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const SCSS_Logger = {
  warn(message: any, options: any) {
    // Mute "Mixed Declarations" warning
    if (options.deprecation && message.includes("mixed-decls")) {
      return;
    }
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or modern
        silenceDeprecations: ["mixed-decls"],
        logger: SCSS_Logger,
      },
    },
  },
});
