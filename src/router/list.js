import Layout from "@/layouts/index.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
export default [
  {
    hidden: false,
    path: "/file",
    name: "zw2021" + "0308" + "01",
    meta: {
      title: "列表展示",
      icon: "FolderOutlined",
      i18nTitle: "列表展示",
      alwaysShow: true,
    },
    component: Layout,
    children: [
      {
        path: "list",
        name: "zw2021" + "0308" + "02",
        meta: {
          title: "列表展示",
          icon: "DashboardOutlined",
          i18nTitle: "列表展示"
        },
        component: () => import("@/view/demo/list/index.vue")
      }
    ]
  }
];
