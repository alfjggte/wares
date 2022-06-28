<!--  -->
<template>
  <div class="addUser">
    <div>
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <div style="float: right">
        <Cform
          ref="searchForm"
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          style="float: left"
        />
        <el-button
          type="primary"
          style="float: left"
          @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </div>
    </div>
    <Ctable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @edit="editUser"
      @del="delUser"
      @changePage="getList()"
    />

    <el-dialog
      :title="operateType === 'add' ? '新增' : '编辑'"
      :visible.sync="isShow"
      width="30%"
    >
      <Cform
        ref="addForm"
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Cform from "../../components/Cform.vue";
import Ctable from "../../components/Ctable.vue";
import { getUser } from "../../../api/data";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "User",
  components: { Cform, Ctable },
  data() {
    //这里存放数据
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = { name: "", addr: "", age: "", birth: "", sex: "" };
    },
    confirm() {
      if (this.operateType === "edit") {
        this.$axios.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$axios.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    getList(name = "") {
      name ? (this.config.page = 1) : "";
      getUser({ page: this.config.page, name }).then((res) => {
        // console.log(res);
        this.tableData = res.data.list.map((item) => {
          item.sexLabel = item.sex == 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
      });
    },
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$axios.post("/user/del", { id: id }).then(() => {
          this.getList();
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
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
.addUser {
  text-align: left;
  line-height: 20px;
}
</style>
