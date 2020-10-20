<template>
  <el-container style="height: 100%">
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        style="padding-right: 20px; display: flex; justify-content: flex-end"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">个人项目demo</template>
          <el-menu-item index="/chat">网页即时聊天</el-menu-item>
          <el-menu-item index="/bigdata">大数据展示平台</el-menu-item>
          <el-menu-item index="/redog">在线爬虫</el-menu-item>
          <el-menu-item index="/bms">后台管理系统</el-menu-item>
          <el-menu-item index="/diycp">图形化html编辑器</el-menu-item>
          <el-menu-item index="/tool">工具类</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">联系我</el-menu-item>
        <el-menu-item index="/about">关于网站</el-menu-item>
      </el-menu>
    </el-header>
    <el-main
      style="
        height: 100%;
        background-image: url('https://c-ssl.duitang.com/uploads/item/202003/07/20200307001150_fVEXz.jpeg');
      "
    >
      <el-row :gutter="6" style="height: 100%">
        <el-col :span="5" style="height: 100%">
          <el-card shadow="hover" style="height: 100%; overflow-y: auto">
            <div class="avaterbox">
              <el-avatar :size="80" src="../../assets/logo.png"></el-avatar>
            </div>
            <div style="overflow-y: auto">
              <div>
                <span class="span-link font14">
                  <span class="ml-20">
                    姓名
                    <el-divider direction="vertical" />
                  </span>
                  <span style="color: #606e6">{{ myinfo.name }}</span>
                </span>
              </div>
              <div>
                <span class="span-link font14">
                  <span class="ml-20">
                    求职职位
                    <el-divider direction="vertical" />
                  </span>
                  <span style="color: #ff4040">{{ myinfo.request }}</span>
                </span>
              </div>
              <el-divider content-position="center">基本信息</el-divider>
              <div>
                <span class="span-link font14">
                  <span class="ml-20">
                    {{ myinfo.sex }}
                    <el-divider direction="vertical" />{{ myinfo.age }}
                    <el-divider direction="vertical" />{{ myinfo.address }}
                  </span>
                </span>
              </div>
              <div>
                <span class="span-link ml-20 font14"
                  >电话：{{ myinfo.phone }}</span
                >
              </div>
              <div>
                <span class="span-link ml-20 font14"
                  >邮箱：{{ myinfo.email }}</span
                >
              </div>
              <div>
                <el-divider content-position="center">自我评价</el-divider>
                <div class="font14">
                  <span>一年运维工程师经验</span>
                  <div class="ml-8" style="width: 90%">
                    <div class="span-link font14">
                      在职期间发现
                      <span style="color: #ffa600">数十起</span
                      >由程序或环境引起的bug
                      <span style="color: #60e000">并解决</span>
                    </div>
                    <div class="span-link font14">
                      我认为程序的逻辑是思维表达的过程，
                    </div>
                    <div class="span-link font14">
                      解决问题的能力就是
                      <span style="color: #a00606">清楚的逻辑</span>能力
                    </div>
                  </div>
                </div>
              </div>
              <el-divider content-position="center">总结</el-divider>
              <div style="width: 90%">
                <div class="span-link ml-8 font14">
                  工作像学习，只有不断地去扩展知识面，才能把思维发散出去。
                </div>
                <div class="span-link ml-8 mt-8 font14">
                  每个人的处事抉择里，都藏着他读过的书，走过的路
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="14" style="height: 100%">
          <el-card
            shadow="hover"
            style="height: 96%; margin: 6px; margin-top: 1%"
          >
            <el-tabs type="border-card">
              <el-tab-pane label="工作经历">
                <div style="display: flex; justify-content: space-between">
                  <div>
                    <el-link
                      :underline="false"
                      href="http://www.qianlangtech.com"
                      target="_blank"
                      >浙江钱浪信息科技有限公司<i class="el-icon-link"></i
                    ></el-link>
                  </div>
                  <div class="font14">2019年10月-2020年10月</div>
                </div>
                <div style="color: #696969">运维工程师</div>
                <ul>
                  主要工作职责:
                  <li>维护服务器稳定，</li>
                  <li>优化数据库查询代码，</li>
                  <li>协助后端编写项目接口</li>
                </ul>
                <ul>
                  主要工作成绩:
                  <li>编写运维管理工具实现数据管理智能化；</li>
                  <li>
                    根据网页操作结合云数据库响应时长优化相关数据库操作代码
                  </li>
                  <li></li>
                </ul>
                <div></div>
              </el-tab-pane>
              <el-tab-pane label="项目经历">
                <div class="font14">公司：杭州恒领科技有限公司</div>
                <div class="font14">项目：T3出行车载智能终端</div>
                <div>
                  <el-link
                    :underline="false"
                    href="http://www.hopeleadtech.com/product/adas-box/hl685"
                    target="_blank"
                    >产品名称：HL685 驾驶安全辅助监控终端<i
                      class="el-icon-link"
                  /></el-link>
                </div>
                <div>
                  <el-link
                    :underline="false"
                    href="https://www.t3go.cn/"
                    target="_blank"
                    >应用场景：T3出行<i class="el-icon-link"
                  /></el-link>
                </div>
                <div class="font14">
                  主要负责内容：TBOX开发板功能测试主要涵盖（modbus协议，MQTT通讯。开发板组件功能测试）
                </div>
                <el-divider></el-divider>
                <div class="font14">公司：浙江钱浪智能信息科技有限公司</div>
                <div class="font14">项目：国家环境腐蚀大数据平台</div>
                <div class="font14">
                  主要负责内容：编写数据库运维管理工具，数据方面（实现数据成图成表，选取设备数据导出）。设备方面（监听设备端口，下发指令给设备）
                </div>
              </el-tab-pane>
              <el-tab-pane label="技能及证书">
                <div>证书:</div>
                <div class="flex ml-10">
                  <div>
                    <span class="span-link">省计算机二级(C++方向)</span>
                  </div>
                  <div>
                    <el-divider direction="vertical"></el-divider>
                  </div>
                  <div>
                    <span class="span-link">ORACLE JAVA SE6</span>
                  </div>
                </div>
                <div class="mt-8">技能：</div>
                <div>
                  <div class="span-link">语言类</div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 160px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      java
                    </div>
                  </div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 196px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      php
                    </div>
                  </div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 140px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      python
                    </div>
                  </div>
                </div>
                <div>
                  <div class="span-link">框架类</div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 160px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      tp5
                    </div>
                  </div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 186px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      vue
                    </div>
                  </div>
                  <div class="el-progress el-progress--circle">
                    <div
                      class="el-progress-circle"
                      style="height: 70px; width: 70px"
                    >
                      <svg viewBox="0 0 126 126">
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#e5e9f2"
                          stroke-width="6"
                          fill="none"
                          style="stroke-dasharray: 295.31px, 295.31px"
                        />
                        <path
                          d="M 63 63 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
                          stroke="#20a0ff"
                          fill="none"
                          stroke-width="15"
                          style="stroke-dasharray: 140px, 295.31px"
                        />
                      </svg>
                    </div>
                    <div
                      class="el-progress__text"
                      style="font-size: 14px; top: 50%"
                    >
                      python
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="教育经历">
                <div>
                  <el-divider content-position="left">
                    <el-link
                      :underline="false"
                      href="http://www.lyun.edu.cn"
                      target="_blank"
                      >龙岩学院<i class="el-icon-link"></i
                    ></el-link>
                  </el-divider>
                  <div class="font14">专业：物联网工程</div>
                  <div class="font14">时间：2015-2019</div>
                  <div class="font14">主修学科：C++,射频识别,单片机,</div>
                </div>
                <div>
                  <el-divider content-position="left">
                    <el-link
                      :underline="false"
                      href="http://www.must.edu.tw"
                      target="_blank"
                      >台湾明新科技大学<i class="el-icon-link"></i
                    ></el-link>
                  </el-divider>
                  <div class="font14">专业：资讯工程</div>
                  <div class="font14">时间：2017-2018</div>
                  <div class="font14">主修学科：</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="实习经历">
                <el-link
                  :underline="false"
                  href="http://www.hopeleadtech.com/"
                  target="_blank"
                  style=""
                  >公司：杭州恒领科技有限公司<i class="el-icon-link"></i
                ></el-link>
                <div class="font14">职位：软件测试工程师</div>
                <div class="font14">任期：2019年5月-2019年7月</div>
                <ul>
                  主要工作职责：
                  <li>编写测试文档</li>
                  <li>测试</li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="社团经历">定时任务补偿</el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col :span="5" style="height: 100%">
          <div style="height: 100%; overflow-y: auto">
            <el-card class="box-card" shadow="hover">
              <div class="span-link">来自：{{ city }}的访客,欢迎您</div>
            </el-card>
            <el-card class="box-card mt-8" shadow="hover">
              <div>
                <div class="span-link">
                  <i class="el-icons-chengshi font20"></i>
                  杭州 {{ weaterday }}
                </div>
                <div class="span-link">天气：{{ dayType }}</div>
                <div style="display: flex">
                  <div class="el-progress el-progress--dashboard">
                    <div
                      class="el-progress-circle"
                      style="height: 100px; width: 100px"
                    >
                      <svg viewBox="0 0 100 100">
                        <path
                          d="M 50 50 m 0 45 a 45 45 0 1 1 0 -90 a 45 45 0 1 1 0 90 "
                          stroke="#e5e9f2"
                          stroke-width="8.6"
                          fill="none"
                          class="el-progress-circle__track"
                          style="
                            stroke-dasharray: 212.058px, 282.743px;
                            stroke-dashoffset: -35.3429px;
                          "
                        />
                        <path
                          d="M 50 50 m 0 45 a 45 45 0 1 1 0 -90 a 45 45 0 1 1 0 90"
                          :stroke="wenduColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-width="8.6"
                          class="el-progress-circle__path"
                          :style="wendustyle"
                        />
                      </svg>
                    </div>
                    <div class="span-link el-progress__text">
                      <i class="el-icons-wendu" />
                      {{ wendu }}℃
                    </div>
                  </div>
                  <div class="el-progress el-progress--dashboard ml-8">
                    <div
                      class="el-progress-circle"
                      style="height: 100px; width: 100px"
                    >
                      <svg viewBox="0 0 100 100">
                        <path
                          d="M 50 50 m 0 45 a 45 45 0 1 1 0 -90 a 45 45 0 1 1 0 90 "
                          stroke="#e5e9f2"
                          stroke-width="8.6"
                          fill="none"
                          class="el-progress-circle__track"
                          style="
                            stroke-dasharray: 212.058px, 282.743px;
                            stroke-dashoffset: -35.3429px;
                          "
                        />
                        <path
                          d="M 50 50 m 0 45 a 45 45 0 1 1 0 -90 a 45 45 0 1 1 0 90"
                          stroke="#20a0ff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-width="8.6"
                          class="el-progress-circle__path"
                          :style="shidustyle"
                        />
                      </svg>
                    </div>
                    <div class="span-link el-progress__text">
                      <i class="el-icons-shidu" />
                      {{ shidu }}%
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div class="span-link">
                    <i class="el-icons-maxwendu font20" />
                    最{{ maxwendu }}
                  </div>
                  <div class="span-link ml-8">
                    <i class="el-icons-minwendu font20" />
                    最{{ minwendu }}
                  </div>
                </div>
                <div class="span-link font14 mt-8">
                  数据更新时间{{ weaterUpDateTime }}
                </div>
              </div>
            </el-card>
            <el-card class="box-card mt-8" shadow="hover">
              <div class="span-link">当前时间：</div>
              <div style="height: 100px; width: 240px; margin: 10px">
                <div
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  class="el-progress el-progress--dashboard"
                >
                  <div style="height: 80px; width: 240px">
                    <svg viewBox="0 0 240 80">
                      <path
                        d="m4,80.453125c16,-30 53,-74 116,-73.000002c63.36464,1 101,42 116,73"
                        stroke="#e5e9f2"
                        stroke-width="7"
                        fill="none"
                      />
                      <linearGradient
                        id="sky"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: #64f38c; stop-opacity: 1"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: #f79d00; stop-opacity: 1"
                        />
                      </linearGradient>
                      <linearGradient
                        id="night"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: #f8cdda; stop-opacity: 1"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: #1d2b64; stop-opacity: 1"
                        />
                      </linearGradient>
                      <path
                        d="m4,80.453125c16,-30 56,-73 116,-73.000002c63.36464,1 101,40 116,80"
                        :stroke="timestyle"
                        fill="none"
                        stroke-linecap="round"
                        stroke-width="8.6"
                        class="el-progress-circle__path"
                        :style="nowtimesvg"
                      />
                    </svg>
                  </div>
                  <div class="span-link el-progress__text" style="top: 80%">
                    <i class="el-icons-shizhong" />
                    {{ gettime }}
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div
                    class="span-link"
                    :class="timestarticon"
                    title="日出时间"
                  >
                    {{ timestart }}
                  </div>
                  <div class="span-link" :class="timeendicon" title="日落时间">
                    {{ timeend }}
                  </div>
                </div>
              </div>
              <div class="span-link">{{ houremessage }}</div>
            </el-card>
            <el-card class="box-card mt-8" shadow="hover">
              意见/建议箱
              <el-popover
                placement="top-start"
                title="历史建议"
                width="300"
                trigger="click"
              >
                <div v-for="(item, index) in suggestions" :key="index">
                  <div>
                    <div class="flex">
                      <div style="flex: 1">Q:{{ item.suggestion }}</div>
                      <div style="width: 80px">
                        {{ item.suggestiontime }}
                      </div>
                    </div>
                    <div
                      class="flex"
                      style="font-size: 12px; margin-left: 12px"
                    >
                      A:
                      <div>
                        {{ item.result }}
                      </div>
                      <div style="padding-left: 10px; width: 80px">
                        {{ item.resulttime }}
                      </div>
                    </div>
                  </div>
                </div>
                <el-button slot="reference" style="padding: 0" size="small"
                  >历史</el-button
                >
              </el-popover>
              <el-input type="textarea" v-model="textarea"></el-input>
              <el-button style="width: 100%">提交</el-button>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      city: '',
      activeIndex: '/',
      activeIndex2: '/',
      weaterday: '',
      weaterUpDateTime: '',
      wendu: '',
      maxwendu: '',
      minwendu: '',
      wenduColor: '#fff000',
      shidu: 0,
      wendustyle: '',
      shidustyle: '',
      dayType: '',
      textarea: '', // 时间组件
      gettime: '',
      timestart: '',
      timeend: '',
      timestyle: 'url(#sky)',
      timestarticon: 'el-icon-sunrise',
      timeendicon: 'el-icon-sunset',
      nowtimesvg: 0,
      oldhoure: 0,
      houremessage: '',
      myinfo: '',
      suggestions: [
        {
          suggestion: '页面美化',
          suggestiontime: '123456789',
          result: '已优化',
          resulttime: '123456789'
        },
        {
          suggestion: '简介详细',
          suggestiontime: '123456789',
          result: '已修改',
          resulttime: '123456789'
        }
      ]
    }
  },
  methods: {
    index_init () {
      let that = this
      let params = new URLSearchParams()
      params.append('keys', JSON.stringify({ keys: ['myinfo', 'myinfo1'] }))
      axios.post('http://api.25cl.cn/index/index', params).then((res) => {
        console.log(JSON.parse(res.data.myinfo))
        that.myinfo = JSON.parse(res.data.myinfo)
        console.log(that.myinfo)
      })
    },
    citySN () {
      var that = this // eslint-disable-next-line no-undef
      that.city = lc
      that.citytianqi()
    },
    requestMessageBoard () {
      console.log('requestMessageBoard')
    },
    getTime () {
      var that = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      let ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      let timestart = new Date(
        yy + '-' + mm + '-' + dd + ' ' + that.timestart + ':00'
      ).getTime()
      let timeend = new Date(
        yy + '-' + mm + '-' + dd + ' ' + that.timeend + ':00'
      ).getTime()
      var timestamp = new Date().getTime()
      that.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
      let jindu = (timestamp - timestart) / (timeend - timestart)
      if (jindu > 1) {
        that.timestart = that.timeend
        that.timeend = '23:59'
        that.timestyle = 'url(#night)'
        that.timestarticon = 'el-icons-wuye'
        that.timeendicon = 'el-icons-shuimian'
      }
      if (hh !== that.oldhoure) {
        if (hh < 4) {
          that.houremessage = '夜已深了，注意休息~'
        } else if (hh < 8) {
          that.houremessage = '早上好！新的一天开始咯~'
        } else if (hh < 12) {
          that.houremessage = '上午好！'
        } else if (hh < 13) {
          that.houremessage = '中午好！午饭记得按时吃哦.'
        } else if (hh < 17) {
          that.houremessage = '下午好！加油努力工作！'
        } else if (hh < 19) {
          that.houremessage = '傍晚好,吃点好吃的犒劳自己吧'
        } else if (hh < 22) {
          that.houremessage = '晚上好,今天收获了些什么呢'
        } else {
          that.houremessage = '深夜了,还在努力工作吗?'
        }
      }
      that.nowtimesvg =
        'stroke-dasharray: ' +
        ((timestamp - timestart) / (timeend - timestart)) * 288 +
        'px, 290px'
    },
    currentTime () {
      setInterval(this.getTime, 1000)
    },
    wenduColorMethod (percentage) {
      if (percentage < 22) {
        return '#0000ff'
      } else if (percentage < 36) {
        return '#006aaa'
      } else if (percentage < 50) {
        return '#6aaa00'
      } else if (percentage < 64) {
        return '#6aaa00'
      } else if (percentage < 79) {
        return '#ff6a00'
      } else {
        return '#ff0000'
      }
    },
    citytianqi () {
      var that = this
      axios
        .get('http://api.25cl.cn/project/getweather', {
          params: {
            city: that.city
          }
        })
        .then(function (res) {
          var weather = res.data
          that.weaterUpDateTime = weather.updatetime
          that.weaterday = weather.forecast.weather[0].date
          that.dayType = weather.forecast.weather[0].day.type
          that.maxwendu = weather.forecast.weather[0].high
          that.minwendu = weather.forecast.weather[0].low
          that.timestart = weather.sunrise_1
          that.timeend = weather.sunset_1
          var wendu = weather.wendu
          that.wendu = wendu
          that.wendustyle =
            'stroke-dasharray: ' +
            4.1 * wendu +
            'px, 282.743px; stroke-dashoffset: -35.3429px;'
          if (wendu < 15) {
            that.wenduColor = '#409eff'
          } else if (wendu < 28) {
            that.wenduColor = '#5cb87a'
          } else if (wendu < 34) {
            that.wenduColor = '#e6a23c'
          } else {
            that.wenduColor = '#ff4949'
          }
          that.shidu = Number(
            weather.shidu.substring(0, weather.shidu.length - 1)
          )
          that.shidustyle =
            'stroke-dasharray: ' +
            2.05 * that.shidu +
            'px, 282.743px; stroke-dashoffset: -35.3429px;'
          console.log('weather.updatetime:', weather.updatetime)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    mformat (s) {
      return '掌握程度'
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    this.index_init()
    this.citySN()
    this.currentTime()
  }
}
</script>
