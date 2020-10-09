<template>
  <div style="height:100%;overflow:hidden">
    <el-container>
      <el-header
        style="background-color:#fff;height:50px;box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 4px 0px;"
      >
        <el-row type="flex" align="middle" style="height:100%">
          <el-col :span="17">
            <a style="font-size:16px">
              <b>
                <i class="el-icon-orange" /> 后 台 管 理 系 统
              </b>
            </a>
          </el-col>
          <el-col :span="7" style=" text-align: center;padding-right:4px;font-size:16px">
            <el-dropdown style="float:right">
              <span class="el-dropdown-link">
                <el-avatar
                  src="https://aliyun_id_photo_bucket.oss.aliyuncs.com/default_handsome.jpg"
                  style="max-width:28px;max-height:28px;"
                ></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown" style="width:260px">
                <div
                  style="padding:2px 12px 12px 12px;font-size:12px;border-bottom-color:rgb(239, 239, 239);border-bottom-style:solid;border-bottom-width:1px;"
                >
                  <div style="display:flex;align-items:center">
                    <el-avatar
                      src="https://aliyun_id_photo_bucket.oss.aliyuncs.com/default_handsome.jpg"
                      style="max-width:32px;max-height:32px;"
                    />
                    <div style="margin-left:12px">{{userinfo.name}}</div>
                  </div>
                  <div style="display:flex;height:18px;margin-top:8px">
                    <div style="width:100%">
                      <span class="span-link" @click="userinfoDialogVisible=true">基本资料</span>
                      <el-divider direction="vertical"></el-divider>
                      <span class="span-link">修改密码</span>
                    </div>
                  </div>
                </div>
                <div
                  style="padding:8px 0px;border-bottom-color:rgb(239, 239, 239);border-bottom-style:solid;border-bottom-width:1px;"
                >
                  <a class="a-li">
                    <i class="el-icon-date" style="margin-right:8px" />
                    <span>打卡</span>
                  </a>
                  <a class="a-li">
                    <i class="el-icon-date" style="margin-right:8px" />
                    <span>查看任务</span>
                  </a>
                  <a class="a-li">
                    <i class="el-icon-date" style="margin-right:8px" />
                    <span>退出登录</span>
                  </a>
                  <a class="a-li">
                    <i class="el-icon-date" style="margin-right:8px" />
                    <span>提交报告</span>
                  </a>
                </div>
                <el-link class="a-out" @click="logout" :underline="false">退出登录</el-link>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
          <sidebar class="sidebar-container"></sidebar>
        </el-aside>
        <el-main>
          <div>
            <app-main class="main-container"></app-main>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="基本信息" :visible.sync='userinfoDialogVisible'>
      <div>
        {{userinfo['acnumber']}}
      </div>
      <div>
        {{userinfo['name']}}
      </div>
      <div>
        {{userinfo['code']}}
      </div>
      <div>
        {{userinfo['lv']}}
      </div>
      <div>
        {{userinfo['age']}}
      </div>
      <div>
        {{userinfo['sex']}}
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AppMain from '@/views/bms/layout/components/AppMain'
import sidebar from '@/views/bms/layout/components/sidebar'
export default {
  name: 'layout',
  data () {
    return {
      mtime: '',
      userinfoDialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      userinfo: JSON.parse(window.localStorage.getItem('userinfo')),
      formLabelWidth: '60px',
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      location.reload()
    }
  },
  mounted () {},
  components: {
    sidebar,
    AppMain
  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.span-link:hover {
  color: #ff6a00;
}
.a-li:hover {
  background: #f5f5f5;
}
.a-li {
  display: block;
  width: 90%;
  font-size: 12px;
  padding: 10px 12px;
}
.a-out {
  display: block;
  width: 90%;
  font-size: 12px;
  padding: 0 12px;
  background: #f7f7f7;
  color: #ff6a00;
  height: 36px;
  text-align: center;
  line-height: 34px;
}
.a-out:hover {
  color: #333;
  background: #ebebeb;
}
</style>
