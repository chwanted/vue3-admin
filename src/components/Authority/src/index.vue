<template>
  <template v-if="hasAuthority">
    <slot />
  </template>
</template>
<script>
/**
 * @author zhouwei
 * @time 2020/9/11
 * @description 权限
 */
import { useRoute } from "vue-router";
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Authority",
  props: {
    type: {
      type: String,
      default: "",
      required: true
    }
  },
  setup(props) {
    const { getters } = useStore();

    const state = reactive({
      fullPath: computed(() => useRoute().name + props.type),
      buttonCodes: computed(() => getters["user/buttonCodes"]),
      roleNames: computed(() => getters["user/permissions"])
    });

    const hasAuthority = computed(() => {
      if (state.roleNames.includes("admin")) {
        return true;
      } else if (state.buttonCodes.includes(state.fullPath)) {
        return true;
      }
      return false;
    });
    return {
      hasAuthority
    };
  }
});
</script>
