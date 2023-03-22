/***
 * 此文件是一个 demo文件 ！！！！
 * 注意 get穿参 params
 * 其他传参 data
 */
import http from "@/utils/request";

const Api = {
  Api1: "/postDemo",
  Api2: "/getDemo",
  Api3: "/putDemo",
  Api4: "/deleteDemo"
};

export const get = params => {
  return http.request({
    url: Api.Api2,
    params,
    method: "get"
  });
};

export const post = data => {
  return http.request({
    url: Api.Api1,
    data: data,
    method: "post"
  });
};

export const post = data => {
  return http.request({
    url: Api.Api3,
    data: data,
    method: "put"
  });
};

export const post = data => {
  return http.request({
    url: Api.Api4,
    data: data,
    method: "delete"
  });
};
