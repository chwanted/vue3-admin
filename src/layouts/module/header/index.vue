<template>
  <!-- 框架顶部菜单区域 -->
  <div id="header" :class="[isMobile && 'mobile_header']">
    <template v-if="layout !== 'layout-head'">
      <!-- 左侧菜单功能项 -->
      <div class="prev-menu">
        <!-- 左侧缩进功能键 -->
        <div class="menu-item" @click="trigger()">
          <AlignLeftOutlined v-if="collapsed" />
          <!-- 左侧缩进功能键盘 -->
          <AlignRightOutlined v-else />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="head-logo">
        <Logo></Logo>
      </div>
      <div class="head-menu">
        <Menu></Menu>
      </div>
    </template>

    <!-- 实现综合布局方式 -->
    <div v-if="layout == 'layout-comp'" class="comp-menu">
      <template :key="index" v-for="(route, index) in routes">
        <router-link
          :to="toPath(route)"
          class="menu-item"
          :class="[active === route.path ? 'is-active' : '']"
        >
          <span>{{ route.meta.title }}</span>
        </router-link>
      </template>
    </div>

    <!-- 右侧菜单功能项 基本公用 -->
    <div class="next-menu">
      <div class="menu-item" v-if="!fullscreen" @click="full(1)">
        <ExpandOutlined style="color:#555" />
      </div>
      <div class="menu-item" v-else @click="full(2)">
        <CompressOutlined />
      </div>
      <div class="menu-item" @click="refresh">
        <SyncOutlined :class="pulse && 'rotate360'" style="color:#777" />
      </div>
      <a-dropdown class="notice-item">
        <BellOutlined style="color:#666" />
        <template #overlay>
          <a-menu class="notice-dropdown">
            <a-tabs>
              <a-tab-pane key="1" tab="通知">
                <a-empty description="暂无通知" />
              </a-tab-pane>
              <a-tab-pane key="2" tab="公告">
                <a-empty description="暂无公告" />
              </a-tab-pane>
              <a-tab-pane key="3" tab="私信">
                <a-empty description="暂无私信" />
              </a-tab-pane>
              <a-tab-pane key="4" tab="任务">
                <a-empty description="暂无任务" />
              </a-tab-pane>
            </a-tabs>
          </a-menu>
        </template>
      </a-dropdown>

      <a-dropdown class="avatar-item">
        <a-avatar
          src="https://portrait.gitee.com/uploads/avatars/user/2481/7443633_may_zhouwei_1611898764.png!avatar60"
        ></a-avatar>
        <template #overlay>
          <a-menu class="avatar-dropdown">
            <!-- <a-menu-divider /> -->
            <a-menu-item key="3">
              <a-menu-item @click="logOut"> 注销登录 </a-menu-item>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { computed, watch, ref, unref } from "vue";
import { useStore } from "vuex";
import Menu from "../menu/index.vue";
import Logo from "../logo/index.vue";
import { useRoute } from "vue-router";
import _path from "path";
import {
  AlignLeftOutlined,
  AlignRightOutlined,
  ExpandOutlined,
  CompressOutlined,
  // ReloadOutlined,
  BellOutlined,
  // LoadingOutlined,
  SyncOutlined
} from "@ant-design/icons-vue";
export default {
  components: {
    AlignLeftOutlined,
    AlignRightOutlined,
    ExpandOutlined,
    CompressOutlined,
    // ReloadOutlined,
    Menu,
    Logo,
    BellOutlined,
    SyncOutlined
    // LoadingOutlined
  },

  methods: {
    full: function(num) {
      num = num || 1;
      num = num * 1;
      var docElm = document.documentElement;
      switch (num) {
        case 1:
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
          }
          break;
        case 2:
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          break;
      }
      this.updateFullscreen();
    }
  },
  setup() {
    const { getters, commit, dispatch } = useStore();
    const layout = computed(() => getters.layout);
    const collapsed = computed(() => getters.collapsed);
    const fullscreen = computed(() => getters.fullscreen);
    const menuModel = computed(() => getters.menuModel);
    const theme = computed(() => getters.theme);
    const $route = useRoute();
    const active = ref($route.matched[0].path);
    const isMobile = computed(() => getters.isMobile);
    const routerActive = computed(() => getters.routerActive);
    const pulse = ref(false);

    watch(
      computed(() => $route.fullPath),
      () => {
        active.value = $route.matched[0].path;
      }
    );
    //计算点击跳转的最终路由
    const toPath = route => {
      let { redirect, children, path } = route;
      if (redirect) {
        return redirect;
      }
      while (children && children[0]) {
        path = _path.resolve(path, children[0].path);
        children = children[0].children;
      }
      return path;
    };
    // const routes = ref(useRouter().options.routes.filter((r) => !r.hidden));
    const routes = computed(() => getters.menu).value.filter(r => !r.hidden);

    const refresh = async () => {
      pulse.value = true;
      commit("layout/UPDATE_ROUTER_ACTIVE");
      setTimeout(() => {
        pulse.value = false;
        commit("layout/UPDATE_ROUTER_ACTIVE");
      }, 500);
    };

    const logOut = async e => {
      await dispatch("user/logout");
    };

    const store = useStore();
    const defaultLang = computed(() => store.state.app.language);
    const selectedKeys = ref([unref(defaultLang)]);

    return {
      isMobile,
      layout,
      collapsed,
      fullscreen,
      trigger: () => commit("layout/TOGGLE_SIDEBAR"),
      updateFullscreen: () => commit("layout/updateFullscreen"),
      menuModel,
      routerActive,
      theme,
      refresh,
      routes,
      active,
      toPath,
      logOut,
      pulse,
      selectedKeys
    };
  }
};
</script>
<style lang="less" scoped>
.mobile_header {
  padding-right: 0px !important;
}

.rotate360 {
  animation: rotate360 0.45s ease-out 0s;
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
</style>
