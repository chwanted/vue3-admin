/**
 * author: zhouwei
 * Desc:
 * version: 1.0.0
 */
import http from "@/utils/request";

export const post = (url, data) => {
  return http.request({
    url,
    data: data,
    method: "post"
  });
};
export const put = (url, data) => {
  return http.request({
    url,
    data: data,
    method: "put"
  });
};
export const del = (url, data) => {
  return http.request({
    url,
    data: data,
    method: "delete"
  });
};

export const get = (url, params) => {
  return http.request({
    url,
    params,
    method: "get"
  });
};
