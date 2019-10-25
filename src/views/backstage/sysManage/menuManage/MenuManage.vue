<template>
  <!-- 系统管理-菜单配置 -->
  <section class="pad-l-20 pad-t-20 MenuManage pad-r-20">
    <el-row>
      <el-col>
        <span>
          <el-button type="primary" icon="el-icon-s-promotion">刷新</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="primary" @click="addMenu" icon="el-icon-plus">新增</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="primary" @click="editMenu" icon="el-icon-edit">修改</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="primary" @click="deleteMenu" icon="el-icon-delete">删除</el-button>
        </span>
      </el-col>
    </el-row>
    <el-row class="pad-t-20">
      <el-col>
        <el-table :data="tableData" style="width: 100%;" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column label="操作" width="50" type="selection">
            <template slot-scope="scope">
              <el-radio v-model="checked" :label="scope.row.id" @change.native="getRadio(scope.$index,scope.row)">{{&nbsp;}}</el-radio>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="code" label="编号" min-width="3%">
          </el-table-column>
          <el-table-column prop="menu" label="上级菜单" min-width="5%">
          </el-table-column>
          <el-table-column prop="icon" label="图标" min-width="5%">
          </el-table-column>
          <el-table-column prop="type" label="类型" min-width="5%">
          </el-table-column>
          <el-table-column prop="sort" label="排序" min-width="5%">
          </el-table-column>
          <el-table-column prop="URL" label="菜单URL" min-width="10%">
          </el-table-column>
          <el-table-column prop="auth" label="授权标识" min-width="40%">
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="5%">
            <template slot-scope="scope">
              <div>
                {{scope.row.status?"有效":"无效"}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: "MenuManage",
  data() {
    return {
      checked: null,
      tableData: [
        {
          id: 1,
          code: 200,
          name: "会员管理",
          menu: "",
          icon: "",
          type: "目录",
          sort: "1",
          URL: "/home",
          auth: "",
          status: true,
          children: [
            {
              id: 11,
              code: 300,
              name: "会员等级",
              menu: "",
              icon: "",
              type: "目录",
              sort: "2",
              URL: "",
              auth: "",
              status: true
            }
          ]
        },
        {
          id: 2,
          code: 400,
          name: "商城配置",
          menu: "",
          icon: "",
          type: "目录",
          sort: "2",
          URL: "",
          auth: "",
          status: true,
          children: [
            {
              id: 21,
              code: 300,
              name: "商品规格",
              menu: "",
              icon: "",
              type: "目录",
              sort: "2",
              URL: "",
              auth: "",
              status: true,
              children: [
                {
                  id: 211,
                  code: 300,
                  name: "查看",
                  menu: "",
                  icon: "",
                  type: "按钮",
                  sort: "2",
                  URL: "",
                  auth: "",
                  status: false
                },
                {
                  id: 212,
                  code: 300,
                  name: "新增",
                  menu: "",
                  icon: "",
                  type: "按钮",
                  sort: "2",
                  URL: "",
                  auth: "",
                  status: true
                }
              ]
            }
          ]
        },
        {
          id: 3,
          code: 500,
          name: "编辑商品",
          menu: "",
          icon: "",
          type: "目录",
          sort: "2",
          URL: "",
          auth: "",
          status: true,
          children: [
            {
              id: 31,
              code: 400,
              name: "商城配置",
              menu: "",
              icon: "",
              type: "目录",
              sort: "2",
              URL: "",
              auth: "",
              status: true
            },
            {
              id: 32,
              code: 400,
              name: "商城配置",
              menu: "",
              icon: "",
              type: "目录",
              sort: "2",
              URL: "",
              auth: "",
              status: true
            }
          ]
        }
      ],
      configItem: {}
    };
  },
  methods: {
    getRadio(index, row) {
      this.configItem = row;
    },
    // 修改
    editMenu() {
      let config = JSON.stringify(this.configItem) === "{}";
      if (config) {
        this.$message.error("请选择一条记录");
        return false;
      }
      this.$router.push({
        path: "/backstage/sysManage/MenuManage/EditMenu",
        query: { code: this.configItem.code }
      });
    },
    // 新增
    addMenu() {
      this.$router.push({
        path: "/backstage/sysManage/MenuManage/AddMenu",
        query: {}
      });
    },
    // 删除
    deleteMenu() {
      let config = JSON.stringify(this.configItem) === "{}";
      if (config) {
        this.$message.error("请选择一条记录");
        return false;
      }
      this.$confirm("确定要删除选中的记录？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less">
.MenuManage {
  .el-table__header-wrapper {
    .el-checkbox {
      display: none;
    }
  }
}
</style>