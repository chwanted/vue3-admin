/**
 * 框架核心依赖，不建议修改
 */
import Antd from "ant-design-vue/es";
import Router from "@/router";
import Store from "@/store";
export default function setupSupportApp(app) {
  app.use(Antd);
  app.use(Router);
  app.use(Store);
}
