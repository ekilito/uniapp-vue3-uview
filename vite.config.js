import uni from "@dcloudio/vite-plugin-uni";

import { defineConfig } from "vite";

export default defineConfig({
    plugins: [uni()],
    server: {
        base: "./", //生产环境路径
        proxy: {
            // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            // 正则表达式写法
            "^/pathApi": {
                //target: "http://192.168.1.240:38802", // 后端服务实际地址
                target: "http://192.168.1.104:9500/",
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/pathApi/, ""),
            },
        },
    },
});