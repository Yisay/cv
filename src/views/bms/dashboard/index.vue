<template>
  <div id="car">
    <el-row id="mtop" :gutter="20" style="margin-bottom:10px">
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icon-postcard"></i>车牌号
            </div>
            <div>{{carname}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icon-map-location"></i>经纬度
            </div>
            <div>{{lnglat}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icon-stopwatch"></i>车速
            </div>
            <div>{{speed}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icon-odometer"></i>采集速率
            </div>
            <div>2s/条</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icons-wendu"></i>水温
            </div>
            <div>{{water}}</div>
          </div>
        </el-card>

        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icons-jiayouzhan"></i>油量
            </div>
            <div>{{oil}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" style="height:300px">
        <div id="map" style="height:100%"></div>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;">
            <i style="font-size:24px" class="el-icons-jiankong2" />
          </div>
          <div>
            <div>
              <i class="el-icons-baojingxiaoxi"></i>报警信息
            </div>
            <div>2条</div>
          </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>指示灯信息</span>
          </div>
          <div style="height:36px;">
            <i class="el-icons-zuozhuanxiangdeng"></i>
            左转
          </div>
          <div style="height:36px;">
            <i class="el-icons-chekuang_chedeng_shuangshan" />
            双闪
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
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
      value1: '',
      value2: ''
    }
  },
  methods: {
    countdata () {
      var dom = document.getElementById('dingdancount')
      var myChart = echarts.init(dom)
      var dataAxis = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23'
      ]
      var data = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220,
        149,
        210,
        122,
        120
      ]
      var data1 = [
        50,
        2,
        10,
        12,
        102,
        150,
        254,
        120,
        153,
        120,
        145,
        180,
        169,
        122,
        133,
        334,
        198,
        123,
        125,
        220,
        149,
        210,
        122,
        120
      ]
      var data2 = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220,
        149,
        210,
        122,
        120
      ]

      var option = {
        grid: {
          left: 40,
          right: 1,
          top: 10,
          bottom: 10
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            stack: '广告',

            data: data
          },
          {
            type: 'bar',
            stack: '广告',

            data: data1
          },
          {
            type: 'bar',
            stack: '广告',

            data: data2
          }
        ]
      }
      // Enable data zoom when user click bar.
      var zoomSize = 8
      myChart.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]
        })
      })

      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    },
    ordersnumbersend () {
      console.log(this.ordersnumberinput)
    },
    lujing () {
      console.log('调用车辆id 起始结束时间 查询')
    }
  },
  mounted () {
    this.countdata()
  }
}
</script>
