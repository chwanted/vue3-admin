<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="files"
    :multiple="true"
    action="/reqApi/upload"
    @change="handleChange"
    :before-upload="beforeUpload"
    :headers="headers"
    accept="video/*"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">
      点击上传或拖拽文件到这里
    </p>
    <p class="ant-upload-hint">
      支持拖拽 点击上传
    </p>
  </a-upload-dragger>
</template>
<script>
import { isProxy } from "vue";
import { message } from "ant-design-vue";
import store from "@/store";
import { useRouter } from "vue-router";
export default {
  data() {
    return {};
  },
  computed: {
    headers: {
      cache: false,
      get: () => {
        return { "clisoft-token": store.getters["user/accessToken"] };
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const fileTypes = [];
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isMax = file.size / 1024 / 1024 < 10;
      if (!isMax) {
        message.error("超过10M");
      }
      return isMax;
    },
    async handleChange({ fileList = [], file, event }) {
      if (isProxy(fileList)) {
        const { status = "" } = file;
        if (status == "done") {
          // this.$emit("updateFList");
          const rstatus = fileList[0].response.status;
          if (rstatus == 401) {
            await store.dispatch("user/resetAll");
            const router = useRouter();
            router.push("/login");
          }
          if (rstatus == 200) {
            this.$emit("updateFList");
          }
        }
      }
    }
  }
};
</script>
