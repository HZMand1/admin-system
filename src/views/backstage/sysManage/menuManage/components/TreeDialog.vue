<template>
  <!-- 组织架构树弹框 -->
  <section>
    <el-dialog title="选择菜单" :visible.sync="isDialog" width="25%" :before-close="cancel">
      <section>
        <el-row>
          <el-col>
            <el-tree ref="tree" :data="treeData" @check-change="orgCheckChange" :check-strictly="true" show-checkbox node-key="id" :render-content="renderContent" :default-expanded-keys="[1]" :props="defaultProps">
            </el-tree>
          </el-col>
        </el-row>
      </section>
      <section slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
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
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "一级菜单",
          children: [
            {
              id: 2,
              label: "会员管理",
              children: [
                {
                  id: 3,
                  label: "会员收藏"
                },
                {
                  id: 4,
                  label: "会员优惠卷"
                }
              ]
            },
            {
              id: 21,
              label: "商城配置",
              children: [
                {
                  id: 31,
                  label: "商城属性种类"
                },
                {
                  id: 41,
                  label: "商品规格"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      selectOrg: {
        orgsid: []
      }
    };
  },
  methods: {
    // 自定义tree节点
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class={data.className}></i>
          <span>{node.label}</span>
        </span>
      );
    },
    // 设置节点只能单选
    orgCheckChange(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    // 取消弹框
    cancel() {
      this.$emit("cancelEmit", false);
    },
    // 确认弹框
    confirm() {
      let nodes = this.$refs.tree.getCheckedNodes();
      let obj = nodes.length <= 0 ? {} : nodes[0];
      this.$emit("confirmEmit", false, obj.label);
    }
  }
};
</script>
<style lang="less" scoped>
</style>