<!--  -->
<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <h3>登录系统</h3>
      <el-form-item label="用户名" prop="username" label-width="80px">
        <el-input type="input" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm">登录</el-button>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import Mock from "mockjs";
import { getMenu } from "../../../api/data";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12个字符", trigger: "blur" },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        // 有值
        if (valid) {
          getMenu(this.ruleForm).then((res) => {
            if (res.data.code === 20000) {
              this.$store.commit("clearMenu");
              this.$store.commit("setMenu", res.data.data.menu);
              this.$store.commit("setToken", res.data.data.token);
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" });
            } else {
              this.$message.error("账号密码错误");
              this.ruleForm.username = "";
              this.ruleForm.password = "";
            }
          });
        } else {
          // 无值
          this.$message.error("请输入账号密码");
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.onkeydown = () => {
      let _key = window.event.keyCode;
      if (_key === 13 && !this.clickState) {
        this.submitForm();
        console.log(1);
      }
    };
  },
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
.el-form-item__content {
  margin: 0 !important;
}
/* @import url(); 引入公共css类 */
.login {
  width: 300px;
  height: 240px;
  /* border: 1px solid #333; */
  margin-top: -120px;
  margin-left: -150px;
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgb(252, 250, 250);
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgb(109, 103, 103) 0px 0px 16px 0px;
}
h3 {
  line-height: 50px;
  margin-bottom: 10px;
}
</style>
