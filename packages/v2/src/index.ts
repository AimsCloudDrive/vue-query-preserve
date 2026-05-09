/**
 * Vue 2 版本插件 - 路由查询参数保留插件
 * 适配 Vue 2.x + vue-router@3
 */

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

const init = (router: any, options: QueryPreserveOptions = {}) => {
  const { preserveKeys = [], beforeNavigate } = options;
  router.beforeEach((to: any, from: any, next: any) => {
    // 如果配置了 beforeNavigate 钩子，执行它
    if (beforeNavigate) {
      const result = beforeNavigate(to, from);
      if (result === false) {
        return next(false);
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
        return next({
          ...to,
          query: {
            ...preserved,
            ...to.query,
          },
        });
      }
    }

    next();
  });
};

/**
 * Vue 2 版本的路由查询参数保留插件
 * @param options 插件配置选项
 */
function createQueryPreservePlugin(options: QueryPreserveOptions = {}) {
  return {
    install(Vue: any) {
      const _ = () => {
        try {
          // 等待路由实例初始化完成
          const router = Vue.prototype.$router;
          if (router) {
            init(router, options);
            return;
          }
        } catch {}
        requestAnimationFrame(_);
      };
      _();
    },
    init,
  };
}

export default createQueryPreservePlugin;
