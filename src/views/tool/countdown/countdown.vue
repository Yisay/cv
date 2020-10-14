<template>
    <div>
        <el-time-picker
    v-model="cdnumber"
    value-format="timestamp">
  </el-time-picker>
  <el-button type="" @click="startcd" v-show="status"><a style="color:green">开始</a></el-button>
  <el-button type="" @click="stopcd"  v-show="!status" style="margin:0px"><a style="color:red">暂停</a></el-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      timer: '',
      cdnumber: '',
      sleep: 1,
      status: true,
      endtime: new Date(new Date().toLocaleDateString()).getTime()
    }
  },
  methods: {
    startcd () {
      this.status = false
      this.timer = setInterval(this.countdownend, 1000)
    },
    stopcd () {
      this.status = true
      clearInterval(this.timer)
    },
    countdownend () {
      if (this.cdnumber > 0) {
        if (this.cdnumber - this.endtime > 0) {
          this.cdnumber -= 1000
        } else {
          this.sleep += 1
          if (this.sleep % 2 === 1) {
            document.title = '计时结束'
          } else if (this.sleep % 2 === 0) {
            document.title = '-'
          }
          if (this.sleep > 30) {
            clearInterval(this.timer)
          }
        }
      }
    }
  },
  mounted () {
  }
}
</script>
