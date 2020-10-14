<template>
  <div style="width:400px">
    ip或域名<el-input v-model="host" placeholder=""></el-input>
    端口号<el-input v-model="ports" placeholder=""></el-input>
    超时时间<el-input-number v-model="num" :min="1" :max="10" label="超时时间"></el-input-number>
    <el-button type="" @click="scan">查询</el-button>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      host: 'www.corrinfo.com',
      ports: '21',
      num: 3
    }
  },
  methods: {
    scan () {
      let params = new URLSearchParams()
      params.append('host', this.host)
      params.append('ports', this.ports)
      params.append('timeout', this.num)
      axios.post('http://api.25cl.cn/project/tool/portScan', params).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
