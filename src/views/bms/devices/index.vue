<template>
  <div>
    <el-row type="flex" :gutter="10" style="margin-bottom:6px">
      <el-col :span="7">
        <el-cascader placeholder="设备名称" :options="options" filterable style="width:100%"></el-cascader>
      </el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          style="width:100%"
        ></el-date-picker>
      </el-col>
      <el-col :span="8">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card" style="margin-bottom:6px">
      <div slot="header" class="clearfix">
        <span>车辆路径图</span>
      </div>
      <div id="oldlujing" style="height:300px;width:100%"></div>
    </el-card>
    <el-card class="box-card" style="margin-bottom:6px">
      <div slot="header" class="clearfix">
        <span>信息上传数量表</span>
      </div>
      <div id="datacunt" style="height:300px;width:100%"></div>
    </el-card>
    <el-card class="box-card" style="margin-bottom:6px">
      <div slot="header" class="clearfix">
        <span>车辆信息图</span>
      </div>
      <div ref="cardata" style="height:300px;width:100%"></div>
    </el-card>
  </div>
</template>

<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
import echarts from 'echarts'
export default {
  data () {
    return {
      options: [],
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
    oldlujing () {
      var map = new AMap.Map('oldlujing', {
        mapStyle: 'amap://styles/light',
        resizeEnable: true,
        rotateEnable: false,
        pitchEnable: false,
        zoom: 17,
        viewMode: '3D', // 开启3D视图,默认为关闭
        expandZoomRange: true,
        zooms: [3, 20],
        center: [116.333926, 39.997245]
      })
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }
        var emptyLineStyle = {
          lineWidth: 0,
          fillStyle: null,
          strokeStyle: null,
          borderStyle: null
        }
        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          // autoSetFitView:false,
          map: map, // 所属的地图实例
          getPath: function (pathData, pathIndex) {
            return pathData.path
          },
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            return null
          },
          renderOptions: {
            // 将点、线相关的style全部置emptyLineStyle
            pathLineStyle: emptyLineStyle,
            pathLineSelectedStyle: emptyLineStyle,
            pathLineHoverStyle: emptyLineStyle,
            keyPointStyle: emptyLineStyle,
            startPointStyle: emptyLineStyle,
            endPointStyle: emptyLineStyle,
            keyPointHoverStyle: emptyLineStyle,
            keyPointOnSelectedPathLineStyle: emptyLineStyle
          }
        })
        window.pathSimplifierIns = pathSimplifierIns
        pathSimplifierIns.setData([
          {
            name: '测试',
            path: [
              [116.405289, 39.904987],
              [113.964458, 40.54664],
              [111.47836, 41.135964],
              [108.949297, 41.670904],
              [106.380111, 42.149509],
              [103.774185, 42.56996],
              [101.135432, 42.930601],
              [98.46826, 43.229964],
              [95.777529, 43.466798],
              [93.068486, 43.64009],
              [90.34669, 43.749086],
              [87.61792, 43.793308]
            ]
          }
        ])
        // initRoutesContainer (d)
        function onload () {
          pathSimplifierIns.renderLater()
        }
        function onerror (e) {
          alert('图片加载失败！')
        }
        var navg1 = pathSimplifierIns.createPathNavigator(0, {
          loop: true,
          speed: 60,
          pathNavigatorStyle: {
            width: 20,
            height: 20,
            //  使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(
              './imgs/plane.png',
              onload,
              onerror
            ),
            strokeStyle: null,
            fillStyle: null,
            //  经过路径的样式
            pathLinePassedStyle: {
              lineWidth: 6,
              strokeStyle: '#efefef',
              dirArrowStyle: {
                stepSpace: 15,
                strokeStyle: '#000000'
              }
            }
          }
        })
        navg1.start()
      })
    },
    countdata () {
      var dom = document.getElementById('datacunt')
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
      var yMax = 500
      var dataShadow = []
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax)
      }
      var option = {
        grid: {
          left: 30,
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
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.03)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: '#6389fa'
                },
                {
                  offset: 0.36,
                  color: '#8cccfd'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#6389fa'
                  },
                  {
                    offset: 0.2,
                    color: '#6389fa'
                  }
                ])
              }
            },
            data: data
          }
        ]
      }
      // Enable data zoom when user click bar.
      var zoomSize = 8
      myChart.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        })
      })
      myChart.setOption(option, true)
    }
  },
  mounted () {
    this.oldlujing()
    this.countdata()
  }
}
</script>
