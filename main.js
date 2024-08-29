import {
  createSSRApp
} from "vue";

import App from "./App.vue";
import useStore from "@/stores/index.js";


//引入uview3x版本组件
import uviewPlus from '@/uni_modules/uview-plus'
import "@/uni_modules/uview-plus/index.scss";

export function createApp() {
  const app = createSSRApp(App);
  app.use(useStore());
  app.use(uviewPlus);
  return {
    app,
  };
}