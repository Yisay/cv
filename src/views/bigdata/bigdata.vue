
<template>
  <div style="width: 100%; height: 100%; z-index: -2">
    <!--头部-->
    <div
      style="
        position: absolute;
        margin-left: -150px;
        left: 50%;
        top: 0px;
        text-align: center;
        background-color: #00000050;
        z-index: 1000;
        width: 300px;
        color: #fff;
        height: 48px;
        font-size: 24px;
      "
    >
      环境监测大数据平台
    </div>

    <!--左侧-->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 20px;
        color: #fff;
        width: 280px;
        z-index: 999;
      "
    >
    <div class="flex">
      <el-menu
        default-active="/"
        :router="true"
        style="width: 120px; height: 20px; background-color: #00000050"
      >
        <el-menu-item
          index="/"
          style="
            width: 120px;
            height: 20px;
            background-color: #00000050;
            line-height: 20px;
          "
          >返回主页</el-menu-item
        >
      </el-menu>
      <el-popover
        placement="top-start"
        title="操作指南"
        width="240"
        trigger="click"
      >
      <div style="padding:8px">
        <div class="font14" style="text-indent: 1em;">鼠标左键点击:放大地图、查看设备最新一条数据。</div>
        <div class="font14" style="text-indent: 1em;">鼠标右键点击：缩小还原地图。</div>
        <div class="font14" style="text-indent: 1em;">鼠标滑动至设备：查看设备名及经纬度。</div>
        <div class="font14" style="text-indent: 1em;">左侧显示排行榜及范围选取单一设备某时间段数据。</div>
      </div>

        <el-button slot="reference" style="
            width: 120px;
            height: 20px;
            border: 0;
            background-color: #00000050;
            line-height: 20px;
            padding:0px;
          ">查看操作</el-button>
      </el-popover>
      </div>
      <div
        style="
          min-width: 280px;
          background-color: #00000050;
          margin: 8px;
          padding: 8px;
          font-size: 18px;
        "
      >
        监测点总数:1707台
      </div>
      <div class="flex" style="margin: 4px; padding: 4px">
        <div
          class="flex"
          style="
            background-color: #00000000;
            width: 63px;
            height: 360px;
            flex-direction: column;
          "
        >
          <el-button
            v-for="value in typename"
            :key="value"
            type=""
            @click="selectTop(value)"
            style="
              color: #fff;
              border-radius: 0px;
              background-color: #00000000;
              width: 63px;
              flex: 1;
              margin: 0px;
              padding: 8px 12px;
            "
            >{{ value }}</el-button
          >
        </div>
        <div
          style="
            background-color: #00000050;
            width: 220px;
            padding: 2px;
            min-height: 300px;
          "
        >
          <div class="flex" style="margin-top: 16px">
            <a
              style="
                flex: 1;
                font-size: 16px;
                margin-bottom: 4px;
                padding: 4px 0px;
                border-bottom: 1px solid red;
              "
              >月平均 {{ sortType }} 指数 TOP 10</a
            >
            <div style="width: 20px; padding: 3px 0px; font-size: 18px">
              <i
                v-show="changeSort == 1"
                class="el-icon-bottom"
                style="font-weight: 1000; color: #f00"
                @click="changeSort = 0"
              />
              <i
                v-show="changeSort == 0"
                class="el-icon-top"
                style="font-weight: 1000; color: #0f0"
                @click="changeSort = 1"
              />
            </div>
          </div>
          <div v-if="dataSort.length > 0" style="margin-top: 8px">
            <div v-for="i in 10" :key="i" style="color: #a0a0a0; margin: 8px">
              <div
                class="flex"
                v-if="changeSort == 1"
                @click="showTopdevice(dataSort[i].id)"
              >
                <div
                  style="
                    width: 120px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 8px;
                  "
                >
                  <a>{{ devices["id" + dataSort[i].id].pointname }}</a>
                </div>
                <div style="width: 100px">
                  ><a>{{ dataSort[i][sortType] }}</a>
                </div>
              </div>
              <div
                class="flex"
                v-if="changeSort == 0"
                @click="showTopdevice(dataSort[dataSort.length - i].id)"
              >
                <div
                  style="
                    width: 120px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 8px;
                  "
                >
                  <a>{{
                    devices["id" + dataSort[dataSort.length - i].id].pointname
                  }}</a>
                </div>
                <div style="width: 100px">
                  >
                  <a>{{ dataSort[dataSort.length - i][sortType] }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--右侧-->
    <div
      style="
        position: absolute;
        top: 0px;
        right: 20px;
        color: #fff;
        width: 360px;
        z-index: 999;
      "
    >
      <div
        style="
          min-width: 350px;
          background-color: #00000050;
          margin: 8px;
          padding: 8px;
          font-size: 18px;
        "
      >
        当前设备 最新数据
      </div>

      <div v-if="nowid > 0">
        <div style="width: 100%; height: 100%">
          <div
            style="
              min-width: 350px;
              background-color: #00000050;
              margin: 8px;
              padding: 8px;
              font-size: 18px;
            "
          >
            设备名：{{ devices["id" + nowid].pointname }}
          </div>
          <div
            style="
              min-width: 351px;
              background-color: #00000050;
              margin: 8px;
              padding: 8px;
              font-size: 18px;
            "
          >
            经纬度：{{ devices["id" + nowid].longi }} ,
            {{ devices["id" + nowid].lati }}
          </div>

          <div
            style="
              min-width: 351px;
              background-color: #00000050;
              margin: 8px;
              padding: 8px;
              font-size: 18px;
            "
          >
            首要污染物：{{
              devicenowdata.wuran == "_" ? "无" : devicenowdata.wuran
            }}
          </div>
          <div
            style="
              min-width: 351px;
              background-color: #00000050;
              margin: 8px;
              padding: 8px;
              font-size: 18px;
            "
          >
            数据时间：{{ devicenowdata.sendtime }}
          </div>
        </div>
        <div
          style="
            min-width: 351px;
            background-color: #00000080;
            margin: 8px;
            padding: 8px;
            font-size: 18px;
          "
        >
          <div
            style="min-width: 351px; margin: 8px; padding: 8px; font-size: 18px"
          >
            <div class="flex">
              <div id="aqiChart" style="width: 200px; height: 200px"></div>
              <div v-if="nowid > 0">
                空气质量指数<br /><a style="font-size: 18px">{{
                  devicenowdata.zhishu
                }}</a>
              </div>
            </div>
          </div>
          <div class="flex">
            <div id="coChart" style="width: 117px; height: 117px"></div>
            <div id="no2Chart" style="width: 117px; height: 117px"></div>
            <div id="so2Chart" style="width: 117px; height: 117px"></div>
          </div>
          <div class="flex">
            <div id="o3Chart" style="width: 117px; height: 117px"></div>
            <div id="pm25Chart" style="width: 117px; height: 117px"></div>
            <div id="pm10Chart" style="width: 117px; height: 117px"></div>
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div
      style="
        margin: 12px 4px;
        padding: 12px 4px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: 260px;
        width: 620px;
        z-index: 999;
      "
    >
      <div
        class="oneDeviceSelect flex"
        style="
          background-color: #00000050;
          height: 40px;
          padding: 8px;
          padding-top: 16px;
        "
      >
        <el-cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          filterable
          :show-all-levels="false"
          style="z-index: 9999"
        ></el-cascader>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          format="yyyy-MM-dd HH"
          value-format="yyyy-MM-dd HH"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
        <el-button
          type=""
          style="background-color: #00000000; padding: 6px"
          size="small"
          @click="getDeviceData"
          >查询</el-button
        >
      </div>
      <div
        id="oneDevice"
        style="background-color: #00000050; height: 200px; width: 620px"
      ></div>
    </div>
    <div
      id="map_container"
      style="
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
      "
    ></div>
  </div>
</template>

<script>
/**
 * vue
 * 部分
 * 定位
 * *************************************************************
 * *************************************************************
 * *************************************************************
 * *************************************************************
 * *************************************************************
 * *************************************************************
 */
import axios from 'Axios'
import echarts from 'echarts'
export default {
  data () {
    return {
      open: false,
      isClose: false,
      citys: [],
      map: '',
      dataSort: [],
      deviceinfo: [],
      devices: [],
      view: '',
      nowid: 0,
      devicenowdata: '',
      heatmap: '',
      sortType: 'o3',
      changeSort: 1,
      deviceSelectData: [[]],
      typeMax: {
        SUMT: 60,
        SUMH: 100,
        SUMI1: 50,
        SUMI2: 50,
        SUMI3: 50,
        SUMI4: 50,
        SUMV1: 50,
        SUMV2: 50
      },
      typename: ['aqi', 'pm25', 'pm10', 'co', 'no2', 'so2', 'o3'],
      options: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近24小时',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      aqiChart: '',
      coChart: '',
      o3Chart: '',
      no2Chart: '',
      so2Chart: '',
      pm25Chart: '',
      pm10Chart: ''
    }
  },
  mounted () {
    this.map = new BMapGL.Map('map_container') // 创建Map实例
    this.map.centerAndZoom(new BMapGL.Point(105, 32), 6) // 初始化地图,设置中心点坐标和地图级别
    this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    this.map.setHeading(0)
    this.map.setTilt(0)
    this.map.setMapStyleV2({
      styleId: 'f526ddb5729c824048903dda04454f2e'
    })
    this.view = new mapvgl.View({
      map: this.map
    })
    this.changeCity()
    this.getgroup()
  },
  methods: {
    getgroup () {
      let that = this
      axios.get('http://api.25cl.cn/project/Bigdata/getgroup').then((res) => {
        // console.log(res.data)
        // console.log(that.options)
        that.options = res.data
      })
    },
    getDeviceData () {
      let that = this
      that.nowid = that.value[1]
      that.selectNowData()
      that.deviceSelectData['aqi'] = []
      that.deviceSelectData['co'] = []
      that.deviceSelectData['no2'] = []
      that.deviceSelectData['o3'] = []
      that.deviceSelectData['pm10'] = []
      that.deviceSelectData['pm2.5'] = []
      that.deviceSelectData['so2'] = []
      that.deviceSelectData['sendtime'] = []
      // console.log(that.value)
      // console.log(that.value2[0])
      axios
        .get('http://api.25cl.cn/project/bigdata/getDeviceData', {
          params: {
            id: that.value[1],
            starttime: that.value2[0],
            endtime: that.value2[1]
          }
        })
        .then((res) => {
          // console.log(res.data)
          res.data.forEach((v) => {
            that.deviceSelectData['aqi'].push(v['aqi'] === '_' ? 0 : v['aqi'])
            that.deviceSelectData['co'].push(v['co'] === '_' ? 0 : v['co'])
            that.deviceSelectData['no2'].push(v['no2'] === '_' ? 0 : v['no2'])
            that.deviceSelectData['o3'].push(v['o3'] === '_' ? 0 : v['o3'])
            that.deviceSelectData['pm10'].push(
              v['pm10'] === '_' ? 0 : v['pm10']
            )
            that.deviceSelectData['pm2.5'].push(
              v['pm25'] === '_' ? 0 : v['pm25']
            )
            that.deviceSelectData['so2'].push(v['so2'] === '_' ? 0 : v['so2'])
            that.deviceSelectData['sendtime'].push(
              v['sendtime'] === '_' ? 0 : v['sendtime']
            )
            // console.log(that.deviceSelectData)
            that.map.centerAndZoom(new BMapGL.Point(102, 34), 6)
            setTimeout(function () {
              that.map.centerAndZoom(
                new BMapGL.Point(
                  that.devices['id' + that.value[1]].longi,
                  that.devices['id' + that.value[1]].lati
                ),
                18
              )
            }, 3000)

            that.canve()
          })
        })
    },
    changeCity () {
      var that = this
      var data = []
      axios
        .get('http://api.25cl.cn/project/bigdata/selectDeviceInfo')
        .then((res) => {
          for (var randomCount in res.data) {
            that.devices['id' + res.data[randomCount].id] =
              res.data[randomCount]
            data.push({
              geometry: {
                type: 'Point',
                coordinates: [
                  parseFloat(res.data[randomCount].longi),
                  parseFloat(res.data[randomCount].lati)
                ]
              },
              message: {
                body: res.data[randomCount].pointname
              }
            })
          }
          // console.log(data)
          var layer = new mapvgl.IconLayer({
            width: 14,
            height: 14,
            // offset: [0, 0],
            icon: '/static/img/dy.png',
            enablePicked: true, // 是否可以拾取
            selectedIndex: -1, // 选中项
            selectedColor: '#ff0000', // 选中项颜色
            autoSelect: true, // 根据鼠标位置来自动设置选中项
            pick: (e) => {
              console.log(e)
            },
            onClick: (e) => {
              // 点击事件
              that.nowid = e.dataIndex + 1
              that.selectNowData()
              // console.log(e)
              if (e.dataIndex > 0) {
                that.map.centerAndZoom(
                  new BMapGL.Point(
                    e.dataItem.geometry.coordinates[0],
                    e.dataItem.geometry.coordinates[1]
                  ),
                  18
                )
              }
            },
            onMousemove: (e) => {
              if (e.dataIndex > 0) {
                // console.log(e)
                var nowdata =
                  e.dataItem.geometry.coordinates[0] +
                  ',' +
                  e.dataItem.geometry.coordinates[1]
                if (e.dataIndex > 0) {
                  var opts = {
                    width: 300, // 信息窗口宽度
                    height: 50, // 信息窗口高度
                    title: '设备信息', // 信息窗口标题
                    setContent: 'HTMLElement',
                    offset: new BMapGL.Size(0, -10)
                  }
                  var body =
                    '<div><div class="flex">地址：' +
                    e.dataItem.message.body +
                    '</div>' +
                    nowdata +
                    '</div>'
                  var infoWindow = new BMapGL.InfoWindow(body, opts)
                  that.map.openInfoWindow(
                    infoWindow,
                    new BMapGL.Point(
                      e.dataItem.geometry.coordinates[0],
                      e.dataItem.geometry.coordinates[1]
                    )
                  )
                }
              }
            },
            onRightClick: (e) => {
              that.map.centerAndZoom(new BMapGL.Point(105, 32), 6)
            }
          })
          that.view.addLayer(layer)
          layer.setData(data)

          that.map.setDefaultCursor('default')
        })
    },
    selectNowData () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/Bigdata/selectDeviceNowData', {
          params: {
            deviceId: that.nowid
          }
        })
        .then((res) => {
          that.devicenowdata = res.data[0]
          var chartarray = []
          var aqidom = document.querySelector('#aqiChart')
          var codom = document.querySelector('#coChart')
          var o3dom = document.querySelector('#o3Chart')
          var no2dom = document.querySelector('#no2Chart')
          var so2dom = document.querySelector('#so2Chart')
          var pm25dom = document.querySelector('#pm25Chart')
          var pm10dom = document.querySelector('#pm10Chart')
          var setting = []
          setting['aqi'] = { min: 0, max: 500 }
          setting['co'] = { min: 0, max: 5 }
          setting['o3'] = { min: 0, max: 150 }
          setting['no2'] = { min: 0, max: 100 }
          setting['so2'] = { min: 0, max: 60 }
          setting['pm25'] = { min: 0, max: 500 }
          setting['pm10'] = { min: 0, max: 1000 }
          chartarray['aqi'] = echarts.init(aqidom)
          chartarray['co'] = echarts.init(codom)
          chartarray['o3'] = echarts.init(o3dom)
          chartarray['no2'] = echarts.init(no2dom)
          chartarray['so2'] = echarts.init(so2dom)
          chartarray['pm25'] = echarts.init(pm25dom)
          chartarray['pm10'] = echarts.init(pm10dom)

          for (let index of Object.keys(chartarray)) {
            var option = {
              backgroundColor: '#00000000',
              series: [
                {
                  name: 'aqi',
                  type: 'gauge',
                  min: setting[index]['min'],
                  max: setting[index]['max'],
                  splitNumber: 4,
                  axisLine: {
                    // 坐标轴线
                    show: true,
                    lineStyle: {
                      width: 3,
                      color: [
                        [0.3, '#12e78c44'],
                        [0.7, '#fe810444'],
                        [1, '#dd3ee544']
                      ]
                    }
                  },
                  title: {
                    color: '#a0a0a0'
                  },
                  pointer: {
                    width: 2
                  },
                  axisTick: {
                    // 坐标轴小标记
                    length: 0 // 属性length控制线长
                  },
                  splitLine: {
                    // 分隔线
                    length: 0 // 属性length控制线长
                  },
                  detail: {
                    color: '#fff',
                    fontSize: 16,
                    rich: {}
                  },
                  data: [
                    {
                      value: that.devicenowdata[index],
                      name: index
                    }
                  ]
                }
              ]
            }
            chartarray[index].setOption(option, true)
          }
        })
    },
    getMonth () {
      var that = this
      var deviceidarr = []
      for (let index of Object.keys(that.devices)) {
        // console.log(index)
        deviceidarr.push(parseInt(index.slice(2)))
      }
      // console.log(deviceidarr)
      let params = new URLSearchParams()
      params.append('deviceId', deviceidarr)
      params.append('month', 9)
      params.append('type', that.sortType)
      // console.log(params)
      var heatpoint = []
      axios
        .post('http://api.25cl.cn/project/Bigdata/monthDatasort?', params)
        .then((res) => {
          that.dataSort = res.data
          // console.log(that.dataSort)
          for (let item of res.data) {
            heatpoint.push({
              geometry: {
                type: 'Point',
                coordinates: [
                  parseFloat(that.devices['id' + item.id].longi),
                  parseFloat(that.devices['id' + item.id].lati)
                ]
              },
              properties: {
                count: item[that.sortType]
              }
            })
          }
          // console.log(heatpoint)
          // that.heatmap = new mapvgl.HeatmapLayer({
          //   size: 20, // 单个点绘制大小
          //   max: that.typeMax[that.sortType], // 最大阈值
          //   height: 0, // 最大高度，默认为0
          //   unit: 'px', // 单位，m:米，px: 像素
          //   gradient: {
          //     // 对应比例渐变色
          //     0.0: 'rgb(50, 50, 256)',
          //     0.1: 'rgb(50, 250, 56)',
          //     0.5: 'rgb(250, 250, 56)',
          //     1.0: 'rgb(250, 50, 56)'
          //   }
          // })
          // that.view.addLayer(that.heatmap)
          // that.heatmap.setData(heatpoint)
        })
    },
    selectTop (type) {
      this.sortType = type
      this.getMonth()
    },
    showTopdevice (id) {
      this.nowid = id
      this.selectNowData()
    },
    canve () {
      let that = this
      var dom = document.querySelector('#oneDevice')
      var myChart = echarts.init(dom)
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['aqi', 'co', 'no2', 'o3', 'pm10', 'pm2.5', 'so2'],
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '6%',
          right: '6%',
          bottom: '5%',
          top: '9%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: that.deviceSelectData['sendtime'],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: '#a0a0a0'
            }
          },
          axisLabel: {
            // 坐标轴刻度标签的相关设置
            show: true,
            textStyle: {
              color: '#CFD4EB',
              fontSize: 10 // 让字体变大
            }
          },
          axisTick: {
            // y轴刻度相关设置
            show: false
          },
          splitLine: {
            // 网格线
            lineStyle: {
              color: '#a0a0a0'
            }
          }
        },
        series: [
          {
            symbol: 'none',
            name: 'aqi',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['aqi'],
            color: '#4962FC44'
          },
          {
            symbol: 'none',
            name: 'co',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['co'],
            color: '#FD9E0644'
          },
          {
            symbol: 'none',
            name: 'no2',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['no2'],
            color: '#01C2F944'
          },
          {
            symbol: 'none',
            name: 'o3',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['o3'],
            color: '#fe810444'
          },
          {
            symbol: 'none',
            name: 'pm10',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['pm10'],
            color: '#12e78c44'
          },
          {
            symbol: 'none',
            name: 'pm2.5',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['pm2.5'],
            color: '#dd3ee544'
          },
          {
            symbol: 'none',
            name: 'so2',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: that.deviceSelectData['so2'],
            color: '#4B7CF344'
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    }
  }
}
</script>
