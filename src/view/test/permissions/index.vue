<template>
  <page-layout>
    <a-card>
      <div style="min-height:300px">
        <Authority type="add">
          权限 add
        </Authority>
        <p></p>
        <Authority type="edt">
          权限 edt
        </Authority>
        <p></p>
        <Authority type="del">
          权限 del
        </Authority>
        <p></p>
        <Authority type="dow">
          权限 dow
        </Authority>
        <p></p>
        <div>操作权限</div>
        <a-tree
          defaultExpandParent
          checkable
          :tree-data="routesData2"
          :replaceFields="{
            children: 'children',
            title: 'label',
            key: 'name'
          }"
        />
      </div>
    </a-card>
  </page-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { asyncRoutes } from "@/router";
import _ from "lodash";
export default {
  components: {},
  data() {
    return { routesData2: [], asyncVueRoutes: _.cloneDeep(asyncRoutes) };
  },
  created() {
    this.init2();
  },
  methods: {
    init2() {
      const filterArr2 = [
        // "zw2020081901", //首页
        // "zw2020081902",  //个人中心
        "zw2020081907",
        "zw2020081911",
        "zw2020081903" // 用户配置
      ];
      this.routesData2 = _.cloneDeep(
        this.asyncVueRoutes.filter(item => {
          return !filterArr2.includes(item.name);
        })
      );
      this.routesData2 = this.filterRoutes(this.routesData2);
    },
    filterRoutes(allRoutes) {
      const finallyRoutes = [];
      allRoutes.forEach(route => {
        const item = { ...route };
        //过滤首页
        const fArr = ["zw2020081901", "zw2020081902"];
        if (item.meta) {
          item.label = item.meta.title;
        }
        //有子路由 and 子路由有permission
        if (item.children && this.checkRoutes(item.children)) {
          item.children = this.filterRoutes(item.children);
          finallyRoutes.push(item);
        } else if (item.permission && item.permission.length) {
          let children = [];
          if (!fArr.includes(item.name)) {
            item.permission.forEach(perItem => {
              children.push({
                name: item.name + perItem.name,
                label: perItem.value + `(${item.name + perItem.name})`
              });
            });
            item.children = children;
          }
          finallyRoutes.push(item);
        }
      });
      return finallyRoutes;
    },
    // 验证 路由有没有 permission字段，有则需要加权限
    checkRoutes(routes = []) {
      let flag = false;
      routes.forEach(item => {
        if (item.children) {
          const result01 = this.checkRoutes(item.children);
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
    }
  }
};
</script>
