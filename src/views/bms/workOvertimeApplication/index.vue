<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="9">
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col :span="24">
            <el-card shadow="hover" style="height:184px;font-size:14px">
              <div style="font-size:15px;margin-bottom:8px">
                <b>当月加班时长统计</b>
              </div>
              <div>
                <el-row>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>工作</div>
                    <div style="font-size:24px">18.0小时</div>
                  </el-col>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>双休</div>
                    <div style="font-size:24px">9小时</div>
                  </el-col>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>节假</div>
                    <div style="font-size:24px">4小时</div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col>
            <el-card shadow="hover" style="height:300px">
              <div style="font-size:15px;margin-bottom:8px">
                <b>加班申请单</b>
              </div>
              <el-form size="small" label-width="80px">
                <el-form-item label="加班原因">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="加班时间">
                  <div class="block">
                    <el-date-picker
                      style="width:100%;font-size:12px"
                      v-model="value2"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right"
                    ></el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="审核人">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">申请</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="15">
        <el-card class="box-card" style="height:620px">
          <div slot="header">
            <div class="block">
              <span>申请历史</span>
              <el-date-picker size="mini" v-model="value2" type="month" placeholder="选择月"></el-date-picker>
            </div>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>

          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                2020/06/23 18:30:00 ~ 2020/06/31 23:30:00
                <i class="el-icon-success" style="color:green"></i>
              </template>
              <el-steps :active="2">
                <el-step title="提交审核" description="原因:项目需求加班"></el-step>
                <el-step title="等待处理" description="XXX已通过,XXX已通过"></el-step>
                <el-step title="处理结果" description="通过"></el-step>
              </el-steps>
              <el-button size="small">取消</el-button>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                2020/06/25 18:30:00 ~ 2020/06/31 21:30:00
                <i class="el-icon-success" style="color:green"></i>
              </template>
              <el-steps :active="3">
                <el-step title="提交审核" description="原因:项目需求加班"></el-step>
                <el-step title="等待处理" description="XXX已通过,XXX已通过"></el-step>
                <el-step title="处理结果" description="通过"></el-step>
              </el-steps>
              <el-button size="small">取消</el-button>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                2020/06/30 18:30:00 ~ 2020/06/31 19:30:00
                <i class="el-icon-loading" style="color:orange"></i>
              </template>
              <el-steps :active="2">
                <el-step title="提交审核" description="原因:项目需求加班"></el-step>
                <el-step title="等待处理" description="XXX已通过,XXX待处理"></el-step>
                <el-step title="处理结果" description="等待...."></el-step>
              </el-steps>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value2: '',
      day: ['日', '一', '二', '三', '四', '五', '六'],
      dayNumber: new Date().getDay(),
      nowday:
        new Date().getFullYear() +
        '年' +
        (new Date().getMonth() + 1) +
        '月' +
        new Date().getDate() +
        '日星期'
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style>
.span-radius {
  border-radius: 30px;
  display: block;
  width: 44px;
  height: 44px;
  border-color: rgb(222, 222, 222);
  border-style: solid;
  border-width: 1px;
  line-height: 44px;
  text-align: center;
  color: #333;
}
</style>
