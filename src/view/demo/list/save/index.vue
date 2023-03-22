<template>
  <a-drawer
    title="上传"
    placement="right"
    width="720"
    v-if="visible"
    :closable="false"
    v-model:visible="visible"
    :maskClosable="1"
  >
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-form-item label="上传" name="nickName">
        <Upload @updateFList="onSubmit" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 3 }">
        <a-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          @click="onSubmit"
        >
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('form')">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script>
import { addUser, getAllRoles, editUser } from "@/api/modules/user";
import { message } from "ant-design-vue";
import { split } from "@/utils/index";
import Upload from "./upload";
export default {
  components: { Upload },
  emits: ["fetchList"],
  data() {
    return {
      isEdit: false,
      labelCol: { xs: 4, sm: 4, md: 3, lg: 4, xl: 4, xxl: 3 },
      wrapperCol: { xs: 20, sm: 21, md: 21, lg: 21, xl: 20, xxl: 17 },
      form: {
        uid: "",
        nickName: "",
        password: "",
        username: "",
        roleIds: []
      },
      visible: false,
      roleList: [],
      loading: false
    };
  },
  methods: {
    show(row) {
      this.form = this.$options.data().form;
      this.visible = true;
      if (row) {
        this.isEdit = true;
        for (const key in this.form) {
          for (const key2 in row) {
            if (key2 && key == key2) {
              this.form[key] = row[key2];
              break;
            }
          }
        }
        this.form.roleIds = split(row.roleIds);
      }
    },
    async onSubmit() {
      this.$emit("fetchList");
      this.visible = false;
    },
    resetForm(form = "form") {
      this[form] = this.$options.data()[form];
    }
  }
};
</script>
