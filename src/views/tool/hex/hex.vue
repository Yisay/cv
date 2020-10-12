<template>
  <div>
    <div class="flex box">
      <el-input placeholder="进制数" v-model="j1" class="inputspan">
        <template slot="prepend">进制数</template>
      </el-input>
      <el-input placeholder="内容" v-model="requst" class="inputbox">
        <template slot="prepend">内容</template>
      </el-input>
    </div>
    <el-button @click="hexchange" class="box">转换</el-button>
    <div class="flex box">
      <el-input placeholder="进制数" v-model="j2"  class="inputspan">
        <template slot="prepend">进制数</template>
      </el-input>
      <el-input placeholder="内容" v-model="result"  class="inputbox">
        <template slot="prepend">内容</template>
      </el-input>
    </div>
  </div>
</template>
<style scoped>
  .inputspan{
    width:146px;margin-right:8px
  }
  .box{
    width:400px;margin:4px
  }
  .inputbox{
    width:248px
  }
</style>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      requst: '',
      result: '',
      j1: '',
      j2: ''
    }
  },
  methods: {
    hexchange () {
      let that = this
      axios.get('http://api.25cl.cn/project/tool/hex', {
        params: {
          requst: that.requst,
          j1: that.j1,
          j2: that.j2
        }
      }).then(res => {
        that.result = res.data
      })
    }
  }
}
</script>
