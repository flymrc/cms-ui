import Home from "@/views/Home.vue";
// import ErrorVue from "@/views/Error.vue"
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { rawRouter, RootRawRoute } from "./raw/index";
import { setupRouter } from "./guards";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "/op",
          children: rawRouter.toVueRoute().children,
          redirect: rawRouter.viewPrize.viewRegister.viewIndex.name,
          meta: {
            menuMode: "oper",
          },
        },
      ],
    },
  ],
});

setupRouter(router);

/**
 * ルーターの「name」ホワイトリスト
 */
export const permissionWhiteList = new Set(["login"]);

export const isInWhiteList = (path: string) => {
  if (path[0] == "/") path = path.slice(1);
  if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
  return permissionWhiteList.has(path.toLowerCase());
};

export default router;
export { rawRouter, RootRawRoute };
export { setupRouter as setupRouterGuard };
