<template>
  <el-card shadow="hover">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input size="small" v-model="search" placeholder="查询姓名" style="width:200px">
      <template slot="prepend">查询</template>
    </el-input>

    <el-button
      size="small"
      type="primary"
      @click="UserEdit"
      style="margin-top:8px;margin-bottom:8px;width:60px"
    >新增</el-button>

    <el-dialog
      :title="dialogtitle"
      :visible.sync="dialogFormVisible"
      width="30%"
      style="min-width:400px"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" :inline-message="true">
        <el-form-item v-if="isadd" label="账号" prop="acnumber" style="margin:3px 0">
          <el-input v-model="form.acnumber" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item v-if="isadd" label="密码" prop="password" style="margin:3px 0">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" style="margin:3px 0">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" style="margin:3px 0">
          <div>
            <el-radio v-model="form.sex" label="1" border style="margin:0;padding 0;width:49%">男</el-radio>
            <el-radio v-model="form.sex" label="0" border style="margin:0;padding 0;width:49%">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="出生年月" prop="age" style="margin:3px 0">
          <el-input v-model.number="form.age" />
        </el-form-item>
        <el-form-item label="部门/职位" style="margin:3px 0">
          <el-cascader
            ref="positioncas"
            v-model="form.position"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            filterable
            @change="lok"
            style="width:100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      style="width: 100%"
      height="500"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.acnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="部门" :filters="notefilters" :filter-method="filterNoteTag">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nodename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="iseditview" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        console.log(value)
        callback(new Error('年龄不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      }
    }
    var checkAcnumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogtitle: '',
      options: [],
      isadd: true,
      position: '',
      tableData: [],
      iseditview: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      search: '',
      notefilters: [],
      form: {
        name: '',
        acnumber: '',
        password: '',
        age: '',
        sex: '1',
        position: ''
      },
      rules: {
        age: [{ validator: checkAge, trigger: 'blur' }],
        acnumber: [{ validator: checkAcnumber, trigger: 'blur' }],
        password: [{ validator: checkAcnumber, trigger: 'blur' }],
        name: [{ validator: checkAcnumber, trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      data: [
        {
          id: 1,
          label: '实时监控'
        },
        {
          id: 2,
          label: '数据管理',
          children: [
            {
              id: 5,
              label: '数据分析'
            },
            {
              id: 6,
              label: '历史数据'
            }
          ]
        },
        {
          id: 3,
          label: '权限管理',
          children: [
            {
              id: 7,
              label: '用户权限'
            },
            {
              id: 8,
              label: '模块管理'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    lok () {
      console.log(this.$refs.positioncas.getCheckedNodes()[0].path)
    },
    submitUserInfo () {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$prompt('请输入确认执行代码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[A-Za-z0-9]+$/,
            inputErrorMessage: '请输入字母或数字'
          })
            .then(({ value }) => {
              self.dialogFormVisible = false
              if (self.isadd) {
                axios
                  .get('http://api.25cl.cn/project/bms/addUser', {
                    headers: {
                      userid: window.localStorage.getItem('userid'),
                      token: window.localStorage.getItem('token')
                    },
                    params: {
                      acnumber: self.form.acnumber,
                      password: self.form.password,
                      name: self.form.name,
                      age: self.form.age,
                      sex: self.form.sex,
                      aa: this.$refs.positioncas.getCheckedNodes()[0].path[0],
                      vv: this.$refs.positioncas.getCheckedNodes()[0].path[1],
                      tokencode: value
                    }
                  })
                  .then((res) => {
                    this.$message({
                      type: 'info',
                      message: res.data
                    })
                  })
              } else {
                axios
                  .get('http://api.25cl.cn/project/bms/updateUser', {
                    headers: {
                      userid: window.localStorage.getItem('userid'),
                      token: window.localStorage.getItem('token')
                    },
                    params: {
                      targetid: self.form.id,
                      acnumber: self.form.acnumber,
                      name: self.form.name,
                      age: self.form.age,
                      sex: self.form.sex,
                      aa: this.$refs.positioncas.getCheckedNodes()[0].path[0],
                      vv: this.$refs.positioncas.getCheckedNodes()[0].path[1],
                      tokencode: value
                    }
                  })
                  .then((res) => {
                    this.$message({
                      type: 'info',
                      message: res.data
                    })
                    this.getDepartmentpersonnelList()
                  })
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消操作'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '内容格式错误'
          })
          return false
        }
      })
    },
    UserEdit () {
      this.isadd = true
      this.dialogtitle = '新增用户'
      this.dialogFormVisible = true
      var self = this
      axios
        .get('http://api.25cl.cn/project/bms/getPositionList', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          for (var value in res.data) {
            self.options.push(res.data[value])
          }
        })
    },
    getDepartmentpersonnelList () {
      var self = this
      let set = new Set()
      axios
        .get('http://api.25cl.cn/project/bms/getDepartmentpersonnelList', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          var DepartmentpersonnelList = []
          for (var value in res.data) {
            DepartmentpersonnelList.push(res.data[value])
            set.add(res.data[value]['nodename'])
          }
          console.log(DepartmentpersonnelList)
          self.tableData = DepartmentpersonnelList
          for (value of set) {
            console.log(value)
            self.notefilters.push({ text: value, value: value })
          }
          console.log(self.notefilters)
        })
    },
    handleEdit ($index, $row) {
      this.isadd = false
      this.dialogtitle = '修改用户信息'
      this.dialogFormVisible = true
      var self = this
      self.form.acnumber = $row.acnumber
      self.form.name = $row.name
      self.form.position = $row.note + '/' + $row.nodename
      axios
        .get('http://api.25cl.cn/project/bms/getPositionList', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          for (var value in res.data) {
            self.options.push(res.data[value])
          }
        })
    },
    handleDelete ($index, $row) {
      this.$prompt('请输入确认执行代码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z0-9]+$/,
        inputErrorMessage: '请输入字母或数字'
      })
        .then(({ value }) => {
          axios
            .get('http://api.25cl.cn/project/bms/deleteUser', {
              headers: {
                userid: window.localStorage.getItem('userid'),
                token: window.localStorage.getItem('token')
              },
              params: {
                targetUserid: $row.id,
                tokencode: value
              }
            })
            .then((res) => {
              this.$message({
                type: 'info',
                message: res.data
              })
              this.getDepartmentpersonnelList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    filterNoteTag (value, row) {
      return row.nodename === value
    }
  },
  mounted: function () {
    this.getDepartmentpersonnelList()
  }
}
</script>
