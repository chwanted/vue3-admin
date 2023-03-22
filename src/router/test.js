import Layout from "@/layouts/index.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
export default [
  {
    hidden: false,
    path: "/test",
    name: "zw2021" + "0205" + "01",
    meta: {
      title: "实验功能",
      alwaysShow: true,
      icon: "ExperimentOutlined",
      i18nTitle: "test"
    },
    component: Layout,
    children: [
      {
        name: "zw2020" + "1023" + "01",
        path: "testRouter",
        meta: { title: "三级路由", alwaysShow: true, i18nTitle: "路由嵌套" },
        component: EmptyLayout,
        children: [
          {
            path: "500",
            permission: [
              { name: "add", value: "添加" },
              { name: "add", value: "添加" },
              { name: "add", value: "添加" }
            ],
            name: "zw2020" + "1023" + "02",
            meta: {
              title: "三级路由",
              icon: "DatabaseOutlined",
              i18nTitle: "三级路由"
            },
            component: () => import("@/view/demo/router/index.vue")
          }
        ]
      },
      {
        path: "permissions",
        permission: [
          { name: "add", value: "添加" },
          { name: "edt", value: "编辑" },
          { name: "del", value: "删除" },
          { name: "dow", value: "下载" }
        ],
        name: "zw2020" + "1023" + "03",
        meta: {
          title: "实验权限",
          icon: "DatabaseOutlined",
          i18nTitle: "权限测试"
        },
        component: () => import("@/view/test/permissions/index.vue")
      }
    ]
  }
];
