import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import setupApp from "@/plugins";

///------mock---------
import "./mock";
///------mock---------

(async () => {
  const app = createApp(App);
  setupApp(app);
  await router.isReady();
  app.mount("#app", true);
})();
