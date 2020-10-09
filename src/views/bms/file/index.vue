<template>
  <el-card shadow="hover">
    <el-row style="padding:10px 0px;border-bottom:1px solid #DCDFE6">
      <el-col :span="14">
        <div>
          <el-button
            style="float:left;border-radius: 2px 0px 0px 2px"
            size="small"
            icon="el-icon-back"
            @click="returnuplevel"
          ></el-button>
          <div
            style="font-size:14px;padding:3px 5px;float:left;background: #f3f3f3;color:#333;border:solid #DCDFE6;border-width:1px 0px"
          >
            <div class="tag-group">
              <el-tag
                size="small"
                v-for="item in pwd"
                :key="item.title"
                :type="item.type"
                @click="ls(item.title)"
                effect="plain"
              >
                {{ item.text }}
                <i class="el-icon-arrow-right" />
              </el-tag>
            </div>
          </div>
          <el-button
            style="float:left;border-radius: 0px 2px 2px 0px"
            size="small"
            slot="append"
            icon="el-icon-refresh"
            @click="refreshls"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="10">
        <el-input size="small" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="4" style="padding:10px 0px;border-bottom:1px solid #DCDFE6">
      <el-col :span="12">
        <el-button size="mini" plain @click="uploaddialog">上传</el-button>
        <el-dropdown trigger="click" style="margin-left:10px">
          <el-button size="mini" plain>
            新建
            <i class="el-icon-caret-bottom" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="newFile">新建空白文件</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="newDir">新建目录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="item" effect="light" content="返回上一级" placement="bottom">
          <el-button
            size="mini"
            style="margin-left:10px"
            plain
            icon="el-icon-back"
            @click="returnuplevel"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="刷新" placement="bottom">
          <el-button size="mini" plain icon="el-icon-refresh" @click="refreshls"></el-button>
        </el-tooltip>
        <el-button size="mini" plain v-if="ztshow" @click="mvend">粘贴</el-button>
      </el-col>
      <el-col :span="11">
        <div style="float:right" v-if="batchtool">
          <el-button size="mini" plain @click.native.prevent="batchmvstart(0)">复制</el-button>
          <el-button size="mini" plain @click.native.prevent="batchmvstart(1)">剪切</el-button>
          <el-button size="mini" plain @click.native.prevent="batchtardialog()">压缩</el-button>
          <el-button size="mini" plain @click.native.prevent="batchrm()">删除</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <div v-if="scope.row.type === 'folder'" @click="ls(scope.row.path)">
            <i style="font-size:20px" :class="scope.row.icon"></i>
            <span>{{ scope.row.name }}</span>
          </div>
          <div v-else>
            <i style="font-size:20px" :class="scope.row.icon"></i>
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="100"></el-table-column>
      <el-table-column prop="time" width="180" label="修改时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="user" label="所有者" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="mvstart(scope.row,0)" type="text" size="small">复制</el-button>
          <el-button @click.native.prevent="mvstart(scope.row,1)" type="text" size="small">剪切</el-button>
          <el-button @click.native.prevent="mvname(scope.row)" type="text" size="small">重命名</el-button>
          <el-button @click.native.prevent="tardialog(scope.row)" type="text" size="small">压缩</el-button>
          <el-button
            v-if="scope.row.type === 'file'"
            @click.native.prevent="dfile(scope.row)"
            type="text"
            size="small"
          >下载</el-button>
          <el-button @click.native.prevent="rm(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="newFileTitle"
      :visible.sync="newFileDialogVisible"
      width="25%"
      style="margin-top:16vh"
    >
      <el-form style="margin:2px">
        <el-input v-model="filename" :placeholder="newFilePlaceholder"></el-input>
      </el-form>
      <div size="mini" slot="footer" class="dialog-footer">
        <el-button size="mini" @click="newFileDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="newfile">新 建</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="newFileTitle"
      :visible.sync="mvNameDialogVisible"
      width="25%"
      style="margin-top:16vh"
    >
      <el-form style="margin:2px">
        <el-input v-model="newfilename" :placeholder="newFilePlaceholder"></el-input>
      </el-form>
      <div size="mini" slot="footer" class="dialog-footer">
        <el-button size="mini" @click="mvNameDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="mv">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打包" :visible.sync="tarNameDialogVisible" width="25%" style="margin-top:16vh">
      <el-form style="margin:2px">
        <el-input v-model="tarendfilename" placeholder="无需添加后缀默认tar.gz"></el-input>
      </el-form>
      <div size="mini" slot="footer" class="dialog-footer">
        <el-button size="mini" @click="mvNameDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="tar">打 包</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传" :visible.sync="uploadDialogVisible" width="25%" style="margin-top:16vh">
      <el-upload
        class="upload-demo"
        ref="upload"
        :multiple="true"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>
  </el-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      pwd: ['1', '2'],
      tableData: [],
      newFileDialogVisible: false,
      filename: '',
      newFileTitle: '新建目录',
      newFilePlaceholder: '目录名称',
      type: 'file',
      nowpath: '',
      rmfilename: '',
      mvNameDialogVisible: false,
      oldpath: '',
      oldfilename: '',
      newfilename: '',
      ztshow: false,
      tarNameDialogVisible: false,
      tarstartfilename: '',
      tarendfilename: '',
      multipleSelection: [],
      batchtool: false,
      uploadDialogVisible: false,
      action: '',
      fileList: []
    }
  },
  methods: {
    ordersnumbersend () {
      console.log(this.ordersnumberinput)
    },
    ls (path) {
      // 查看文件列表
      axios
        .get('http://api.25cl.cn/project/bms/getLs', {
          params: {
            path: path
          }
        })
        .then((res) => {
          console.log(res.data)
          this.tableData = []
          for (var dir = 0; dir < res.data['DIRS'].length; dir++) {
            var con = res.data['DIRS'][dir].split(';')
            var arr = {
              path: res.data['PATH'] + '/' + con[8] + '/',
              icon: 'el-icon-folder',
              name: con[8],
              size: con[4],
              time: con[5] + ' ' + con[6].substring(0, 8),
              user: con[2],
              type: 'folder'
            }
            this.tableData.push(arr)
          }
          for (var file = 0; file < res.data['FILES'].length; file++) {
            // 循环读取file文件
            con = res.data['FILES'][file].split(';') // 判断分割符号转数组
            var size = 0 // 初始化文件大小
            if (con[4] < 1024) {
              // 判断数值转化成对应大小的单位
              size = (con[4] / 1).toFixed(2) + 'B'
            } else if (con[4] <= 1048576) {
              size = (con[4] / 1024).toFixed(2) + 'KB'
            } else {
              size = (con[4] / 1048576).toFixed(2) + 'MB'
            }
            // 将文件信息写入数组
            arr = {
              icon: 'el-icon-document',
              name: con[8],
              size: size,
              time: con[5] + ' ' + con[6].substring(0, 8),
              user: con[2],
              type: 'file'
            }
            // 添加到表格
            this.tableData.push(arr)
          }
          // 调用路径信息格式化方法
          this.redpath(res.data['PATH'])
        })
    },
    // 提交创建新文件
    newfile () {
      // 隐藏对话框
      this.newFileDialogVisible = false
      // axios 异步提交
      axios
        .get('http://api.25cl.cn/project/bms/newfile', {
          params: {
            path: this.nowpath, // 当前路径
            filename: this.filename, // 创建的文件名
            type: this.type // 文件类型
          }
        })
        .then((res) => {
          console.log(res.data)
          this.ls(this.nowpath)
        })
    },
    // 删除文件 参数表格行信息
    rm (row) {
      axios
        .get('http://api.25cl.cn/project/bms/rm', {
          params: {
            path: this.nowpath, // 路径当前路径
            filename: row.name // 文件名当前选中的文件名
          }
        })
        .then((res) => {
          console.log(res.data)
          this.ls(this.nowpath)
        })
    },
    batchrm () {
      console.log(this.multipleSelection)
      for (var index = 0; index < this.multipleSelection.length; index++) {
        axios
          .get('http://api.25cl.cn/project/bms/rm', {
            params: {
              path: this.nowpath, // 路径当前路径
              filename: this.multipleSelection[index].name // 文件名当前选中的文件名
            }
          })
          .then((res) => {
            console.log(res.data)
            this.ls(this.nowpath)
          })
      }
    },
    // 下载文件(不可用于下载文件夹)
    dfile (row) {
      // 调用window自带的open方法 打开新的窗口访问方法 获取资源链接
      window.open(
        'http://api.25cl.cn/project/bms/dfile?path = ' +
          encodeURI(this.nowpath) +
          '&filename = ' +
          encodeURI(row.name)
      )
    },
    // 格式化路径
    redpath (path) {
      var pwdarray = path.replace(/[\r\n]/g, '').split('/') // 将换行回车去除保证字符串的完整
      var pathitem = '/' // 初始先赋值反斜杠作为根目录
      this.pwd = [] // 路径数组初始化
      this.pwd[0] = { title: pathitem, text: '根目录' } // 首个路径赋值根目录
      if (path.length > 2) {
        // 判断字符串长度是否大于2 即判断是否只有根目录
        for (var pwditem = 1; pwditem < pwdarray.length; pwditem++) {
          // 从分割数组的第二个下标开始读取
          pathitem = pathitem + pwdarray[pwditem] + '/' // 拼接对应的路径
          this.pwd[pwditem] = { title: pathitem, text: pwdarray[pwditem] } // 复制给pwd数组
        }
        this.nowpath = this.pwd[this.pwd.length - 1].title // 设置当前路径
      }
    },
    // 创建新建目录对话框
    newDir () {
      this.newFileTitle = '新建目录' // 设置对话框标题
      this.newFilePlaceholder = '目录名称' // 设置输入框提示文字
      this.type = 'dir' // 设置类型为文件夹
      this.newFileDialogVisible = true // 显示对话框
    },
    // 创建新建文件对话框
    newFile () {
      this.newFileTitle = '新建空白文件' // 设置对话框标题
      this.newFilePlaceholder = '文件名' // 设置输入框提示文字
      this.type = 'file' // 设置类型为文件
      this.newFileDialogVisible = true // 显示对话框
    },
    // 创建重命名对话框
    mvname (row) {
      this.newFileTitle = '重命名' // 设置对话框标题
      this.oldfilename = row.name // 设置旧文件名
      this.newfilename = row.name // 设置新文件名(初始化设置 防止重命名指令变为移动指令)
      this.newFilePlaceholder = row.name // 设置输入框提示文字
      this.mvNameDialogVisible = true // 显示重命名对话框
      this.oldpath = this.nowpath // 设置旧路径为当前路径
      this.type = 2 // 类型为操作类型
    },
    // 剪切或复制开始 参数row 选择的行 参数 type 类型 0为复制 1为粘贴 2为重命名
    mvstart (row, type) {
      this.oldfilename = row.name // 设置旧名字为选中行的文件名
      this.newfilename = '' // 设置新名字为'' 防止mv变为移动重命名
      this.oldpath = this.nowpath // 设置旧路径为当前路径
      this.ztshow = true // 显示粘贴按钮
      this.type = type // 类型为操作类型
    },
    batchmvstart (type) {
      this.oldfilename = '{' // 旧文件名
      console.log(this.multipleSelection)
      for (var index = 0; index < this.multipleSelection.length; index++) {
        this.oldfilename =
          this.oldfilename + this.multipleSelection[index].name + ',' // 拼接文件名
        console.log(this.multipleSelection[index])
      }
      this.oldfilename =
        this.oldfilename.substring(0, this.oldfilename.length - 1) + '}' // 拼接文件名
      console.log(this.oldfilename)
      this.newfilename = '' // 设置新名字为'' 防止mv变为移动重命名
      this.oldpath = this.nowpath // 设置旧路径为当前路径
      this.ztshow = true // 显示粘贴按钮
      this.type = type // 类型为操作类型
    },
    // 剪切或复制结束(粘贴键点击事件)
    mvend () {
      this.mv() // 调用 mv事件
      this.ztshow = false // 隐藏粘贴键
    },
    mv () {
      this.mvNameDialogVisible = false // 隐藏重命名对话框
      axios
        .get('http://api.25cl.cn/project/bms/mv', {
          params: {
            oldpath: this.oldpath, // 旧路径
            nowpath: this.nowpath, // 当前路径
            oldfilename: this.oldfilename, // 旧文件名
            newfilename: this.newfilename, // 新文件名
            type: this.type // 操作类型
          }
        })
        .then((res) => {
          console.log(res.data)

          this.ls(this.nowpath)
        })
    },
    uploaddialog () {
      this.action =
        'http://api.25cl.cn/project/bms/uploadfile?path = ' + this.nowpath
      this.uploadDialogVisible = true
    },
    batchtardialog () {
      this.tarstartfilename = ''
      for (var index = 0; index < this.multipleSelection.length; index++) {
        this.tarstartfilename =
          this.tarstartfilename + this.multipleSelection[index].name + ' '
      }
      this.tarendfilename = this.multipleSelection[0].name
      this.tarNameDialogVisible = true
    },
    tardialog (row) {
      this.tarstartfilename = row.name
      this.tarendfilename = row.name
      this.tarNameDialogVisible = true
    },
    tar () {
      this.tarNameDialogVisible = false // 隐藏重命名对话框
      axios
        .get('http://api.25cl.cn/project/bms/tar', {
          params: {
            path: this.nowpath, // 当前路径
            tarstartfilename: this.tarstartfilename, // 打包前
            tarendfilename: this.tarendfilename, // 打包后文件名
            type: this.type // 操作类型
          }
        })
        .then((res) => {
          console.log(res.data)
          this.ls(this.nowpath)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.multipleSelection.length > 1
        ? (this.batchtool = true)
        : (this.batchtool = false)
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.ls(this.nowpath)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess () {
      this.uploadDialogVisible = false
      this.ls(this.nowpath)
    },
    refreshls () {
      this.ls(this.nowpath)
    },
    returnuplevel () {
      if (this.pwd.length > 1) {
        this.nowpath = this.pwd[this.pwd.length - 2].title
      }
      this.ls(this.nowpath)
    }
  },
  mounted () {
    this.ls()
  }
}
</script>
