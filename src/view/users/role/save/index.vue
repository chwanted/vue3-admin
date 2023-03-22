<template>
  <a-drawer
    :title="(isEdit ? '编辑' : '新增') + '角色'"
    placement="right"
    width="620"
    :closable="false"
    v-model:visible="visible"
    :maskClosable="true"
  >
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-form-item label="角色名" name="name">
        <a-input placeholder="请输入角色名" v-model:value="form.name" />
      </a-form-item>

      <a-form-item label="角色名(英文)" name="usName">
        <a-input placeholder="请输入英文角色名" v-model:value="form.usName" />
      </a-form-item>

      <a-form-item label="权限" name="content">
        <a-row>
          <a-col :span="12">
            <div>菜单权限</div>
            <a-tree
              v-model:checkedKeys="form.permissionIds"
              defaultExpandParent
              checkable
              :tree-data="routesData"
              :replaceFields="{
                children: 'children',
                title: 'label',
                key: 'name'
              }"
            />
          </a-col>
          <a-col :span="12">
            <div>操作权限</div>
            <a-tree
              v-model:checkedKeys="form.authIds"
              defaultExpandParent
              checkable
              :tree-data="routesData2"
              :replaceFields="{
                children: 'children',
                title: 'label',
                key: 'name'
              }"
            />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4 }">
        <a-button
          type="primary"
          :loading="loading"
          :disabled="loading"
          @click="onSubmit"
        >
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="reSetForm"> 重置 </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script>
import _ from "lodash";
import { asyncRoutes } from "@/router";
import { addRole, editRole } from "@/api/modules/user";
import { message } from "ant-design-vue";
import { split } from "@/utils/index";
import { reactive, ref, toRefs } from "vue";

export default {
  emits: ["fetchList"],
  setup(prop, context) {
    const state = reactive({
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入"
          }
        ],
        usName: [
          {
            required: true,
            message: "请输入"
          }
        ]
      },
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      isEdit: false,
      form: {
        uid: [],
        permissionIds: [],
        authIds: [],
        name: "",
        usName: ""
      },
      visible: false,
      routesData: [],
      routesData2: [],
      asyncVueRoutes: _.cloneDeep(asyncRoutes)
    });

    const ruleForm = ref(null);

    const show = row => {
      state.visible = true;
      reSetForm();
      init();
      init2();
      if (row) {
        state.isEdit = true;
        for (const key in state.form) {
          for (const key2 in row) {
            if (key2 && key == key2) {
              state.form[key] = row[key2];
              break;
            }
          }
        }
        state.form.permissionIds = split(row.permissionIds);
        state.form.authIds = split(row.authIds);
      } else {
        state.isEdit = false;
      }
    };

    const init = row => {
      const filterArr = ["home", "users"];
      state.routesData = _.cloneDeep(
        state.asyncVueRoutes.filter(item => {
          return !filterArr.includes(item.name) && !!item.name;
        })
      );
      handeRouter(state.routesData);
    };

    const handeRouter = routers => {
      routers.forEach(item2 => {
        if (item2.meta) {
          item2.label = item2.meta.title;
        }
        if (item2.children) {
          item2 = handeRouter(item2.children);
        }
      });
    };

    const init2 = () => {
      const filterArr2 = [
        // "zw2020081901", //首页
        // "zw2020081902",  //个人中心
        "zw2020081907",
        "zw2020081911",
        "zw2020081903" // 用户配置
      ];
      state.routesData2 = _.cloneDeep(
        state.asyncVueRoutes.filter(item => {
          return !filterArr2.includes(item.name);
        })
      );
      state.routesData2 = filterRoutes(state.routesData2);
    };

    const filterRoutes = allRoutes => {
      const finallyRoutes = [];
      allRoutes.forEach(route => {
        const item = { ...route };
        //过滤首页
        const fArr = ["zw2020081901", "zw2020081902"];
        if (item.meta) {
          item.label = item.meta.title;
        }
        //有子路由 and 子路由有permission
        if (item.children && checkRoutes(item.children)) {
          item.children = filterRoutes(item.children);
          finallyRoutes.push(item);
        } else if (item.permission && item.permission.length) {
          let children = [];
          if (!fArr.includes(item.name)) {
            item.permission.forEach(perItem => {
              children.push({
                name: item.name + perItem.name,
                label: perItem.value
              });
            });
            item.children = children;
          }
          finallyRoutes.push(item);
        }
      });
      return finallyRoutes;
    };

    const checkRoutes = (routes = []) => {
      let flag = false;
      routes.forEach(item => {
        if (item.children) {
          const result01 = checkRoutes(item.children);
          if (result01) {
            flag = true;
            return flag;
          }
        } else if (item.permission) {
          flag = true;
          return flag;
        }
      });
      return flag;
    };

    const onSubmit = async () => {
      state.loading = true;
      const colseMsg = message.loading({
        content: "提交中...",
        key: "save"
      });
      let data = { status: 100 };
      try {
        if (state.isEdit) {
          data = await editRole(state.form);
        } else {
          data = await addRole(state.form);
        }
      } finally {
        state.loading = false;
        colseMsg();
      }
      const { code } = data;
      if (code == 200) {
        state.visible = false;
        message.success({ content: "操作成功", key: "save" });
        context.emit("fetchList");
      }
    };

    const reSetForm = () => {
      if (ruleForm.value != null) {
        ruleForm.value.resetFields();
      }
    };

    return {
      ...toRefs(state),
      ruleForm,
      reSetForm,
      onSubmit,
      show
    };
  }
};
</script>
