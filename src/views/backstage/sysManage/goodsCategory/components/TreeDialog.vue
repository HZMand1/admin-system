<template>
  <!-- 组织架构树弹框 -->
  <section>
    <el-dialog title="选择菜单"
               :visible.sync="isDialog"
               width="25%"
               :before-close="cancel">
      <section>
        <el-row>
          <el-col>
            <el-tree ref="tree"
                     :data="treeData"
                     @check-change="orgCheckChange"
                     :check-strictly="true"
                     show-checkbox
                     node-key="id"
                     :render-content="renderContent"
                     :default-expanded-keys="[1]"
                     :props="defaultProps">
            </el-tree>
          </el-col>
        </el-row>
      </section>
      <section slot="footer"
               class="dialog-footer">
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </section>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: "TreeDialog",
  props: {
    isDialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      selectOrg: {
        orgsid: []
      },
      code: this.$config.RET_CODE.SUCCESS_CODE
    };
  },
  mounted () {
    this.$api.api
      .findCategoryTree()
      .then(result => {
        let datas = result.data.data;
        if (result.data.retcode === this.code) {
          this.treeData = datas;
        } else {
          this.$message.error(result.data.retmsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 自定义tree节点
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class={data.className}></i>
          <span>{data.name}</span>
        </span>
      );
    },
    // 设置节点只能单选
    orgCheckChange (data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    // 取消弹框
    cancel () {
      this.$emit("cancelEmit", false);
    },
    // 确认弹框
    confirm () {
      let nodes = this.$refs.tree.getCheckedNodes();
      let obj = nodes.length <= 0 ? {} : nodes[0];
      this.$emit("confirmEmit", false, obj);
    }
  }
};
</script>
<style lang="less" scoped>
</style>