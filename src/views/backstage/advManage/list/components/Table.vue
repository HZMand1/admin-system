<template>
  <el-table :data="tableData" @selection-change="selectionChangeHandle" border>
    <el-table-column label="序号" type="index" width="55px"></el-table-column>
    <el-table-column prop="title" label="广告名称"></el-table-column>
    <el-table-column prop="typeCode" label="广告编号"></el-table-column>
    <el-table-column prop="subTitle" label="广告位名称"></el-table-column>
    <el-table-column prop="typeName" label="广告位编号"></el-table-column>
    <el-table-column prop="imgPath" label="广告图片" width="80">
      <template slot-scope="scope">
        <div v-viewer>
          <img :src="scope.row.imgPath" alt="图片" style="cursor: pointer;" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="链接地址"></el-table-column>
    <el-table-column
      prop="orders"
      label="显示顺序"
      width="80"
    ></el-table-column>
    <el-table-column label="开始时间" width="100">
      <template slot-scope="scope">{{
        scope.row.addTime | dateFormat('YYYY-MM-DD')
      }}</template>
    </el-table-column>
    <el-table-column label="结束时间" width="100">
      <template slot-scope="scope">{{
        scope.row.finishTime | dateFormat('YYYY-MM-DD')
      }}</template>
    </el-table-column>
    <el-table-column prop="enable" label="广告状态" width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.enable === 0">开启</span>
        <span v-if="scope.row.enable === 1">禁用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220px">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          plain
          @click="showHandle(scope.$index, scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          size="mini"
          plain
          @click="editHandle(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="mini"
          plain
          @click="singleDeleteHandle(scope.$index, scope.row)"
          >删除</el-button
        >
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
    selectionChangeHandle(data) {
      this.$emit("selectionChangeHandle", data)
    },
    //编辑
    editHandle(index, row) {
      this.$emit("editHandle", index, row)
    },
    //删除
    singleDeleteHandle(index, row) {
      console.log(row)
      this.$emit("singleDeleteHandle", index, row)
    },
    // 查看
    showHandle(index, row) {
      this.$router.push({
        path: "/backstage/advManage/AdvList/viewAd",
        query: { id: row.id }
      })
    }
  }
}
</script>
