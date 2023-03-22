import Layout from "@/layouts/index.vue";
import EmptyLayout from "@/layouts/EmptyLayout";
export default [
  {
    path: "/",
    redirect: "/home/index",
    hidden: true
  },
  {
    path: "/login",
    component: () => import("@/view/user/login.vue"),
    hidden: true
  },
  //首页
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      icon: "HomeOutlined",
      alwaysShow: false
    },
    component: Layout,
    alwaysShow: false,
    children: [
      {
        path: "index",
        name: "Analysis",
        meta: {
          title: "分析页",
          icon: "DashboardOutlined",
          fixed: true
        },
        component: () => import("@/view/home/index.vue")
      }
    ]
  },
  {
    hidden: false,
    path: "/DataReport",
    name: "DataReport",
    meta: {
      title: "数据报表",
      icon: "UserOutlined"
    },
    component: Layout,
    children: [
      {
        path: "MaterialPay",
        name: "MaterialPay",
        meta: {
          title: "物资/开销支出明细表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/DataReport/MaterialPay/index.vue")
      },
      {
        path: "PointWorkPay",
        name: "PointWorkPay",
        meta: {
          title: "点工支出明细表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/DataReport/PointWorkPay/index.vue")
      },
      {
        path: "SurprisePay",
        name: "SurprisePay",
        meta: {
          title: "突击支出明细表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/DataReport/SurprisePay/index.vue")
      }
    ]
  },
  {
    hidden: false,
    path: "/MoneyManage",
    name: "MoneyManage",
    meta: {
      title: "资金管理",
      icon: "UserOutlined"
    },
    component: Layout,
    children: [
      {
        path: "YrsEntry",
        name: "YrsEntry",
        meta: {
          title: "袁仁山入帐明细表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/MoneyManage/YrsEntry/index.vue")
      },
      {
        path: "YrsOuting",
        name: "YrsOuting",
        meta: {
          title: "袁仁山出帐明细表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/MoneyManage/YrsOuting/index.vue")
      },
      {
        path: "FinancialEntry",
        name: "FinancialEntry",
        meta: {
          title: "财务入账明细",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/MoneyManage/FinancialEntry/index.vue")
      },
      {
        path: "FinancialOuting",
        name: "FinancialOuting",
        meta: {
          title: "财务出账明细",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/MoneyManage/FinancialOuting/index.vue")
      }
    ]
  },
  {
    hidden: false,
    path: "/TeamManage",
    name: "TeamManage",
    meta: {
      title: "资金管理",
      icon: "UserOutlined"
    },
    component: Layout,
    children: [
      {
        path: "SiteArea",
        name: "SiteArea",
        meta: {
          title: "工地面积统计表",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/TeamManage/SiteArea/index.vue")
      }
    ]
  },
  {
    hidden: false,
    path: "/users",
    name: "users",
    meta: {
      title: "用户管理",
      icon: "UserOutlined"
    },
    component: Layout,
    children: [
      {
        path: "role",
        name: "role",
        meta: {
          title: "角色管理",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/users/role/index.vue")
      },
      {
        path: "user",
        name: "user",
        meta: {
          title: "用户管理",
          icon: "DashboardOutlined"
        },
        component: () => import("@/view/users/user/index.vue")
      }
    ]
  },
  {
    hidden: true,
    path: "/error",
    name: "error",
    meta: {
      title: "错误页面",
      icon: "StopOutlined"
    },
    component: Layout,
    redirect: "/error/404",
    children: [
      {
        path: "500",
        name: "error-500",
        meta: {
          title: "500",
          icon: "DatabaseOutlined"
        },
        component: () => import("@/view/error/500.vue")
      },
      {
        path: "403",
        name: "error-403",
        meta: {
          title: "403",
          icon: "DatabaseOutlined"
        },
        component: () => import("@/view/error/403.vue")
      },
      {
        path: "404",
        name: "error-404",
        meta: {
          title: "404",
          icon: "DatabaseOutlined"
        },
        component: () => import("@/view/error/404.vue")
      }
    ]
  }
];
