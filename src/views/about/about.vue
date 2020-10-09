<template>
  <el-container style="height:100%;">
    <el-header>
      <el-menu default-active="/" :router="true">
        <el-menu-item index="/">返回主页</el-menu-item>
      </el-menu>
    </el-header>
    <div style="width:80%;margin:0 auto">
      <el-divider>前端</el-divider>
      <el-link
        class="el-button"
        :underline="false"
        href="https://cn.vuejs.org/"
        target="_blank"
      >vue</el-link>
      <el-link
        class="el-button"
        :underline="false"
        href="https://element.eleme.cn/"
        target="_blank"
      >element</el-link>
      <el-divider>后端框架</el-divider>
      <el-link
        class="el-button"
        :underline="false"
        href="http://www.thinkphp.cn/"
        target="_blank"
      >thinkphp5</el-link>
      <el-link
        class="el-button"
        :underline="false"
        href="https://www.workerman.net/"
        target="_blank"
      >workerman</el-link>
      <el-divider>数据库</el-divider>
      <el-link
        class="el-button"
        :underline="false"
        href="https://www.mysql.com/"
        target="_blank"
      >mysql</el-link>
      <el-divider>图标icon</el-divider>
      <el-link
        class="el-button"
        :underline="false"
        href="https://www.iconfont.cn/"
        target="_blank"
      >iconfont</el-link>
    </div>
  </el-container>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
