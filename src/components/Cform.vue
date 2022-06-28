<!--  -->
<template>
  <div class="cform">
    <el-form ref="form" :model="form" :inline="inline" label-width="100px">
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
      >
        <!-- input -->
        <el-input
          v-if="item.type == 'input'"
          v-model="form[item.model]"
          :placeholder="`请输入${item.label}`"
        ></el-input>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="form[item.model]"
          type="date"
          value-format="yyyy-mm-dd"
        >
        </el-date-picker>
        <!-- switch -->
        <el-switch v-if="item.type === 'switch'" v-model="form[item.model]">
        </el-switch>
        <!-- 选择器 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="form[item.model]"
          :placeholder="`请选择${item.label}`"
        >
          <el-option
            v-for="item in item.opts"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 自定义 -->
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: { formLabel: Array, form: Object, inline: Boolean },
  data() {
    //这里存放数据
    return {
      data() {
        return {};
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.el-form-item,
.cform {
  line-height: 38px;
}
</style>
