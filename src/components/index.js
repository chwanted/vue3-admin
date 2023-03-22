import PageHeader from "./pageHeader";
import PageLayout from "./pageLayout";
import Count from "./count";
import Query from "./queryForm";
import Authority from "./Authority";

const components = [
  PageHeader,
  PageLayout,
  Count,
  Query,
  Authority
];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

export default {
  install,
  PageHeader,
  PageLayout,
  Count,
  Query,
  Authority
};
