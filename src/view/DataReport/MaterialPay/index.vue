<template>
  <div class="MaterialPay">
    <page-layout>
      <div class="search">
        <a-form
          ref="formRef"
          :model="form"
          name="search-form"
          @finish="fetch"
          layout="inline"
        >
          <a-form-item name="areaName" label="工地">
            <a-select
              allowClear
              v-model:value="form.areaName"
              placeholder="请选择"
            >
              <a-select-option value="1">工地1</a-select-option>
              <a-select-option value="2">工地2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="date" label="时间">
            <a-range-picker
              v-model:value="form.date"
              :show-time="{ format: 'YYYY-MM-DD HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
            />
          </a-form-item>
          <a-form-item name="type" label="支出类型">
            <a-select allowClear v-model:value="form.type" placeholder="请选择">
              <a-select-option value="1">物资报销</a-select-option>
              <a-select-option value="2">生活借资</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">
              搜索
            </a-button>
            <a-button style="margin-left: 10px" @click="reset">重置</a-button>
          </a-form-item>
        </a-form>
        <div class="search-rbox">
          <a-button @click="openSaveBox" type="primary">
            添加
          </a-button>
        </div>
      </div>
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="state.data"
        :loading="state.loading"
        :pagination="{
          ...pagination,
          total: state.total
        }"
      >
        <template #action="{ record }">
          <span>
            <a @click="detail(record)">查看</a>
            <!-- <a-divider type="vertical" />
            <a-popconfirm title="是否删除这条数据" @confirm="del(record.uid)">
              <a>删除</a>
            </a-popconfirm> -->
          </span>
        </template>
      </a-table>
    </page-layout>
  </div>
</template>

<script setup>
import { message, Form } from "ant-design-vue";
import { initPaginationConfig } from "@/hooks/list";
import { reactive, ref, toRefs, computed } from "vue";
const formRef = ref();
const columns = [
  {
    dataIndex: "index",
    title: "序号"
  },
  {
    dataIndex: "createTime",
    title: "时间"
  },
  {
    dataIndex: "areaName",
    title: "工地名称"
  },
  {
    dataIndex: "test1",
    title: "事由（施工范围）"
  },
  {
    dataIndex: "test2",
    title: "支出类型"
  },
  {
    dataIndex: "test3",
    title: "相关人数总计(人)"
  },
  {
    dataIndex: "test4",
    title: "总金额(元)"
  },
  {
    dataIndex: "test5",
    title: "数据来源"
  },
  {
    dataIndex: "test6",
    title: "申请人"
  },
  {
    dataIndex: "test7",
    title: "款项接收人"
  },
  {
    title: "操作",
    width: 150,
    dataIndex: "action"
  }
];
const state = reactive({
  data: [],
  columns,
  loading: false,
  total: 0
});

const form = reactive({
  areaName: null,
  date: null,
  type: null,
  pageNo: 1,
  pageSize: 10
});

const reset = () => {
  formRef.value.resetFields();
};

const fetch = () => {};

const detail = () => {};

const pagination = computed(() => {
  return initPaginationConfig(form, fetch);
});
</script>

<style lang="less" scoped>
@import "~@/assets/css/common/list.less";
</style>
