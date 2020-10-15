<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside width="40%" style="padding: 10px; border-right: 1px solid #ccc">
        <el-row :gutter="20" style="margin:4px">
          <el-col :span="8" v-for="(item,index) in cards" :key="index">
            <el-card style="height:140px;margin:4px 0px">
              <div slot="header">{{item.header}}</div>
                <el-link :underline="false" :href="item.href" style="height:40px">{{item.body}}</el-link>
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
    return {
      cards: [
        {
          header: '倒计时',
          href: '#/tool/countdown',
          body: '倒计时'
        }, {
          header: '时间戳',
          href: '#/tool/timestamp',
          body: '日期转时间戳'
        }, {
          header: '进制转换',
          href: '#/tool/hex',
          body: '任意进制转换'
        }, {
          header: 'str2hex',
          href: '#/tool/strhex',
          body: '字符串转十六进制'
        }, {
          header: 'BCC校验',
          href: '#/tool/bcc',
          body: '异或校验'
        }, {
          header: 'LRC校验',
          href: '#/tool/lrc',
          body: 'LRC校验'
        }, {
          header: '端口扫描',
          href: '#/tool/portScan',
          body: '端口扫描'
        }, {
          header: '接口测试',
          href: '#/tool/apiTest',
          body: 'HTTP GET/POST接口测试'
        }, {
          header: '二维码生成器',
          href: '#/tool/qrcode',
          body: '二维码生成器'
        }
      ]
    }
  }
}
</script>
