<template>
  <div style="width: 400px">
    <template>
      <el-radio v-model="typeradio" label='1' @change="change">十六进制</el-radio>
      <el-radio v-model="typeradio" label='2' @change="change">ascii</el-radio>
    </template>
    <el-input
      v-model="bccrequst"
      type="textarea"
      placeholder=""
      rows="8"
    ></el-input>
    <el-button type="" @click="exchangelrc">计算</el-button><el-button type="" @click="bccrequst=''">清空</el-button>
    <div style="margin-top: 15px" v-for="(item,key) in result" :key="key">
      <el-input v-model="result[key]">
        <div slot="prepend" style="width:40px">{{key}}</div>
        <el-button slot="append" icon="el-icon-document-copy" @click="copy(item)">复制</el-button>
      </el-input>
    </div>
    <el-card style="width:600px;font-size:14px">
        <p>LRC校验</p>
<a>纵向冗余校验（Longitudinal Redundancy Check，简称：LRC）是通信中常用的一种校验形式，也称LRC校验或纵向校验。它是一种从纵向通道上的特定比特串产生校验比特的错误检测方法。在行列格式中（如磁带），LRC经常是与VRC一起使用，这样就会为每个字符校验码。在工业领域Modbus协议Ascii模式采用该算法。
</a>
<p>具体算法如下：</p>
1、对需要校验的数据（2n个字符）两两组成一个16进制的数值求和。<br>
2、将求和结果与256求模。<br>
3、用256减去所得模值得到校验结果（另一种方法：将模值按位取反然后加1）。<br>
例如16进制数据：01 A0 7C FF 02<br>
(16进制计算) 求和：01 + A0 + 7C + FF + 02 = 21E  取模：21E % 100 = 1E  计算：100 - 1E = E2<br>
(10进制计算) 求和：01 + 160 + 124 + 255 + 02 = 542  取模：542 % 256 = 30  计算：256 - 30 = 226<br>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeradio: '1',
      bccrequst: '',
      input2: '',
      result: {
        hex: '',
        dec: '',
        oct: '',
        bin: ''
      }
    }
  },
  methods: {
    change () {
      if (this.typeradio === '1') {
        let hexCharCode = []
        for (var i = 0; i < this.bccrequst.length; i++) {
          hexCharCode.push((this.bccrequst.charCodeAt(i)).toString(16).length < 2 ? '0' + this.bccrequst.charCodeAt(i).toString(16) : this.bccrequst.charCodeAt(i).toString(16))
        }
        this.bccrequst = hexCharCode.join(' ')
      } else {
        let curCharCode = 0
        let resultStr = []
        this.bccrequst = this.bccrequst.replace(/\s+/g, '')
        console.log(this.bccrequst)
        for (var e = 0; e < this.bccrequst.length; e = e + 2) {
          curCharCode = parseInt(this.bccrequst.substr(e, 2), 16)
          resultStr.push(String.fromCharCode(curCharCode))
        }
        this.bccrequst = resultStr.join('')
      }
    },
    exchangelrc () {
      let bcc = this.bccrequst.replace(/\s+/g, '')
      let result = 0
      for (var e = 0; e < bcc.length; e = e + 2) {
        result = result + parseInt(bcc.substr(e, 2), 16)
      }
      console.log(result)
      result = 256 - (result % 256)
      this.result.hex = result.toString(16).length < 2 ? '0' + result.toString(16) : result.toString(16)
      this.result.dec = result.toString(10)
      this.result.oct = result.toString(8)
      for (let i = 8; i > result.toString(2).length; i--) {
        this.result.bin = '0' + this.result.bin
      }
      this.result.bin += result.toString(2)
    },
    copy (body) {
      var input = document.createElement('input') // 直接构建input
      input.value = body // 设置内容
      document.body.appendChild(input) // 添加临时实例
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input)
      this.$message({
        message: body + ' 复制成功',
        type: 'success'
      })
    }
  }
}
</script>
