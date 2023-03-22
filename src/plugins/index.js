import components from "@/components";
import setupSupportApp from "@/plugins/support.js";
import "ant-design-vue/dist/antd.less"
import "@/assets/css/index.less"
import "./permissions";
export default function setupApp(app) {
  setupSupportApp(app);
  app.use(components);
}
