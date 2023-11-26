import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // eslint-disable-next-line no-undef
    "process.env.REACT_APP_URL": JSON.stringify(process.env.REACT_APP_URL),
  },
});
