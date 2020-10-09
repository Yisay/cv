<template>
  <div>
    <el-card class="box-card" style="height:680px;margin-bottom:6px">
      <div slot="header" class="clearfix">
        <span>查询记录</span>
      </div>
      <div style="margin-bottom:4px" size="mini" class="el-input el-input-group">
        <div class="el-input-group__prepend">条数查询</div>
        <el-button-group size="mini">
          <el-button size="mini" @click="getLogList(0,10)">近10条</el-button>
          <el-button size="mini" @click="getLogList(0,50)">近50条</el-button>
          <el-button size="mini" @click="getLogList(0,100)">近100条</el-button>
        </el-button-group>
      </div>
      <el-row type="flex" class="row-bg" style="margin-bottom:6px">
        <el-input placeholder="用户名查询" v-model="acnumberinput" clearable style="margin-right:20px">
          <template slot="prepend">用户名查询</template>
          <el-button slot="append" icon="el-icon-search" @click="getLogList(1,acnumberinput)"></el-button>
        </el-input>
        <div class="el-input el-input-group" style="max-height:30px">
          <div class="el-input-group__prepend" style="height:30px">日期查询</div>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="line-height:30px;width:100%;min-width:346px;padding:1; border-radius: 0px;"
          ></el-date-picker>
          <div class="el-input-group__append" style="height:30px">
            <el-button icon="el-icon-search" @click="getLogList(2,value2)"></el-button>
          </div>
        </div>
      </el-row>
      <el-table :data="tableData" style="width: 100%" height="500px" size="mini">
        <el-table-column fixed prop="date" label="日期" width="200"></el-table-column>
        <el-table-column prop="acnumber" label="用户名" width="200"></el-table-column>
        <el-table-column prop="operation" label="操作内容"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      acnumberinput: '',
      ordersnumberinput: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()()
              const start = new Date()()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()()
              const start = new Date()()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()()
              const start = new Date()()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: [
        {
          date: '2020-05-20 13:14:52',
          acnumber: 'admin',
          operation: '登录'
        },
        {
          date: '2020-05-20 13:14:52',
          acnumber: 'admin',
          operation: '退出登录'
        },
        {
          date: '2020-05-20 13:14:52',
          acnumber: 'admin',
          operation:
            '修改权限: {对象: test},{内容: 删除->[人员管理],新增->[权限管理]})'
        },
        {
          date: '2020-05-20 13:14:52',
          acnumber: 'admin',
          operation: ''
        }
      ],
      value1: '',
      value2: ''
    }
  },
  methods: {
    getLogList (type, value) {
      var that = this
      axios
        .get('http://api.25cl.cn/project/bms/getLogList', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          },
          params: {
            type: type,
            value: value
          }
        })
        .then((res) => {
          that.tableData = res.data
        })
    },
    getLogListconsole () {
      console.log(this.value2)
    }
  },
  mounted () {
    this.getLogList(0, 10)
  }
}
</script>
