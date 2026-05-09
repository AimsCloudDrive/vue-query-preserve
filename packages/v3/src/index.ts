/**
 * Vue 3 版本插件 - 路由查询参数保留插件
 * 适配 Vue 3.x + vue-router@4
 */
import type { Plugin, App } from "vue";
import type { Router } from "vue-router";

export interface QueryPreserveOptions {
  /**
   * 需要保留的查询参数键名白名单
   */
  preserveKeys?: string[];
  /**
   * 跳转前的自定义钩子函数
   * @param to 目标路由对象
   * @param from 来源路由对象
   * @returns 返回 false 可阻止跳转
   */
  beforeNavigate?: (to: any, from: any) => boolean | void;
}

/**
 * Vue 3 版本的路由查询参数保留插件
 * @param options 插件配置选项
 */
function createQueryPreservePlugin(options: QueryPreserveOptions = {}): Plugin {
  const { preserveKeys = [], beforeNavigate } = options;

  return {
    install(app: App) {
      const router: Router = app.config.globalProperties.$router;

      if (!router) {
        console.error(
          "[vue-query-preserve] Router instance not found. Please ensure app.use(router) is called before.",
        );
        return;
      }

      router.beforeEach((to, from) => {
        // 如果配置了 beforeNavigate 钩子，执行它
        if (beforeNavigate) {
          const result = beforeNavigate(to, from);
          if (result === false) {
            return false;
          }
        }

        // 从来源路由中提取需要保留的参数
        const preserved: Record<string, string> = {};
        if (preserveKeys.length > 0 && from.query) {
          preserveKeys.forEach((key) => {
            if (from.query[key] !== undefined) {
              preserved[key] = from.query[key] as string;
            }
          });
        }

        // 如果有需要保留的参数，且目标路由没有这些参数，则合并
        if (Object.keys(preserved).length > 0) {
          const hasPreservedParams = preserveKeys.some(
            (key) => to.query[key] === undefined,
          );
          if (hasPreservedParams) {
            return {
              ...to,
              query: {
                ...preserved,
                ...to.query,
              },
            };
          }
        }
      });
    },
  };
}

export default createQueryPreservePlugin;
