import { createRouter, createWebHashHistory } from "vue-router";
import baseRoutes from "./baseRoutes";

/* ###########################
 * ####  路由配置 ############
 * ###########################
 * ###########################
 */
// import test from "./test";
// import list from "./list";
// let resultRoutes = [...baseRoutes, ...list];
/* ###########################
 * ####  路由配置 end ########
 * ###########################
 * ###########################
 */
// if (process.env.NODE_ENV === "development") {
//   resultRoutes = resultRoutes.concat(test);
// }
// export const asyncRoutes = resultRoutes;

export const asyncRoutes = baseRoutes;
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home/index",
      hidden: true
    },
    {
      path: "/login",
      component: () => import("@/view/user/login.vue"),
      hidden: true
    }
  ]
});

export default router;
