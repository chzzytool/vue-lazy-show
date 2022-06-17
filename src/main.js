import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: "/",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "test" */ "./views/Test.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
