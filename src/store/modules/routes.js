/**
 * @author zhouwei
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式
 */
import { asyncRoutes } from "@/router";
import { filterRoutesByIds } from "@/utils/handleRoutes";
import store from "@/store";
import _ from "lodash";

const actions = {
  async setRoutesByIds({ commit }, param = { permissions: [], routeIds: [] }) {
    let accessedRoutes = [];
    //克隆新数组，避免污染原来的
    const finallyArr = _.cloneDeep(asyncRoutes);
    //路由权限 对 admin开放全部 ####
    if (param.permissions.includes("admin")) {
      accessedRoutes = finallyArr;
    } else {
      //-------------普通用户，过滤路由----------------------
      //-------------路由权限重要点 , 过滤路由 -----------------
      accessedRoutes = await filterRoutesByIds(finallyArr, param.routeIds);
    }
    store.dispatch("user/setUserRoutes", accessedRoutes);
    return accessedRoutes;
  }
};
export default { namespaced: true, actions };
