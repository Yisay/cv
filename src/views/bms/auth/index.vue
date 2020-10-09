<template>
  <el-card shadow="hover">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" height="500" style="width: 100%;">
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.acnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nodename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogTableVisible" width="30%">
      <el-tree :data="routes" :props="defaultProps" show-checkbox node-key="menuid" ref="tree"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAuth">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      checkedid: null,
      routes: global.antRouter,
      dialogTableVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      tableData: []
    }
  },
  methods: {
    getuserAuth () {
      var self = this
      console.log(this.routes)
      console.log(this.rou)
      axios
        .get('http://api.25cl.cn/project/bms/getpartlist', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          var userAuthList = []
          console.log(res.data)
          for (var value in res.data) {
            userAuthList.push(res.data[value])
            console.log(self.routes)
          }
          this.tableData = userAuthList
        })
    },
    handleEdit ($index, $row) {
      var self = this
      self.checkedid = $row.id
      console.log(self.checkedid)
      axios
        .get('http://api.25cl.cn/project/bms/alterAuth', {
          params: {
            targetAcnumber: $row.id
          },
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          self.dialogTableVisible = true
          self.routes = res.data[0]
          self.$nextTick(() => {
            self.$refs.tree.setCheckedKeys(res.data[1])
          })
        })
    },
    saveAuth () {
      this.dialogTableVisible = false
      let nodes = this.$refs.tree.getCheckedNodes(false, true)
      let keys = []
      for (var value in nodes) {
        keys.push(nodes[value]['menuid'])
      }
      console.log(keys)
      axios
        .get('http://api.25cl.cn/project/bms/saveauth', {
          params: {
            saveid: this.checkedid,
            targetmenuid: keys
          },
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.$message('执行结果 : ' + res.data)
        })
    }
  },
  mounted: function () {
    this.getuserAuth()
  }
}
</script>
