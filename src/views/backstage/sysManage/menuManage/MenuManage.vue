<template>
  <!-- 系统管理-菜单配置 -->
  <section class="menu-manage">
    <el-row>
      <el-col>
        <span>
          <el-button icon="el-icon-s-promotion" @click="refresh">刷新</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="primary" @click="addMenu" icon="el-icon-plus">新增</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="warning" @click="editMenu" icon="el-icon-edit">修改</el-button>
        </span>
        <span class="pad-l-10">
          <el-button type="danger" @click="deleteMenu" icon="el-icon-delete">删除</el-button>
        </span>
      </el-col>
    </el-row>
    <el-row class="pad-t-20" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col>
        <el-table :data="tableData" style="width: 100%;" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column label="操作" width="50" type="selection">
            <template slot-scope="scope">
              <el-radio v-model="checked" :label="scope.row.id" @change.native="getRadio(scope.$index,scope.row)">{{&nbsp;}}</el-radio>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="55">
          </el-table-column>-->
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <!-- <el-table-column prop="code" label="编号" min-width="3%"></el-table-column> -->
          <!-- <el-table-column prop="menu" label="上级菜单" min-width="5%"></el-table-column> -->
          <!-- <el-table-column prop="icon" label="图标" min-width="8%"></el-table-column> -->
          <el-table-column label="类型" min-width="4%">
            <template slot-scope="scope">
              <div v-if="scope.row.type===1" class="button">按钮</div>
              <div v-if="scope.row.type===0" class="menu">菜单</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="sort" label="排序" min-width="5%"></el-table-column> -->
          <el-table-column prop="path" label="菜单URL" min-width="15%"></el-table-column>
          <el-table-column prop="auth" label="授权标识" min-width="50%"></el-table-column>
          <el-table-column label="状态" min-width="4%">
            <template slot-scope="scope">
              <div style="cursor:pointer" @click="updateMenuStatus(scope.row.id, scope.row.enable===1?0:1)" class="button" :class="scope.row.enable===0?'blue':'red'">{{scope.row.enable===0?"有效":"无效"}}</div>
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
      tableData: [],
      configItem: {},
      code: this.$config.RET_CODE.SUCCESS_CODE,
      loading: false
    };
  },
  mounted() {
    this.loading = true;
    this.$api.api
      .findMenuZtree()
      .then(result => {
        let datas = result.data.data;
        if (result.data.retcode === this.code) {
          this.tableData = datas;
        } else {
          this.$message.error(result.data.retmsg);
        }
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
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
        query: { id: this.configItem.id }
      });
    },
    // 刷新
    refresh() {
      this.loading = true;
      this.$api.api
        .findMenuZtree()
        .then(result => {
          let datas = result.data.data;
          if (result.data.retcode === this.code) {
            this.$message({
              message: "刷新成功",
              type: "success"
            });
            this.tableData = datas;
          } else {
            this.$message.error(result.data.retmsg);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
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
          let params = {
            id: this.configItem.id,
            enable: 1
          };
          this.$api.api
            .updateMenuEnable(params)
            .then(result => {
              if (result.data.retcode === this.code) {
                this.$message({
                  type: "success",
                  message: result.data.retmsg
                });
                this.refresh();
              } else {
                this.$message.error(result.data.retmsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 更新菜单状态
    updateMenuStatus(_id,_enable) {
        let params = {
            id: _id, //菜单id
            enable: _enable //状态
        };
    this.$api.api.updateMenuEnable(params)
        .then(res => {
            if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {


                this.refresh();
            } else {
                this.$message.error(res.data.retmsg);
            }
        })
        .catch(() => {
            this.$message.error("商品分类请求失败！");
        });
    },
  }
};
</script>
<style lang="less">
.menu-manage {
  .el-table__header-wrapper {
    .el-checkbox {
      display: none;
    }
  }
  .directory,
  .button,
  .menu {
    padding: 0;
    background-color: #1ab394;
    color: #ffffff;
    text-align: center;
    border-radius: 6px;
  }
  .button {
    background-color: #f8ac59;
  }
  .menu {
    background-color: #1c84c6;
  }
  .blue {
    background-color: #1c84c6;
  }
  .red {
    background-color: #ed5565;
  }
}
</style>