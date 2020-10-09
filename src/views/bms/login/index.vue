<template>
  <div style="height:100%;background:#000000;padding: 5% 0">
    <el-card style="width:300px;height:400px;margin: 0 auto;">
      <div slot="header" class="clearfix">
        <span>登录界面</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="acnumber">
          <el-input type="test" v-model="ruleForm.acnumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var validateacnumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (!new RegExp(/^[A-Za-z0-9]+$/).test(value)) {
        callback(new Error('输入内容不匹配'))
      } else {
        if (this.ruleForm.acnumber !== '') {
          callback()
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!new RegExp(/^[A-Za-z0-9]+$/).test(value)) {
        callback(new Error('输入内容不匹配'))
      } else {
        if (this.ruleForm.password !== '') {
          callback()
        }
        callback()
      }
    }
    return {
      ruleForm: {
        acnumber: '',
        password: ''
      },
      rules: {
        acnumber: [{ validator: validateacnumber, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var self = this
      console.log(self.ruleForm.password)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .get('http://api.25cl.cn/project/bms/haslogin', {
              params: {
                acnumber: self.ruleForm.acnumber,
                password: self.ruleForm.password
              },
              headers: {
                userid: window.localStorage.getItem('userid'),
                token: window.localStorage.getItem('token')
              }
            })
            .then((res) => {
              if (res.data.token != null) {
                localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userid', res.data.userinfo['acnumber'])
                console.log(window.localStorage.getItem('userinfo'))
                console.log(window.localStorage.getItem('token'))
                console.log(window.localStorage.getItem('userid'))
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                })
                self.$router.push({ path: '/bms' })
              } else {
                this.$message({
                  type: 'error',
                  message: '账号密码错误!'
                })
              }
            })
        } else {
          this.$message({
            type: 'error',
            message: '提交格式异常!'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
