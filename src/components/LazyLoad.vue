<template>
  <div class="lazy-load">
    <slot v-if="show"></slot>
    <!-- 插槽 prop -->
    <slot name="tip" v-else>
      <div
        :class="[maskClass ? maskClass : 'lazy-load-mask']"
        v-html="tip"
      ></div>
    </slot>
  </div>
</template>

<script type="text/babel">
import { ref, watch, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "LazyLoad",
  props: {
    list: Array, // 需要在组件内渲染的数据
    maskClass: String, // 遮罩层样式
    tip: {
      type: String,
      default() {
        return "正在渲染,请稍候";
      },
    },
    duration: {
      // 延迟渲染的时间
      type: Number,
      default() {
        return 10;
      },
    },
    limit: {
      // 超过多少条数据开启延迟渲染
      type: Number,
      default() {
        return 30;
      },
    },
    traceable: Boolean, // 是否跟踪data的变化来渲染列表
    immediately: Boolean, // 是否立即重新渲染
  },
  emits: ["loaded"],
  setup(props, context) {
    const { list, duration, limit, traceable, immediately } = toRefs(props);
    const show = ref(true); //是否加载组件
    const route = useRoute();

    /**
     * 延迟渲染
     */
    const load = () => {
      show.value = false;
      setTimeout(() => {
        show.value = true;
        context.emit("loaded");
      }, duration.value);
    };

    /**
     * 延迟渲染数据,在数据渲染完成后触发loaded事件
     */
    const reload = () => {
      if ((list.value && list.value.length > limit.value) || !list.value) {
        // 如果数据存在并且数据的数量比限定的数量大,则开启延迟渲染 如果不是列表调用组件,也开启延迟渲染
        load();
      } else {
        // 其他情况,不开启延迟渲染
        show.value = true;
        context.emit("loaded");
      }
    };

    // 数据变化时重新渲染
    watch(list, () => {
      if (traceable.value) {
        reload();
      }
    });

    // 路由变化,重新渲染
    watch(route, () => {
      if (traceable.value) {
        reload();
      }
    });
    // 立即重新变为true时,重新渲染
    watch(immediately, () => {
      if (immediately.value) {
        reload();
      }
    });

    load(); //加载

    return {
      show,
    };
  },
};
</script>

<style scoped>
.lazy-load {
  position: relative;
  width: 100%;
  /* 最小高度，用于显示tip提示，避免覆盖DOM流下方元素 */
  min-height: 24px;
}
.lazy-load-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 24px;
  height: 24px;
  background-color: #abdcff;
}
</style>
