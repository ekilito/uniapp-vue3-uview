import uni from "@dcloudio/vite-plugin-uni";

import { defineConfig } from "vite";

import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
    plugins: [
        uni(),
        WindiCSS({
            scan: {
                dirs: ["."], // 当前目录下所有文件
                fileExtensions: ["vue", "js", "ts"], // 同时启用扫描vue/js/ts
            },
        }),
    ],
    server: {
        base: "./", //生产环境路径
        proxy: {
            // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            // 正则表达式写法
            "^/pathApi": {
                target: "http://192.168.1.240:38802", // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/pathApi/, ""),
            },
        },
    },
});