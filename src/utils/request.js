/**
 *
 * author: 周伟
 * Email: 1045907858@qq.com
 * version: 1.0.
 */
import axios from "axios";
import { useStore } from "vuex";
import { notification, message as Msg } from "ant-design-vue";
import store from "@/store";
import { encryptedData } from "@/utils/encrypt";
import { baseUrl } from "@/config/index";
class Http {
  constructor(config) {
    this.config = config || {
      timeout: 6000,
      withCredentials: true,
      baseURL: baseUrl,
      //application/x-www-form-urlencoded;charset=UTF-8
      //配后端数据的接收方式application/json;charset=UTF-8
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
      // transformRequest: [
      //   function(data) {
      //     //下面使用表单格式
      //     // data = require("qs").stringify(data);
      //     return data;
      //   }
      // ]
    };
  }

  interceptors(instance) {
    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(
      config => {
        config.headers["sign"] = encryptedData(new Date().getTime());
        //设置请求头
        if (store.getters["user/accessToken"]) {
          config.headers["clisoft-token"] = store.getters["user/accessToken"];
        }
        // 请求时缓存该请求，路由跳转时取消, 如果timeout值过大，可能在上一个次请求还没完成时，切换了页面。
        config.cancelToken = new axios.CancelToken(async cancel => {
          await store.dispatch("app/execCancelToken", { cancelToken: cancel });
        });

        //get请求处理 数组 分割为 字符串
        // if (config.params) {
        //   config.params = this.formatParams(config.params);
        // }

        //post,put,delete请求处理 数组 分割为 字符串
        // if (config.data) {
        //   config.data = this.formatParams(config.data);
        // }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      response => {
        //有新的token刷新本地的token
        const newToken = response.headers["refresh-token"];
        if (newToken) {
          store.dispatch("user/setToken", newToken);
        }
        if (response.data) {
          const { message = "", status = 0 } = response.data;
          if (status == 100 && message) {
            Msg.error(message);
          } else if (status == 401) {
            //401
            store.dispatch("user/resetAll");
          }
        }
        return response.data;
      },
      error => {
        if (error.response) {
          const data = error.response.data;
          if (error.response.status === 403) {
            notification.error({
              message: "无权限访问",
              description: data.message
            });
          }
          if (error.response.status == 401) {
            store.dispatch("user/resetAll").then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          }
        } else {
          let { message } = error;
          if (message === "Network Error") {
            message = "连接异常";
          }
          if (message.includes("timeout")) {
            message = "请求超时";
          }
          if (message.includes("Request failed with status code")) {
            const code = message.substr(message.length - 3);
            message = "接口" + code + "异常";
          }
          Msg.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  /***
   * 此方法可以对数组数据类型处理成字符串逗号分隔
   * 其他数据类型不变
   * 使用请看51行
   */
  formatParams(params) {
    let obj = { ...params };
    for (const i in obj) {
      //对数组 处理成 字符串分割
      if (obj[i] && Array.isArray(obj[i])) {
        let ret = "";
        if (obj[i].length) {
          ret = obj[i].join();
        }
        obj[i] = ret;
      }
    }
    return obj;
  }

  request(options) {
    const instance = axios.create();
    const requestOptions = Object.assign({}, this.config, options);
    this.interceptors(instance);
    return instance(requestOptions);
  }
}
export default new Http();
