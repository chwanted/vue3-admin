import {
  generatorResponse,
  generatorToken,
  getRequestBody,
  getRolePermission
} from "@/mock/tool";
import { baseUrl } from "@/config/index";
import Mock from "mockjs2";

const getRoles = request => {
  const data = {
    content: [
      {
        id: 1,
        name: "临时管理员",
        usName:'tempAdmin',
        createTime: "2015-02-04"
      },
      {
        id: 2,
        name: "超级管理员",
        usName:'admin',
        createTime: "2018-02-04"
      }
    ],
    total: 2
  };
  return generatorResponse(data);
};

const deleteRole = request => {
  return generatorResponse({});
};

const editRole = request => {
  return generatorResponse({});
};

const addRole = request => {
  return generatorResponse({});
};
//匹配 /sys/role/getRoles
Mock.mock(/\/api\/sys\/role\/getRoles/, "post", getRoles);
Mock.mock(/\/api\/sys\/role\/delete/, "delete", deleteRole);
Mock.mock(/\/api\/sys\/role\/editRole/, "post", editRole);
Mock.mock(/\/api\/sys\/role\/addRole/, "post", addRole);
