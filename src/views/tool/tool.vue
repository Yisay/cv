<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="40%">
        <el-row :gutter="20" style="height:100%">
          <el-col :span="8">
            <el-card></el-card>
          </el-col>
          <el-col :span="8">
            <el-card></el-card>
          </el-col>
          <el-col :span="8">
            <el-card></el-card>
          </el-col>
        </el-row>
      </el-aside>
      <el-main> </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
