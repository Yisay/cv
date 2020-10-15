<template>

<el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width:400px;margin:8px">
    <el-tab-pane label="基础" name="first">
      <el-input v-model="qrWidth" placeholder=""><template slot="prepend">宽度</template></el-input>
      <el-input v-model="qrHeight" placeholder=""><template slot="prepend">高度</template></el-input>
      <el-input v-model="qrBody" type="textarea" placeholder="" :autosize="true" style="margin:10px"><template slot="prepend">文本内容</template></el-input>
    </el-tab-pane>
    <el-tab-pane label="颜色" name="second">
      <div class="flex">
        <el-tag>前景色</el-tag>
        <el-color-picker v-model="beforeColor" show-alpha size="medium"></el-color-picker>
      </div>
      <div class="flex">
        <el-tag>背景色</el-tag>
        <el-color-picker v-model="afterColor" show-alpha size="medium"></el-color-picker>
      </div>
    </el-tab-pane>
    <el-tab-pane label="logo" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      qrWidth: '',
      qrHeight: '',
      beforeColor: '#000000',
      afterColor: '#ffffff',
      qrBody: ''
    }
  }
}
</script>
