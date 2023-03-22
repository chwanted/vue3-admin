import {
  generatorResponse,
  generatorToken,
  getRequestBody,
  getRolePermission
} from "@/mock/tool";
import Mock from "mockjs2";

const login = request => {
  const { username, password } = getRequestBody(request);
  const admin = {
    username: "admin",
    password: "123456"
  };
  // 如果是admin登陆 密码必须为admin, 否则随意
  if (
    (username === admin.username && password === admin.password) ||
    username !== admin.username
  ) {
    localStorage.setItem("user_role", username);
    const userInfo = {
      id: Math.random()
        .toString(36)
        .slice(2),
      username: username,
      password: password,
      token: generatorToken(),
      avatar:
        "https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png",
      permissions: getRolePermission(username === admin.username)
    };
    return generatorResponse(userInfo);
  } else {
    return generatorResponse(null, "账号或密码错误", 500);
  }
};

const getUserInfo = request => {
  const data = {
    imgUrl:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    marketId: 53524853788778,
    marketName: "达州市通川区朝阳农贸集市",
    roleNames: ["系统测试"],
    roles: ["admin"],
    menus: [
      // "users",
      // "role",
      // "error",
      // "error-500",
      // "error-403",
      // "error-404",
      // "zw2020110503del",
      // "zw202008210207",
      // "zw2020120801del",
      // "zw202008210206"
    ],
    routeIds: [
      // "A001",
      // "A002",
      // "users",
      // "role",
      // "error",
      // "error-500",
      // "error-403",
      // "error-404",
      // "zw2021020501",
      // "zw2020102301",
      // "zw2020102302"
    ],
    tel: null,
    userName: "banshan"
  };
  return generatorResponse(data);
};

const logout = request => {
  return generatorResponse({
    status: 0
  });
};

const getUsers = request => {
  const data = {
    content: [
      {
        id: 1,
        nickName: "管理员",
        title: "tempAdmin",
        createTime: "2015-02-04"
      },
      {
        id: 2,
        title: "admin",
        nickName: "超级管理员",
        createTime: "2018-02-04"
      }
    ],
    total: 2
  };
  return generatorResponse(data);
};

const deleteUser = request => {
  return generatorResponse({});
};

const editUser = request => {
  return generatorResponse({});
};

Mock.mock(/\/api\/getUserInfo/, "post", getUserInfo);
Mock.mock(/\/api\/login/, "post", login);
Mock.mock(/\/api\/logout/, "post", logout);
Mock.mock(/\/api\/sys\/user\/getUsers/, "post", getUsers);
Mock.mock(/\/api\/sys\/user\/delete/, "delete", deleteUser);
Mock.mock(/\/api\/sys\/user\/update/, "post", editUser);
