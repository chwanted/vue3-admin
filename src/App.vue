<template>
  <a-config-provider :locale="antdLocal">
    <router-view></router-view>
  </a-config-provider>
</template>
<script>
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default defineComponent({
  name: "App",
  setup() {
    const antdLocal = zhCN;
    return {
      antdLocal
    };
  }
});
</script>
<style>
#app,
body,
html {
  height: 100%;
}
</style>
