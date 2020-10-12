<template>
  <div>
   <div class="flex">
     <el-tag>当前时间:{{nowtime}}</el-tag>
     <el-button style="margin:0px" v-show="timeInterval" @click="timeInterval=false" icon="el-icon-caret-right" circle ></el-button>
     <el-button style="margin:0px" v-show="!timeInterval" @click="timeInterval=true" icon="el-icon-video-pause" circle></el-button>
   </div>
    时间戳转日期
    <div class="flex">
      <el-input
        placeholder="请输入时间戳"
        v-model="request"
        style="width:300px;margin:8px"
      >
        <el-select
          v-model="select"
          slot="append"
          placeholder="时间单位"
          style="width: 92px"
        >
          <el-option label="秒" value="1"></el-option>
          <el-option label="毫秒" value="2"></el-option>
        </el-select>
      </el-input>
      <el-button icon="el-icon-refresh" circle style="margin:8px"></el-button>
      <el-input v-model="result" placeholder="" style="width:300px;margin:8px"></el-input>
    </div>
    日期转时间戳
    <div class="flex">
      <el-input v-model="result" placeholder="" style="width:300px;margin:8px"></el-input>
      <el-button icon="el-icon-refresh" circle style="margin:8px"></el-button>
      <el-input
        placeholder="请输入时间戳"
        v-model="request"
        style="width:300px;margin:8px"
      >
        <el-select
          v-model="select"
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
      select: '',
      request: '',
      result: '',
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
    }
  }
}
</script>
