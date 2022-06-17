<template>
  <div>
    <lazy-load
      @loaded="handleLoaded"
      :duration="2000"
      :traceable="true"
      :immediately="immediately"
    >
      <button @click="handleLazyBtnClick">延迟加载组件</button>

      <!-- 只有默认插槽时，组件的标签才可以被当作插槽的模板来使用，否则要使用template, default可以省略 -->
      <!-- <template v-slot:default="slotProps">
      <Button
        type="primary"
        size="small"
        style="margin: 10px"
        @click="handleLazyBtnClick"
        >延迟加载组件 {{ slotProps.isShow }}</Button
      >
    </template> -->

      <!-- vue3使用具名插槽 tip slot -->
      <!-- <template v-slot:tip>... tip slot test ... </template> -->
    </lazy-load>
  </div>
</template>

<script>
import { ref } from "vue";
import LazyLoad from "../components/LazyLoad.vue";

import { useRouter, useRoute } from "vue-router";
export default {
  name: "Test",
  components: {
    LazyLoad,
  },

  setup() {
    const immediately = ref(false);
    const router = useRouter();
    const route = useRoute();

    const handleLoaded = () => {
      console.log("loaded -->");
    };
    const handleLazyBtnClick = () => {
      // immediately.value = true; //测试immediately改变
      router.push({
        name: "test",
        query: { a: "b" },
      });
      console.log("lazy load test -->");
    };

    return { immediately, handleLoaded, handleLazyBtnClick };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
