<template>
  <el-table :data="tableData"
            @selection-change="selectionChangeHandle">
    <!-- <el-table-column type="selection"
                     width="100"></el-table-column> -->
    <el-table-column label="序号"
                     type="index"
                     width="100px"></el-table-column>
    <el-table-column prop="title"
                     label="广告名称"></el-table-column>
    <el-table-column prop="typeCode"
                     label="广告编号"></el-table-column>
    <el-table-column label="开始时间">
      <template slot-scope="scope">{{ scope.row.addTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column label="结束时间">
      <template slot-scope="scope">{{ scope.row.finishTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column prop="enable"
                     label="广告状态">
      <template slot-scope="scope">
        <span v-if="scope.row.enable === 0">开启</span>
        <span v-if="scope.row.enable === 1">禁用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text"
                   size="small"
                   class="mar-r-20"
                   @click="editHandle(scope.$index, scope.row)">编辑</el-button>
        <el-button type="text"
                   size="small"
                   @click="singleDeleteHandle(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    //表格数据
    tableData: {
      type: Array,
      default: Object,
      required: true
    }
  },
  methods: {
    //表格全选
    selectionChangeHandle (data) {
      this.$emit("selectionChangeHandle", data)
    },
    //编辑
    editHandle (index, row) {
      this.$emit("editHandle", index, row)
    },
    //删除
    singleDeleteHandle (index, row) {
      this.$emit("singleDeleteHandle", index, row)
    }
  }
}
</script>
