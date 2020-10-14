<template>
  <div>
    <div style="width:400px">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="result"
      >
      </el-input>
    </div>

    <el-button-group>
      <el-button @click="hextostr"> 转字符串 </el-button>
      <el-button @click="strtohex"> 转十六进制 </el-button>
    </el-button-group>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      result: ''
    }
  },
  methods: {
    hextostr () {
      let params = new URLSearchParams()
      params.append('text', this.result)
      axios
        .post('http://api.25cl.cn/project/tool/hextostr', params)
        .then((res) => {
          this.result = res.data
        })
    },
    strtohex () {
      let params = new URLSearchParams()
      params.append('text', this.result)
      axios
        .post('http://api.25cl.cn/project/tool/strtohex', params)
        .then((res) => {
          this.result = res.data
        })
    }
  }
}
</script>
