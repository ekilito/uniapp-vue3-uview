import { createSSRApp } from "vue";
import uviewPlus from '@/uni_modules/uview-plus'
import "@/uni_modules/uview-plus/index.scss";
import App from "./App.vue";
import useStore from "@/stores/index.js";
export function createApp() {
  const app = createSSRApp(App);
  app.use(useStore());
  app.use(uviewPlus);
  return {
    app,
  };
}
