import { defineConfig } from "vite";

/**
 * Vite 库模式配置文件
 * 用于打包 Vue 2 和 Vue 3 两个版本的插件
 */
export default defineConfig({
  build: {
    outDir: "./dist",
    lib: {
      entry: ["./src/index.ts"],
      name: "index.js",
      formats: ["es"],
      fileName: (format, entryName) => {
        return "index.js";
      },
    },
    // 压缩配置
    minify: false,
    // 是否生成 sourcemap
    sourcemap: true,
  },
});
