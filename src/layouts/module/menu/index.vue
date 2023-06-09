<template>
  <div id="menu">
    <a-menu
      v-model:openKeys="openKey"
      v-model:selectedKeys="selectKey"
      :mode="menuModel"
      :theme="menuTheme"
      @openChange="openChange"
    >
      <sub-menu
        v-for="route in menu"
        :key="rootPath + route.path"
        :item="route"
        :base-path="rootPath + route.path"
        :level="0"
        @click="handleFoldSideBar"
      />
    </a-menu>
  </div>
</template>
<script>
import { useStore } from "vuex";
import SubMenu from "./SubMenu.vue";
import { useRoute } from "vue-router";
import { computed, watch, ref, reactive } from "vue";

export default {
  components: {
    SubMenu
  },
  setup() {
    const { getters, commit } = useStore();
    const route = useRoute();
    const layout = computed(() => getters.layout);
    const menuModel = computed(() =>
      getters.layout == "layout-head" ? "horizontal" : "inline"
    );
    const menuTheme = computed(() =>
      getters.theme === "theme-dark" || getters.theme === "theme-night"
        ? "dark"
        : "light"
    );
    const storeOpenKey = computed(() => getters.openKey);
    const activeKey = computed(() => {
      const propRoute = route.matched[0];
      if (propRoute.children.length == 1 && propRoute.meta.alwaysShow != true) {
        return propRoute.path;
      }
      return getters.activeKey;
    });

    const openKey = ref([...storeOpenKey.value]);
    const selectKey = ref([activeKey.value]);
    const rootPath = ref("");

    const state = reactive({
      menu: computed(() => getters.menu)
    });
    // store中不允许修改，这里转一次
    const menu = ref(state.menu);

    const dynamicRoute = () => {
      let { matched } = route;
      let needOpenKeys = matched.slice(0, matched.length - 1).map(m => m.path);
      let openKeys = [...storeOpenKey.value];
      needOpenKeys.forEach(nk => !openKeys.includes(nk) && openKeys.push(nk));
      changeLayout(layout.value);
      const isComputedMobile = computed(() => getters.isMobile);
      const collapsed = computed(() => getters.collapsed);
      //pc折叠的时候不弹出当前导航栏 &&!collapsed.value
      //手机端弹出 || isComputedMobile.value
      if (
        (layout.value !== "layout-head" && !collapsed.value) ||
        isComputedMobile.value
      ) {
        commit("layout/updateOpenKey", { openKeys });
      } else {
        commit("layout/clearOpenKey");
      }
    };

    const changeLayout = model => {
      if (model === "layout-comp") {
        let topPath = route.matched[0].path;
        // menu.value = routes.find((r) => r.path === topPath).children;
        menu.value = state.menu.find(r => r.path === topPath).children;
        rootPath.value = topPath + "/";
      } else {
        // menu.value = routes;
        menu.value = state.menu;
        rootPath.value = "";
      }
    };

    const openChange = function(openKeys) {
      commit("layout/updateOpenKey", { openKeys });
    };
    const handleFoldSideBar = () => {
      const isComputedMobile = computed(() => getters.isMobile);
      if (isComputedMobile.value) {
        commit("layout/UPDATE_COLLAPSED", true);
      }
    };

    watch(layout, n => changeLayout(n));
    watch(
      computed(() => route.fullPath),
      dynamicRoute
    );
    watch(activeKey, n => (selectKey.value = [n]));
    watch(storeOpenKey, n => (openKey.value = n), { deep: true });
    dynamicRoute(route);

    return {
      handleFoldSideBar,
      selectKey,
      openKey,
      menuModel,
      menuTheme,
      openChange,
      menu,
      rootPath
    };
  }
};
</script>
