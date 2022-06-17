import LazyLoad from "./src/components/LazyLoad.vue";

const install = (app, options = {}) => {
  if (install.installed) return;
  app.component(LazyLoad.name, LazyLoad);
};

export default install;
