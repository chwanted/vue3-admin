<template>
  <a-card hoverable class="card-base">
    <div :style="{ color: color }" class="card-base-icon">
      <MenuIcon></MenuIcon>
    </div>
    <div class="card-base-title">
      {{ title }}
    </div>
  </a-card>
</template>
<script>
import * as Icons from "@ant-design/icons-vue";
export default {
  name: "card-base",
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const MenuIcon = Icons[props.icon] || {};

    return {
      MenuIcon,
    };
  },
};
</script>
<style lang="less">
@import './index.less';
</style>