import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * Vite 库模式配置文件
 * 用于打包 Vue 2 和 Vue 3 两个版本的插件
 */
export default defineConfig({
  plugins: [
    dts({
      // 指定你的 tsconfig 文件（可选），默认使用项目根目录下的 tsconfig.json
      tsconfigPath: "./tsconfig.json",
      outDirs: ["./dist/types"],
      entryRoot: "./src",
      // 跳过类型检查（仅生成声明，不做类型校验），可加速
      // skipDiagnostics: false, // 默认 false，意思是会做诊断
    }),
  ],
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
