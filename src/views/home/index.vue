<!--  -->
<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            :size="150"
          ></el-avatar>
          <div class="text">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="login-info">
          <p>上次登录时间<span>2022-6-2</span></p>
          <p>上次登录地点<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(item, index) in tableLabel"
            :key="index"
            :label="item"
            :prop="index"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="box">
        <el-card
          shadow="hover"
          v-for="(item, index) in countData"
          :key="index"
          class="box1"
        >
          <i
            :class="`el-icon-${item.icon}`"
            :style="`background:${item.color} ;`"
          ></i>

          <h3>￥{{ item.value }}</h3>
          <p>{{ item.name }}</p>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px; margin-bottom: 20px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div>
        <el-row type="flex">
          <el-col :span="12">
            <el-card shadow="hover" style="height: 328px">
              <div style="height: 328px" ref="userbar"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" style="height: 328px; margin-left: 20px">
              <div style="height: 328px" ref="pie"></div
            ></el-card>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getData } from "../../../api/data";
import * as echarts from "echarts";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "home",
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [
        // {
        //   name: "oppo",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "vivo",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "苹果",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "小米",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "三星",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "魅族",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.$axios.get("http://jsonplaceholder.typicode.com/users").then((res) => {
    //   console.log(res);
    // });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        console.log(data);
        const order = data.orderData;
        const orderArr = Object.keys(order.data[0]);
        const series = [];
        orderArr.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const E = echarts.init(this.$refs.echarts);
        const option = {
          legend: {
            data: orderArr,
          },
          xAxis: {
            data: order.date,
          },
          yAxis: {},
          series,
        };
        E.setOption(option);
        const U = echarts.init(this.$refs.userbar);
        const Uoption = {
          legend: {
            // data: orderArr,
          },
          xAxis: {
            data: data.userData.map((item) => item.date),
            axisLine: { lineStyle: { color: "#17b3a3" } },
            axisLabel: { textStyle: { color: "#333" } },
          },
          yAxis: {},
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
          color: ["red", "pink"],
        };
        U.setOption(Uoption);
        const V = echarts.init(this.$refs.pie);
        const Voption = {
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
          color: ["red", "pink"],
        };
        V.setOption(Voption);
      }
    });
  },
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
  margin-bottom: 20px;
}
.user {
  display: flex;
  /* align-items: center; */
  line-height: 40px !important;
  /* margin-bottom: 20px; */
}
.el-avatar {
  margin-left: 25px;
}
.text {
  margin-left: 20px;
  margin-top: 30px;
}

.login-info {
  line-height: 40px;
  margin-left: 20px;
  text-align: left;
}
.login-info span {
  margin-left: 20px;
  color: rgb(131, 113, 113);
}
table th.el-table__cell.is-leaf {
  /* border-bottom: 1px solid #ebeef5; */
  line-height: 20px;
}

.box {
  /* height: 150px; */
  display: flex;
  line-height: 0;
  flex-wrap: wrap;
  justify-content: space-between;
}
.box1 {
  width: 30%;
  height: 90px;
  margin-bottom: 20px;
  position: relative;
  /* padding: 0 !important; */
}
/* .el-card__body,
.el-main {
  padding: 0 !important;
} */
.box i {
  /* float: left; */
  width: 90px;
  height: 90px;
  line-height: 90px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 45px;
  color: white;
}
.box h3 {
  position: absolute;
  top: 30px;
  left: 118px;
}
.box p {
  position: absolute;
  top: 62px;
  left: 110px;
}
</style>
