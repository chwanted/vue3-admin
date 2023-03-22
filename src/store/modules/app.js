import { defaultLanguage } from "@/config/index";

const state = {
  language:
    defaultLanguage == null
      ? "zh-CN"
      : localStorage.getItem("lang") == null
      ? defaultLanguage
      : localStorage.getItem("lang"),
  cancelToken: [] // 已发送的http请求的取消回调函数数组
};

const getters = {
  language: state => state.language
};

const mutations = {
  PUSH_CANCEL_TOKEN(state, payload) {
    state.cancelToken.push(payload.cancelToken);
  },
  EXEC_CANCEL_TOKEN(state) {
    state.cancelToken.forEach(executor => {
      executor("路由跳转取消上个页面的请求");
    });
    state.cancelToken = [];
  },
  SET_LANGUAGE(state, payload) {
    state.language = payload;
    localStorage.setItem("lang", payload);
  }
};

const actions = {
  execCancelToken({ commit }) {
    return new Promise(resolve => {
      commit("EXEC_CANCEL_TOKEN");
      resolve();
    });
  },
  setLanguage({ commit }, payload) {
    commit("SET_LANGUAGE", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
