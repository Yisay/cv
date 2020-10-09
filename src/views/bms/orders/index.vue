<template>
  <div>
    <el-row id="mtop" :gutter="20" style="margin-bottom:10px">
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;font-size:32px">
            <i class="el-icon-document" />
          </div>
          <div>
            <div>今日总订单</div>
            <div>
              <a>300</a>
              <b>
                <a style="font-size: 0.67em;">
                  环比+5%
                  <i class="el-icon-top-right" style="color:red" />
                </a>
              </b>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;font-size:32px">
            <i class="el-icon-document-checked" />
          </div>
          <div>
            <div>已完成订单</div>
            <div>
              <a>100</a>
              <b>
                <a style="font-size: 0.67em;">
                  环比+5%
                  <i class="el-icon-top-right" style="color:red" />
                </a>
              </b>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;font-size:32px">
            <i class="el-icon-loading" />
          </div>
          <div>
            <div>进行中订单</div>
            <div>
              <a>100</a>
              <b>
                <a style="font-size: 0.67em;">
                  环比+5%
                  <i class="el-icon-top-right" style="color:red" />
                </a>
              </b>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" body-style="display:flex" shadow="hover">
          <div style="height:36px;width:36px;font-size:32px">
            <i class="el-icon-document-delete" />
          </div>
          <div>
            <div>已取消订单</div>
            <div>
              <a>100</a>
              <b>
                <a style="font-size: 0.67em;">
                  环比-5%
                  <i class="el-icon-bottom-right" style="color:green" />
                </a>
              </b>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" style="margin-bottom:15px">
      <div slot="header" class="clearfix">
        <span>订单统计表</span>
      </div>
      <div id="dingdancount" style="height:300px;width:100%"></div>
    </el-card>
    <el-card class="box-card" style="height:680px;margin-bottom:6px">
      <div slot="header" class="clearfix">
        <span>查询订单</span>
      </div>
      <el-row type="flex" class="row-bg" style="margin-bottom:6px">
        <el-input
          placeholder="请输入订单号"
          v-model="ordersnumberinput"
          clearable
          style="margin-right:20px"
        >
          <template slot="prepend">订单号查询</template>
          <el-button slot="append" icon="el-icon-search" @click="ordersnumbersend"></el-button>
        </el-input>
        <div class="el-input el-input-group" style="max-height:30px">
          <div class="el-input-group__prepend" style="height:30px">日期查询</div>
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="line-height:30px;width:100%;min-width:346px;padding:1;
   border-radius: 0px;"
          ></el-date-picker>
          <div class="el-input-group__append" style="height:30px">
            <el-button icon="el-icon-search" @click="ordersnumbersend"></el-button>
          </div>
        </div>
      </el-row>
      <div id="selectOrders" style="height:550px;width:100%;overflow:auto">
        <el-collapse accordion>
          <el-collapse-item title="订单号:123456" name="1">
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>系统派发订单</p>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>到达上车地点 120.123456,30.123456
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认乘客上车
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      乘客
                      <el-tag>张小红</el-tag>确认上车
                    </p>
                    <p>
                      <el-tag>张小红</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>行程进行中</p>
                    <el-link type="info" @click="lujing">点击查询路线图</el-link>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认乘客到达目的地
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <p>
                    乘客
                    <el-tag>张小红</el-tag>确认行程结束
                  </p>
                  <p>
                    <el-tag>张小红</el-tag>确认于 2020/5/20 9:30:15
                  </p>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
          <el-collapse-item title="订单号:123456" name="2">
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>系统派发订单</p>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>到达上车地点 120.123456,30.123456
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认乘客上车
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      乘客
                      <el-tag>张小红</el-tag>确认上车
                    </p>
                    <p>
                      <el-tag>张小红</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>行程进行中</p>
                    <el-link type="info" @click="lujing">点击查询路线图</el-link>
                  </el-card>
                </el-timeline-item>

                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <el-card>
                    <p>
                      司机
                      <el-tag>王小明</el-tag>确认乘客到达目的地
                    </p>
                    <p>
                      <el-tag>王小明</el-tag>确认于 2020/5/20 9:30:15
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2020/5/20 9:30:15" placement="top">
                  <p>
                    乘客
                    <el-tag>张小红</el-tag>确认行程结束
                  </p>
                  <p>
                    <el-tag>张小红</el-tag>确认于 2020/5/20 9:30:15
                  </p>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
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
