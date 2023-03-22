export function routesHasName(Route, routeIds) {
  let result = false;
  Route.forEach(route => {
    const hasName = routeIds.includes(route.name);
    if (hasName) {
      result = true;
    } else if (route.children) {
      result = routesHasName(route.children, routeIds);
    }
  });
  return result;
}
//######################################################
/**
 * @copyright zhouwei
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermissionBySys(route, routeIds = []) {
  //跳过公共页面首页个人中心
  const exclude = ["A001", "A002", "/", "A003"];
  if (exclude.includes(route.name) || routeIds.includes(route.name)) {
    return true;
  } else if (route.children) {
    return routesHasName(route.children, routeIds);
  } else {
    return false;
  }
}
/*
 * @author zhouwei
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @copyright  zhouwei
 * @description 数组拦截路由
 * @param allRoutes 全部数组
 * @param routeIds 路由ids
 * @returns {[]}
 */
export function filterRoutesByIds(allRoutes, routeIds, baseUrl = "/") {
  const finallyRoutes = [];
  allRoutes.forEach(route => {
    const item = { ...route };
    if (hasPermissionBySys(route, routeIds)) {
      if (item.children) {
        item.children = filterRoutesByIds(
          item.children,
          routeIds,
          item.fullPath
        );
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
