/**
 * author: zhouwei
 * version: 1.0.0
 */
import http from "@/utils/request";

const Api = {
  login: "/login",
  logout: "/logout",
  addRole: "/sys/role/addRole",
  getUserMenusArray: "/getUserMenusArray",
  getUserMenusTree: "/getUserMenusTree"
};

export const login = data => {
  return http.request({
    url: Api.login,
    data: data,
    method: "post"
  });
};

export const logout = data => {
  return http.request({
    url: Api.logout,
    data: data,
    method: "post"
  });
};

export const addRole = data => {
  return http.request({
    url: "/sys/role/addRole",
    data: data,
    method: "post"
  });
};
export const addUser = data => {
  return http.request({
    url: "/sys/user/add",
    data: data,
    method: "post"
  });
};
export const editUser = data => {
  return http.request({
    url: "/sys/user/update",
    data: data,
    method: "post"
  });
};
export const deleteUser = uid => {
  return http.request({
    url: `sys/user/delete/${uid}`,
    method: "delete"
  });
};
export const editRole = data => {
  return http.request({
    url: "/sys/role/editRole",
    data: data,
    method: "post"
  });
};
export const deleteRole = uid => {
  return http.request({
    url: `sys/role/delete/${uid}`,
    method: "delete"
  });
};

export const getRoles = data => {
  return http.request({
    url: "/sys/role/getRoles",
    params: data,
    method: "post"
  });
};

export const getAllRoles = data => {
  return http.request({
    url: "/sys/role/listAll",
    params: data,
    method: "get"
  });
};

export const getUsers = data => {
  return http.request({
    url: "/sys/user/getUsers",
    params: data,
    method: "post"
  });
};

export const getUserInfo = () => {
  return http.request({
    url: "getUserInfo",
    method: "post"
  });
};

export const getUserMenusTree = data => {
  return http.request({
    url: Api.getUserMenusTree,
    data: data,
    method: "post"
  });
};
