<template>
  <div>
    <div class="flex">
      <el-tag style="margin-right: 8px" @click="s2trequest = nowtime"
        >当前时间戳:{{ nowtime }}</el-tag
      >
      <el-button
        style="margin: 0px; color: green; font-size: 20px; padding: 5px"
        size="small"
        v-show="timeInterval"
        @click="timeInterval = false"
        icon="el-icon-caret-right"
        circle
      ></el-button>
      <el-button
        style="margin: 0px; color: red; font-size: 20px; padding: 5px"
        size="small"
        v-show="!timeInterval"
        @click="timeInterval = true"
        icon="el-icon-video-pause"
        circle
      ></el-button>
    </div>
    时间戳转日期
    <div class="flex">
      <el-input
        placeholder="请输入时间戳"
        v-model="s2trequest"
        style="width: 300px; margin: 8px"
      >
        <el-select
          v-model="s2tunit"
          slot="append"
          placeholder="时间单位"
          style="width: 92px"
        >
          <el-option label="秒" value="1"></el-option>
          <el-option label="毫秒" value="2"></el-option>
        </el-select>
      </el-input>
      <el-button
        icon="el-icon-refresh"
        circle
        style="margin: 8px"
        @click="s2tchange"
      ></el-button>
      <el-input
        v-model="s2tresult"
        placeholder=""
        style="width: 300px; margin: 8px"
      ></el-input>
    </div>
    日期转时间戳
    <div class="flex">
      <el-date-picker
        v-model="t2srequest"
        type="datetime"
        style="margin:8px;width:300px"
        placeholder="选择日期时间"
      >
      </el-date-picker>
      <el-button
        icon="el-icon-refresh"
        circle
        style="margin: 8px"
        @click="t2schange"
      ></el-button>
      <el-input
        placeholder="请输入时间"
        v-model="t2sresult"
        style="width: 300px; margin: 8px"
      >
        <el-select
          v-model="t2sunit"
          slot="append"
          placeholder="时间单位"
          style="width: 92px"
        >
          <el-option label="秒" value="1"></el-option>
          <el-option label="毫秒" value="2"></el-option>
        </el-select>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      t2sunit: '1',
      s2tunit: '1',
      t2srequest: '',
      t2sresult: '',
      s2trequest: '',
      s2tresult: '',
      nowtime: '',
      timeInterval: true
    }
  },
  mounted () {
    this.timer = setInterval(this.timestamp, 1000)
  },
  methods: {
    timestamp () {
      if (this.timeInterval) this.nowtime = Math.round(new Date() / 1000)
    },
    s2tchange () {
      let date = new Date(
        this.s2tunit === '1' ? this.s2trequest * 1000 : this.s2trequest * 1
      )
      let fmt = 'yyyy-MM-dd hh:mm:ss'
      if (!date || date == null) this.s2tresult = ''
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      this.s2tresult = fmt
    },
    t2schange () {
      var date = new Date(this.t2srequest).getTime()
      this.t2sresult = this.t2sunit === '1' ? date / 1000 : date
    }
  }
}
</script>
