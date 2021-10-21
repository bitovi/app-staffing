import { defineConfig } from "vite";
import path from "path";

import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJsx from "vite-react-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  publicDir: "./public",
  plugins: [reactRefresh(), reactJsx()],
  resolve: {
    alias: {
      "@staffing": path.resolve(__dirname, "src", "shared"),
    },
  },
});
