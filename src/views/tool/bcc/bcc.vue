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
    <el-button type="" @click="exchangebcc">计算</el-button><el-button type="" @click="bccrequst=''">清空</el-button>
    <div style="margin-top: 15px" v-for="(item,key) in result" :key="key">
      <el-input v-model="result[key]">
        <div slot="prepend" style="width:40px">{{key}}</div>
        <el-button slot="append" icon="el-icon-document-copy" @click="copy(item)">复制</el-button>
      </el-input>
    </div>
    <el-card style="width:600px;font-size:14px">
      <p>BCC校验</p>
BCC(Block Check Character/信息组校验码)，因校验码是将所有数据异或得出，故俗称异或校验。具体算法是：将每一个字节的数据（一般是两个16进制的字符）进行异或后即得到校验码。<br>
例如16进制数据：01 A0 7C FF 02<br>
计算：01 xor A0 xor 7C xor FF xor 02 = 20<br>
校验码是：20<br>
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
    exchangebcc () {
      let bcc = this.bccrequst.replace(/\s+/g, '')
      let result = 0
      for (var e = 0; e < bcc.length; e = e + 2) {
        result = result ^ parseInt(bcc.substr(e, 2), 16)
      }
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
