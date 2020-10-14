<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="40%" style="padding: 10px; border-right: 1px solid #ccc">
        <el-row :gutter="20" style="margin:4px">
          <el-col :span="8">
            <el-card>
              <div slot="header">进制转换</div>
                <el-link :underline="false" href="#/tool/hex" >任意进制转换</el-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">时间戳</div>
                <el-link :underline="false" href="#/tool/timestamp">日期转时间戳</el-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">str2hex</div>
                <el-link :underline="false" href="#/tool/strhex">字符串转十六进制</el-link>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20"  style="margin:4px">
          <el-col :span="8">
            <el-card>
              <div slot="header">BCC校验</div>
                <el-link :underline="false" href="#/tool/bcc" >异或校验</el-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">倒计时</div>
                <el-link :underline="false" href="#/tool/countdown">倒计时</el-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">LRC校验</div>
                <el-link :underline="false" href="#/tool/lrc">LRC校验</el-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header">端口扫描</div>
                <el-link :underline="false" href="#/tool/portScan">端口扫描</el-link>
            </el-card>
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
