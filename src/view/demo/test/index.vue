<template>
  <page-layout>
    <a-card>
      <div class="pt50">
        <a-row type="flex" justify="center">
          <a-col :span="16">
            {{ form }}
            <a-form
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              ref="ruleForm"
              :model="form"
              :rules="rules"
            >
              <a-form-item label="图片" name="pic">
                {{ val }}
                <Pic v-model:value="form.pic" />
              </a-form-item>

              <a-form-item label="图片s" name="pics">
                <Pics v-model:value="form.pics" />
              </a-form-item>

              <a-form-item label="昵称" name="nickName">
                <a-input v-model:value="form.nickName" />
              </a-form-item>

              <a-form-item label="账号" name="username">
                <a-input v-model:value="form.username" />
              </a-form-item>

              <a-form-item label="numbenr" name="numbenr">
                <a-input
                  oninput="
                  value = value
                    .replace(/^\./g, '')
                    .replace(/[^0-9.]/g, '')
                    .replace(/(?<=\d\.\d+)\./g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace(/(?<=^0)0/g, '')
                "
                  v-model:value="form.numbenr"
                />
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input v-model:value="form.password" />
              </a-form-item>

              <a-form-item label="checkbox" name="checkbox">
                <a-checkbox-group v-model:value="form.checkbox">
                  <a-checkbox value="A">A</a-checkbox>
                  <a-checkbox value="B">B</a-checkbox>
                  <a-checkbox value="C">C</a-checkbox>
                </a-checkbox-group>
              </a-form-item>

              <a-form-item label="富文本" name="content">
                <Tinymce :mini="true" v-model:value="form.content" />
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
          </a-col>
        </a-row>
      </div>
    </a-card>
  </page-layout>
</template>
<script>
import { message } from "ant-design-vue";
import Tinymce from "@/component/tinymce";
import Pic from "@/component/pic";
import Pics from "@/component/pics";
import { decryptedData, encryptedData } from "@/utils/encrypt";

export default {
  components: { Tinymce, Pic, Pics },
  emits: ["fetchList"],
  data() {
    return {
      isEdit: false,
      labelCol: { xs: 4, sm: 4, md: 3, lg: 4, xl: 4, xxl: 3 },
      wrapperCol: { xs: 20, sm: 21, md: 21, lg: 21, xl: 20, xxl: 17 },
      form: {
        uid: "",
        pic:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        pics: [
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        ],
        nickName: "x",
        password: "",
        numbenr: "",
        content: "",
        checkbox: ["A", "C"],
        username: ""
      },
      visible: false,
      roleList: [],
      loading: false,
      val: "xx"
    };
  },
  mounted() {
    this.val = decryptedData(encryptedData("" + new Date().getTime()));
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      let data = { status: 100 };
      await setTimeout(() => {
        data = {
          status: 200
        };
        this.loading = false;
      }, 1000);
      const { status } = data;

      if (status == 200) {
        this.visible = false;
        message.success("操作成功");
        this.$emit("fetchList");
      }
    },
    resetForm(form = "form") {
      this[form] = this.$options.data()[form];
    }
  }
};
</script>
