<template>
  <a-drawer
    title="用户"
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
      <a-form-item label="昵称" name="nickName">
        <a-input v-model:value="form.nickName" />
      </a-form-item>

      <a-form-item label="账号" name="title">
        <a-input v-model:value="form.title" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input v-model:value="form.password" />
      </a-form-item>

      <a-form-item label="角色" name="type">
        <a-checkbox-group v-model:value="form.roleIds">
          <a-checkbox v-for="v in roleList" :key="v.uid" :value="v.uid + ''">
            {{ v.roleName }}
          </a-checkbox>
        </a-checkbox-group>
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
export default {
  emits: ["fetchList"],
  data() {
    return {
      isEdit: false,
      labelCol: { xs: 4, sm: 4, md: 3, lg: 4, xl: 4, xxl: 3 },
      wrapperCol: { xs: 20, sm: 21, md: 21, lg: 21, xl: 20, xxl: 17 },
      form: {
        uid: "",
        nickName: "",
        password: "*****",
        title: "",
        roleIds: []
      },
      visible: false,
      roleList: [
        { roleName: "临时管理员", uid: 1 },
        { roleName: "超级管理员", uid: 2 }
      ],
      loading: false
    };
  },
  methods: {
    show(row) {
      this.form = this.$options.data().form;
      this.visible = true;
      this.getAllRoles();
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
      this.loading = true;
      let data = { status: 100 };
      try {
        if (this.isEdit) {
          data = await editUser(this.form);
        } else {
          data = await addUser(this.form);
        }
      } finally {
        this.loading = false;
      }
      const { code } = data;
      if (code == 200) {
        this.visible = false;
        message.success("操作成功");
        this.$emit("fetchList");
      }
    },
    resetForm(form = "form") {
      this[form] = this.$options.data()[form];
    },
    getAllRoles() {
      getAllRoles().then(res => {
        const { data = [], status } = res;
        if (data.length) {
          this.roleList = data;
        }
      });
    }
  }
};
</script>
