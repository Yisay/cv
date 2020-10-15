<template >
  <div>
    <div>
      <div class="flex" style="padding: 0 8px">
        <div style="margin-right: 8px; flex: 1">
          <el-input placeholder="请输入接口地址" v-model="apiUrl">
            <el-select
              v-model="type"
              slot="prepend"
              style="width: 80px; margin: 0px"
            >
              <el-option label="GET" value="get"></el-option>
              <el-option label="POST" value="post"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="test"
              >测试</el-button
            >
          </el-input>
        </div>
        <el-button type="" @click="parameter.push({ pname: '', pvalue: '' })"
          >添加参数</el-button
        >
      </div>
      <div
        class="flex"
        style="width: 90%; margin: 6px"
        v-for="(item, index) in parameter"
        :key="index"
      >
        <el-input
          v-model="item.pname"
          placeholder="请输入参数名"
          style="margin-right: 8px"
        >
        </el-input>
        <el-input
          v-model="item.pvalue"
          placeholder="请输入参数值"
          style="margin-right: 8px"
        >
        </el-input>
        <el-button type="" @click="parameter.splice(key, 1)">删除</el-button>
      </div>
    </div>
    <div style="width:400px;height:500px">
      {{ result }}
    </div>
    <div style="width:400px;font-size:14px">
      跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的类似策略造成的，是浏览器对JavaScript实施的安全限制。<br/>
      同源策略限制了一下行为： Cookie，LocalStorage和IndexDB无法读取<br/>
      DOM和JS对象无法获取 Ajax请求发送不出去<br/>
    </div>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      apiUrl: '',
      type: 'get',
      parameter: [],
      result: ''
    }
  },
  methods: {
    test () {
      if (this.type === 'get') {
        let params = ''
        for (let item of this.parameter) {
          params = params + item.pname + '=' + item.pvalue + '&'
        }
        params.slice(0, params.length - 1)
        axios.get(this.apiUrl + '?' + params).then((res) => {
          this.result = res.data
        })
      } else if (this.type === 'post') {
        let params = new URLSearchParams()
        for (let item of this.parameter) {
          params.append(item.pname, item.pvalue)
        }
        axios.post(this.apiUrl, params).then((res) => {
          this.result = res.data
        })
      }
    }
  }
}
</script>
