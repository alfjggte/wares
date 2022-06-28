<template>
  <div class="sandbox">
    <el-container style="height: 100%">
      <el-aside width="auto"><Aside /></el-aside>
      <el-container>
        <el-header><Topheader /></el-header>
        <el-main>
          <Ctag />
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Ctag from "@/components/Ctag";
import Aside from "@/components/Aside";
import Topheader from "@/components/Topheader";
export default {
  name: "Main",
  components: {
    Aside,
    Topheader,
    Ctag,
  },
  computed: {
    tags() {
      return this.$store.state.tab.tabList;
    },
  },
};
</script>
<style scoped>
.sandbox {
  height: 100vh;
}
.el-header {
  height: 100%;
  background-color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
