import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login/Index.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        // {
        //     path: "/cms",
        //     children: rawRouter.toVueRoute().children,
        //     redirect: rawRouter.viewPrize.viewRegister.viewIndex.name,
        //     meta: {
        //         menuMode: "oper"
        //     }
        // }
      ],
    },
  ],
});

export default router;
