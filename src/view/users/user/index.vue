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
              <!-- <a-select
                allowClear
                v-model:value="form.select"
                class="inp-search"
                @change="handleChange"
                placeholder="单选"
              >
                <a-select-option value="jack">Jack (100)</a-select-option>
                <a-select-option value="lucy">Lucy (101)</a-select-option>
              </a-select> -->

              <!-- <a-select
                v-model:value="form.selects"
                mode="multiple"
                class="inp-search"
                placeholder="多项选择"
                option-label-prop="label"
              >
                <a-select-option value="china" label="China1">
                  <span role="img" aria-label="China">🇨🇳</span>
                  China (中国)
                </a-select-option>
                <a-select-option value="usa" label="USA">
                  <span role="img" aria-label="USA">🇺🇸</span>
                  USA (美国)
                </a-select-option>
                <a-select-option value="japan" label="Japan">
                  <span role="img" aria-label="Japan">🇯🇵</span>
                  Japan (日本)
                </a-select-option>
                <a-select-option value="korea" label="Korea">
                  <span role="img" aria-label="Korea">🇰🇷</span>
                  Korea (韩国)
                </a-select-option>
              </a-select> -->

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
import { getUsers, deleteUser } from "@/api/modules/user";
import { message } from "ant-design-vue";
import { initPaginationConfig } from "@/hooks/list";
import { reactive, ref, toRefs, computed } from "vue";
const columns = [
  {
    dataIndex: "nickName",
    title: "昵称"
  },
  {
    dataIndex: "title",
    title: "描述"
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
      getUsers(state.form)
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
      deleteUser(uid).then(() => {
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
