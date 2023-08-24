import { createSSRApp } from "vue";
import App from "./App.vue";
import useStore from "@/stores/index.js";
export function createApp() {
  const app = createSSRApp(App);
  app.use(useStore());
  return {
    app,
  };
}
