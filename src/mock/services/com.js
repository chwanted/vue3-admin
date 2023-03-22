import {
  generatorResponse,
  generatorToken,
  getRequestBody,
  getRolePermission
} from "@/mock/tool";
import Mock from "mockjs2";

const login = request => {
  return generatorResponse();
};


Mock.mock(/\/api\/login/, "post", login);
