import { defineConfig } from "vite";
import path from "path";

import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJsx from "vite-react-jsx";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  publicDir: "./public",
  plugins: [reactRefresh(), reactJsx(), svgr()],
  resolve: {
    alias: {
      "@staffing": path.resolve(__dirname, "src", "shared"),
    },
  },
});
