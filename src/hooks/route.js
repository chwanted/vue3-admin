import { useRoute } from "vue-router";

export default function gteRouteName() {
  return useRoute().name;
}
