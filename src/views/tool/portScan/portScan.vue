<template>
  <div style="width: 400px">
    ip或域名<el-input v-model="host" placeholder=""></el-input> 端口号<el-input
      v-model="ports"
      placeholder=""
    ></el-input>
    超时时间<el-input-number
      v-model="num"
      :min="1"
      :max="10"
      label="超时时间"
    ></el-input-number>
    <el-button type="" @click="scan">查询</el-button>
    <div>
      <div class="flex">
        <div style="background-color:#eee;padding: 8px; width: 300px">ip</div>
        <div style="background-color:#ccc;padding: 8px; width: 80px">端口号</div>
        <div style="background-color:#eee;padding: 8px; width: 80px">状态</div>
      </div>
      <div v-show="loading" v-loading="loading" style="height:80px"></div>
      <div v-show="!loading" v-for="(item, index) in result" :key="index">
        <div
          class="flex"
          v-for="i in item"
          :key="i"
          style="border: 1px solid #ccc; margin: 2px"
        >
          <div style="padding: 8px; width: 300px">{{ ip }}</div>
          <div style="padding: 8px; width: 80px">{{ i }}</div>
          <div
            style="padding: 8px; width: 80px; color: green"
            v-show="index == 'open'"
          >
            开启
          </div>
          <div
            style="margin: 8px; width: 80px; color: red"
            v-show="index == 'close'"
          >
            关闭
          </div>
        </div>
      </div>
    </div>
    <div style="font-size:12px;margin:8px">
      端口号的范围是从1～65535。其中1～1024是被RFC
      3232规定好了的，被称作“众所周知的端口”(Well Known
      Ports)；从1025～65535的端口被称为动态端口（Dynamic
      Ports），可用来建立与其它主机的会话，也可由用户自定义用途。
      一些常见的端口号及其用途如下：<br />
      21端口：FTP 文件传输服务<br />
      22端口：SSH 端口<br />
      23端口：TELNET 终端仿真服务<br />
      25端口：SMTP 简单邮件传输服务<br />
      53端口：DNS 域名解析服务<br />
      80端口：HTTP 超文本传输服务<br />
      110端口：POP3 “邮局协议版本3”使用的端口<br />
      443端口：HTTPS 加密的超文本传输服务<br />
      1433端口：MS SQL*SERVER数据库 默认端口号<br />
      1521端口：Oracle数据库服务<br />
      1863端口：MSN Messenger的文件传输功能所使用的端口<br />
      3306端口：MYSQL 默认端口号<br />
      3389端口：Microsoft RDP 微软远程桌面使用的端口<br />
      5631端口：Symantec pcAnywhere 远程控制数据传输时使用的端口<br />
      5632端口：Symantec pcAnywhere 主控端扫描被控端时使用的端口<br />
      5000端口：MS SQL Server使用的端口<br />
    </div>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      host: 'www.baidu.com',
      ports: '21,3306,80,8080,22',
      num: 3,
      result: {},
      loading: false,
      ip: ''
    }
  },
  methods: {
    scan () {
      this.loading = true
      let params = new URLSearchParams()
      params.append('host', this.host)
      params.append('ports', this.ports)
      params.append('timeout', this.num)
      axios
        .post('http://api.25cl.cn/project/tool/portScan', params)
        .then((res) => {
          console.log(res.data)
          this.result.open = res.data['open']
          this.result.close = res.data['close']
          this.ip = res.data['ip']
          this.loading = false
        })
    }
  }
}
</script>
