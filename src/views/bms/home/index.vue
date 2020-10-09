<template>
  <div>
    <el-row :gutter="20" style="margin:8px 0px;height:54px">
      <el-col :span="12">
        <div>
          <a style="display:block;width:100%;font-size:20px;align-self: flex-end;">今日,</a>
          <span
            style="align-self:flex-end;font-size:12px;color:#555"
          >{{nowday}}{{day[dayNumber]}}，欢迎您回到后台管理系统</span>
        </div>
      </el-col>
      <el-col :span="12" style="display:flex;justify-content: flex-end;">
        <div style="display:flex;margin-right:24px">
          <span class="span-radius">
            <i class="el-icon-date" />
          </span>
          <div style="margin-left:8px">
            <div style="text-align:center;font-size:21px;color:#67C23A">25</div>
            <div style="font-size:12px">总签到</div>
          </div>
        </div>
        <div style="display:flex;margin-right:24px">
          <span class="span-radius">
            <i class="el-icon-date" />
          </span>
          <div style="margin-left:8px">
            <div style="text-align:center;font-size:21px;color:#E6A23C">6</div>
            <div style="font-size:12px">请假</div>
          </div>
        </div>
        <div style="display:flex;margin-right:24px">
          <span class="span-radius">
            <i class="el-icon-date" />
          </span>
          <div style="margin-left:8px">
            <div style="text-align:center;font-size:21px;color:#F56C6C">0</div>
            <div style="font-size:12px">迟到</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="14">
      <el-col :span="16">
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col :span="12">
            <el-card shadow="hover" style="height:234px;font-size:14px">
              <div style="font-size:15px;margin-bottom:8px">
                <b>代办事项</b>
              </div>
              <div>
                <el-row>
                  <el-col :span="6" style="padding:12px;text-align:center">
                    <div>紧急事项</div>
                    <div style="font-size:24px">1</div>
                  </el-col>
                  <el-col :span="6" style="padding:12px;text-align:center">
                    <div>重要事项</div>
                    <div style="font-size:24px">8</div>
                  </el-col>
                  <el-col :span="6" style="padding:12px;text-align:center">
                    <div>一般事项</div>
                    <div style="font-size:24px">0</div>
                  </el-col>
                  <el-col :span="6" style="padding:12px;text-align:center">
                    <div>已过期</div>
                    <div style="font-size:24px">9</div>
                  </el-col>
                  <div>紧急事项 未处理 1</div>
                  <div>重要事项 未处理 3</div>
                  <div>一般事项 未处理 1</div>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" style="height:234px;font-size:14px">
              <div style="font-size:15px;margin-bottom:8px">
                <b>项目管理</b>
              </div>
              <div>
                <el-row>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>预开始</div>
                    <div style="font-size:24px">4</div>
                  </el-col>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>进行中</div>
                    <div style="font-size:24px">0</div>
                  </el-col>
                  <el-col :span="8" style="padding:12px;text-align:center">
                    <div>已完成</div>
                    <div style="font-size:24px">4</div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col>
            <el-card shadow="hover" style="height:120px">总是显示</el-card>
          </el-col>
        </el-row>
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col>
            <el-card shadow="hover" style="height:360px">总是显示</el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col>
            <el-card shadow="hover" style="height:360px">
              <div style="font-size:15px;margin-bottom:8px">
                <b>发布新事项</b>
              </div>

              <el-form size="small" label-width="80px">
                <el-form-item label="事项名称">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="事项时间">
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
                <el-form-item label="事项地点">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="事项内容">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="参与人员">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="14" style="margin-bottom:14px">
          <el-col>
            <el-card shadow="always" style="height:418px">总是显示</el-card>
          </el-col>
        </el-row>
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
