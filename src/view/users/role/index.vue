<template>
  <div>
    <page-layout>
      <div class="mb10">
        <a-row>
          <a-col :span="8">
            <a-button @click="openSaveBox" type="primary">
              添加
            </a-button>
          </a-col>
          <a-col :span="16">
            <div class="search-rbox">
              <a-input
                class="inp-search"
                v-model:value="form.name"
                placeholder="输入名称"
              />
              <a-button @click="fetch" type="primary">
                搜索
              </a-button>
            </div>
          </a-col>
        </a-row>
      </div>
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="{
          ...pagination,
          total: total
        }"
      >
        <template #action="{ record }">
          <span>
            <a @click="edit(record)">编辑 </a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除这条数据" @confirm="del(record.uid)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </page-layout>
    <Save ref="save" @fetchList="fetch" />
  </div>
</template>
<script>
import Save from "./save/index";
import { getRoles, deleteRole } from "@/api/modules/user";
import { message } from "ant-design-vue";
import { initPaginationConfig } from "@/hooks/list";
import { reactive, ref, toRefs, computed } from "vue";
const columns = [
  {
    dataIndex: "name",
    title: "名称"
  },
  {
    dataIndex: "createTime",
    title: "创建时间"
  },
  {
    title: "操作",
    fixed: "right",
    width: 150,
    slots: { customRender: "action" }
  }
];
export default {
  components: {
    Save
  },
  setup() {
    const state = reactive({
      data: [],
      columns,
      loading: false,
      form: {
        name: "",
        pageNo: 1,
        pageSize: 10
      },
      total: 0
    });

    const fetch = () => {
      state.loading = true;
      getRoles(state.form)
        .then(res => {
          const { content, total } = res.data;
          state.data = content;
          state.total = total;
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
        });
    };

    const save = ref(null);
    const openSaveBox = () => {
      save.value.show();
    };
    const edit = row => {
      save.value.show(row);
    };
    const del = uid => {
      deleteRole(uid).then(() => {
        fetch();
        message.success({ content: "删除成功，mock数据", key: "save" });
      });
    };

    const pagination = computed(() => {
      return initPaginationConfig(state.form, fetch);
    });

    fetch();

    return {
      ...toRefs(state),
      pagination,
      openSaveBox,
      fetch,
      edit,
      del,
      save
    };
  }
};
</script>
<style lang="less">
@import "~@/assets/css/common/list.less";
</style>
