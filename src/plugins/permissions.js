/**
 * @author zhouwei
 */
import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { loginInterception } from "@/config/index";

const routesWhiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 取消未完成的http请求
  await store.dispatch("app/execCancelToken");
  let hasToken = store.getters["user/accessToken"];
  if (!loginInterception) {
    hasToken = true;
  }
  //有token
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      //有角色
      if (store.getters["user/permissions"].length) {
        const hasRoute = router
          .getRoutes()
          .map(it => it.path)
          .includes(to.fullPath);
        if (hasRoute) {
          next();
        } else {
          //没得这个路由
          next("/error/404");
        }
      } else {
        //获取角色
        try {
          let permissions = [];
          let routeIds = [];
          if (loginInterception == false) {
            await store.dispatch("user/setPermissions", ["admin"]);
            await store.dispatch("user/setUsername", "Tester");
            await store.dispatch(
              "user/setAvatar",
              "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            );
            permissions = ["admin"];
          } else {
            let res = await store.dispatch("user/getUserInfo");
            routeIds = res.routeIds;
            permissions = res.permissions;
          }
          let accessRoutes = [];
          accessRoutes = await store.dispatch("routes/setRoutesByIds", {
            permissions,
            routeIds
          });
          accessRoutes.forEach(item => {
            router.addRoute(item);
          });

          next({ ...to, replace: true });
        } catch (err) {
          await store.dispatch("user/resetAll");
          next({
            path: "/login",
            replace: true
          });
        }
      }
    }
  }
  //无token
  else {
    //免登录，或登录注册页面
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    }
    next({ path: "/login", replace: true });
  }
});
router.afterEach(to => {
  NProgress.done();
});
