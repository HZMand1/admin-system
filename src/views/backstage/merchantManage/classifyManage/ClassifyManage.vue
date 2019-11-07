<template>
  <section class="classify-manage">
    <el-row>
      <el-col>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="left">
          <el-col :span="4">
            <el-form-item label="分类名称 : " prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="是否显示 : " prop="name">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="all"></el-option>
                <el-option label="显示" value="show"></el-option>
                <el-option label="隐藏" value="hide"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">重置</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">新增分类</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="name" label="父类分类名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="分类名称">
          </el-table-column>
          <el-table-column prop="address" label="排序">
          </el-table-column>
          <el-table-column prop="address" label="是否显示">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="pad-t-20 pad-b-20">
      <div class="text-center">
        <el-pagination background @size-change="setAuctionSizeChange" @current-change="setAuctionCurrentChange" :current-page="currentPage" :total="total" :page-size="totalPage" :page-sizes="[10, 20, 30, 40]" layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      </div>
    </el-row>
  </section>
</template>
<script>
export default {
  name: "classifyManage",
  data() {
    return {
      ruleForm: {
        region: "all"
      },
      rules: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentPage: 1, // 分页 当前页数
      totalPage: 10, // 分页 每页显示多少条
      total: 0, // 总条数
      titleDialog: "分类编辑"
    };
  },
  methods: {
    // 设置显示每页多少条数据
    setAuctionSizeChange(currentPage) {
      this.totalPage = currentPage;
    },
    // 设置当前页码
    setAuctionCurrentChange(val) {
      this.currentPage = val;
    },
    edit(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less" scoped>
</style>