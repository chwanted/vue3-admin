/**
 * @author zhouwei
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import { getUserInfo, login, logout } from "@/api/modules/user";
import { notification } from "ant-design-vue";
import router from "@/router";

const title = "";
const tokenName = "token";
const baseImgURL = "";

const state = {
  accessToken: localStorage.getItem(tokenName) || "",
  username: "",
  avatar: "",
  tel: "",
  marketId: 0,
  permissions: [],
  routeIds: [],
  userRoutes: [],
  buttonCodes: [],
  roleNames: [] //角色
};
const getters = {
  accessToken: state => state.accessToken,
  username: state => state.username,
  tel: state => state.tel,
  avatar: state => state.avatar,
  permissions: state => state.permissions,
  routeIds: state => state.routeIds,
  buttonCodes: state => state.buttonCodes,
  roleNames: state => state.roleNames,
  marketId: state => state.marketId,
  userRoutes: state => state.userRoutes
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    localStorage.setItem(tokenName, accessToken);
  },
  setUsername(state, username) {
    state.username = username;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setRouteIds(state, routeIds) {
    state.routeIds = routeIds;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
  setButtonCodes(state, buttonCodes) {
    state.buttonCodes = buttonCodes;
  },
  setRoleNames(state, roleNames) {
    state.roleNames = roleNames;
  },
  setTel(state, tel) {
    state.tel = tel;
  },
  setMarketId(state, marketId) {
    state.marketId = marketId;
  },
  setUserRoutes(state, userRoutes) {
    state.userRoutes = userRoutes;
  }
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
  setToken({ commit }, accessToken) {
    commit("setAccessToken", accessToken);
  },
  setUsername({ commit }, username) {
    commit("setUsername", username);
  },
  setAvatar({ commit }, avatar) {
    commit("setAvatar", avatar);
  },
  setUserRoutes({ commit }, userRoutes) {
    commit("setUserRoutes", userRoutes);
  },
  async login({ commit }, param) {
    const { data } = await login(param);
    const accessToken = data.token;
    if (accessToken) {
      commit("setAccessToken", accessToken);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好";
      setTimeout(() => {
        notification.open({
          message: `欢迎登录${title}`,
          description: `${thisTime}！`
        });
      }, 2000);
    } else {
      // message.error(`登录接口异常，未正确返回${tokenName}...`);
    }
  },
  /**
   * @author zhouwei
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, state }) {
    let res = await getUserInfo(state.accessToken);
    let { data = {} } = res;
    data.permissions = data.roles || [];
    data.username = data.userName || "";
    data.buttonCodes = data.buttonCodes || [];
    if (data.imgUrl) {
      data.avatar = baseImgURL + data.imgUrl;
    }
    let {
      permissions = [],
      roleNames = [],
      buttonCodes = [],
      routeIds = [],
      username = "User",
      tel = "",
      marketId = 0,
      avatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    } = data;
    if (username) {
      commit("setPermissions", permissions);
      commit("setRoleNames", roleNames);
      commit("setUsername", username);
      commit("setAvatar", avatar);
      commit("setRouteIds", routeIds);
      commit("setButtonCodes", buttonCodes);
      commit("setTel", tel);
      commit("setMarketId", marketId);
      let result = {
        routeIds,
        permissions
      };
      return result;
    } else {
      console.error("用户信息接口异常");
      location.reload();
      return false;
    }
  },

  /**
   * @author zhouwei
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.accessToken);
    await dispatch("resetAll");
  },
  /**
   * @author zhouwei
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch, commit }) {
    await dispatch("setAccessToken", "");
    commit("setPermissions", []);
    commit("setRoleNames", []);
    commit("setUsername", "");
    commit("setAvatar", "");
    commit("setRouteIds", []);
    commit("setButtonCodes", []);
    commit("setTel", "");
    await commit("setMarketId", 0);
    localStorage.setItem(tokenName, "");
    localStorage.setItem("openKey", []);
    sessionStorage.setItem("pear_tabs", []);
    router.push('/login')
  },
  /**
   * @author zhouwei
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit("setAccessToken", accessToken);
  }
};
export default { namespaced: true, state, getters, mutations, actions };
