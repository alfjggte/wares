<!--  -->
<template>
  <div class="ctag">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      size="small"
      @click="changeMenu(tag)"
      @close="hclose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapMutations } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //   tags: [
      //     { name: "标签一", type: "" },
      //     { name: "标签二", type: "success" },
      //     { name: "标签三", type: "info" },
      //     { name: "标签四", type: "warning" },
      //     { name: "标签五", type: "danger" },
      //   ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    tags() {
      return this.$store.state.tab.tabList;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations({ close: "closeTag" }),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    hclose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      } else {
        if (index === length) {
          this.$router.push({ name: this.tags[index - 1].name });
        } else {
          this.$router.push({ name: this.tags[index].name });
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.ctag {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>
