<!--  -->
<template>
  <div class="herder">
    <div class="left">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="float: left"
      ></el-button>
      <el-breadcrumb separator="/" class="mbx">
        <el-breadcrumb-item
          class="mbx-zi"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>

    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" @click.native="signOut"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
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
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    signOut() {
      console.log(1);
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$store.commit("clearTab");
      this.$router.push({ name: "login" });
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
.mbx {
  float: left;
}
.el-breadcrumb__item >>> .el-breadcrumb__inner {
  color: rgb(212, 208, 208);
}
.el-breadcrumb__item:last-child >>> .el-breadcrumb__inner {
  color: rgb(212, 208, 208);
  font-weight: 700;
}
.el-breadcrumb__item:last-child >>> .el-breadcrumb__inner:hover {
  color: #3390ff;
  font-weight: 700;
  cursor: pointer;
}

/* .mbx-zi .el-breadcrumb__inner,
.mbx-zi .is-link {
  color: #86888d !important;
} */

/* .mbx-zi .el-breadcrumb__inner {
  font-weight: 400;
  color: #eff0f1 !important;
  cursor: text;
} */

/* .el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #d9bb95 !important;
} */
.mbx-zi {
  /* color: aliceblue !important; */
  margin-top: 7px;
}
.herder {
  padding-top: 10px;
}
.left {
  float: left;
  margin-top: 5px;
  color: aliceblue;
}
.left span {
  margin-left: 10px;
}
.el-dropdown {
  float: right;
}
</style>
