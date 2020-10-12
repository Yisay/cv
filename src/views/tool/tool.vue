<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="40%" style="padding: 10px; border-right: 1px solid #ccc">
        <el-row :gutter="20" style="height: 100%">
          <el-col :span="8">
            <el-card>
              <div slot="header">进制转换</div>
                <router-link  to="/tool/hex">任意进制转换</router-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">时间戳</div>
                <router-link  to="/tool/timestamp">日期转时间戳</router-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card></el-card>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
         <router-view></router-view>
      </el-main>
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
