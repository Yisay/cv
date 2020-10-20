<template>
  <el-card shadow="hover">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>模块管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      size="small"
      type="primary"
      icon="el-icon-plus"
      @click="addfatheredit"
      style="margin-top:8px;margin-bottom:8px"
    >新增父模块</el-button>
    <div class="custom-tree-container" style="margin:2px">
      <div class="block">
        <el-tree
          :data="data"
          node-key="value"
          default-expand-all
          icon-class="el-icon-arrow-right"
          :render-content="renderContent"
        ></el-tree>
      </div>
    </div>
    <el-dialog title="新增父模块" :visible.sync="dialogFormVisible" width="30%" style="min-width:400px">
      <el-form :model="form" ref="form" label-width="80px" :inline-message="true">
        <el-form-item label="名称" prop="title" style="margin:3px 0">
          <el-input v-model="form.title" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" style="margin:3px 0">
          <el-popover placement="right" width="400" trigger="click">
            <ul class="icon-list" style="font-size:20px">
              <li v-for="icon in icons" style="    float: left;list-style: none;" :key="icon">
                <i :class="icon" @click="cl(icon)"></i>
              </li>
            </ul>
            <el-button slot="reference" style="padding:10px;font-size:20px" size="mini">
              <i :class="iconbutton" />
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="文件路径" prop="path" style="margin:3px 0">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button><!--@click="addfather"-->
      </div>
    </el-dialog>

    <el-dialog
      title="新增子模块"
      :visible.sync="dialogchildrenFormVisible"
      width="30%"
      style="min-width:400px"
    >
      <el-form :model="form" ref="form" label-width="80px" :inline-message="true">
        <el-form-item label="父名称" prop="ftitle" style="margin:3px 0">
          <el-input v-model="form.ftitle" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="title" style="margin:3px 0">
          <el-input v-model="form.title" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" style="margin:3px 0">
          <el-popover placement="right" width="400" trigger="click">
            <ul class="icon-list" style="font-size:20px">
              <li v-for="icon in icons" style="    float: left;list-style: none;" :key="icon">
                <i :class="icon" @click="cl(icon)"></i>
              </li>
            </ul>
            <el-button slot="reference" style="padding:10px;font-size:20px" size="mini">
              <i :class="iconbutton" />
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="文件路径" prop="path" style="margin:3px 0">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogchildrenFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button><!--@click="addchildren"-->
      </div>
    </el-dialog>

    <el-dialog
      title="修改模块信息"
      :visible.sync="dialogupdateFormVisible"
      width="30%"
      style="min-width:400px"
    >
      <el-form :model="form" ref="form" label-width="80px" :inline-message="true">
        <el-form-item label="父名称" prop="ftitle" style="margin:3px 0">
          <el-input v-model="form.ftitle" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="title" style="margin:3px 0">
          <el-input v-model="form.title" style="line-height:0px"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" style="margin:3px 0">
          <el-popover placement="right" width="400" trigger="click">
            <ul class="icon-list" style="font-size:20px">
              <li v-for="icon in icons" style="float: left;list-style: none;" :key="icon">
                <i :class="icon" @click="cl(icon)"></i>
              </li>
              <li style="float:left;list-style:none;width:20px;height:20px;padding-bottom:3px">
                <el-button
                  @click="clen"
                  style="padding-left:6px;padding-right:6px;padding-bottom:3px;padding-top:3px;font-size:14px"
                >X</el-button>
              </li>
            </ul>
            <el-button slot="reference" style="padding:10px;font-size:20px" size="mini">
              <i :class="iconbutton" />
            </el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="文件路径" prop="path" style="margin:3px 0">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button><!--@click="updatemodule"-->
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var data = []
    return {
      icons: [
        'el-icon-eleme',
        'el-icon-delete-solid',
        'el-icon-delete',
        'el-icon-s-tools',
        'el-icon-setting',
        'el-icon-user-solid',
        'el-icon-user',
        'el-icon-phone',
        'el-icon-phone-outline',
        'el-icon-more',
        'el-icon-more-outline',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-s-goods',
        'el-icon-goods',
        'el-icon-warning',
        'el-icon-warning-outline',
        'el-icon-question',
        'el-icon-info',
        'el-icon-remove',
        'el-icon-circle-plus',
        'el-icon-success',
        'el-icon-error',
        'el-icon-zoom-in',
        'el-icon-zoom-out',
        'el-icon-remove-outline',
        'el-icon-circle-plus-outline',
        'el-icon-circle-check',
        'el-icon-circle-close',
        'el-icon-s-help',
        'el-icon-help',
        'el-icon-minus',
        'el-icon-plus',
        'el-icon-check',
        'el-icon-close',
        'el-icon-picture',
        'el-icon-picture-outline',
        'el-icon-picture-outline-round',
        'el-icon-upload',
        'el-icon-upload2',
        'el-icon-download',
        'el-icon-camera-solid',
        'el-icon-camera',
        'el-icon-video-camera-solid',
        'el-icon-video-camera',
        'el-icon-message-solid',
        'el-icon-bell',
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-home',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-share',
        'el-icon-d-caret',
        'el-icon-caret-left',
        'el-icon-caret-right',
        'el-icon-caret-bottom',
        'el-icon-caret-top',
        'el-icon-bottom-left',
        'el-icon-bottom-right',
        'el-icon-back',
        'el-icon-right',
        'el-icon-bottom',
        'el-icon-top',
        'el-icon-top-left',
        'el-icon-top-right',
        'el-icon-arrow-left',
        'el-icon-arrow-right',
        'el-icon-arrow-down',
        'el-icon-arrow-up',
        'el-icon-d-arrow-left',
        'el-icon-d-arrow-right',
        'el-icon-video-pause',
        'el-icon-video-play',
        'el-icon-refresh',
        'el-icon-refresh-right',
        'el-icon-refresh-left',
        'el-icon-finished',
        'el-icon-sort',
        'el-icon-sort-up',
        'el-icon-sort-down',
        'el-icon-rank',
        'el-icon-loading',
        'el-icon-view',
        'el-icon-c-scale-to-original',
        'el-icon-date',
        'el-icon-edit',
        'el-icon-edit-outline',
        'el-icon-folder',
        'el-icon-folder-opened',
        'el-icon-folder-add',
        'el-icon-folder-remove',
        'el-icon-folder-delete',
        'el-icon-folder-checked',
        'el-icon-tickets',
        'el-icon-document-remove',
        'el-icon-document-delete',
        'el-icon-document-copy',
        'el-icon-document-checked',
        'el-icon-document',
        'el-icon-document-add',
        'el-icon-printer',
        'el-icon-paperclip',
        'el-icon-takeaway-box',
        'el-icon-search',
        'el-icon-monitor',
        'el-icon-attract',
        'el-icon-mobile',
        'el-icon-scissors',
        'el-icon-umbrella',
        'el-icon-headset',
        'el-icon-brush',
        'el-icon-mouse',
        'el-icon-coordinate',
        'el-icon-magic-stick',
        'el-icon-reading',
        'el-icon-data-line',
        'el-icon-data-board',
        'el-icon-pie-chart',
        'el-icon-data-analysis',
        'el-icon-collection-tag',
        'el-icon-film',
        'el-icon-suitcase',
        'el-icon-suitcase-1',
        'el-icon-receiving',
        'el-icon-collection',
        'el-icon-files',
        'el-icon-notebook-1',
        'el-icon-notebook-2',
        'el-icon-toilet-paper',
        'el-icon-office-building',
        'el-icon-school',
        'el-icon-table-lamp',
        'el-icon-house',
        'el-icon-no-smoking',
        'el-icon-smoking',
        'el-icon-shopping-cart-full',
        'el-icon-shopping-cart-1',
        'el-icon-shopping-cart-2',
        'el-icon-shopping-bag-1',
        'el-icon-shopping-bag-2',
        'el-icon-sold-out',
        'el-icon-sell',
        'el-icon-present',
        'el-icon-box',
        'el-icon-bank-card',
        'el-icon-money',
        'el-icon-coin',
        'el-icon-wallet',
        'el-icon-discount',
        'el-icon-price-tag',
        'el-icon-news',
        'el-icon-guide',
        'el-icon-male',
        'el-icon-female',
        'el-icon-thumb',
        'el-icon-cpu',
        'el-icon-link',
        'el-icon-connection',
        'el-icon-open',
        'el-icon-turn-off',
        'el-icon-set-up',
        'el-icon-chat-round',
        'el-icon-chat-line-round',
        'el-icon-chat-square',
        'el-icon-chat-dot-round',
        'el-icon-chat-dot-square',
        'el-icon-chat-line-square',
        'el-icon-message',
        'el-icon-postcard',
        'el-icon-position',
        'el-icon-turn-off-microphone',
        'el-icon-microphone',
        'el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
        'el-icon-medal-1',
        'el-icon-medal',
        'el-icon-trophy',
        'el-icon-trophy-1',
        'el-icon-first-aid-kit',
        'el-icon-discover',
        'el-icon-place',
        'el-icon-location',
        'el-icon-location-outline',
        'el-icon-location-information',
        'el-icon-add-location',
        'el-icon-delete-location',
        'el-icon-map-location',
        'el-icon-alarm-clock',
        'el-icon-timer',
        'el-icon-watch-1',
        'el-icon-watch',
        'el-icon-lock',
        'el-icon-unlock',
        'el-icon-key',
        'el-icon-service',
        'el-icon-mobile-phone',
        'el-icon-bicycle',
        'el-icon-truck',
        'el-icon-ship',
        'el-icon-basketball',
        'el-icon-football',
        'el-icon-soccer',
        'el-icon-baseball',
        'el-icon-wind-power',
        'el-icon-light-rain',
        'el-icon-lightning',
        'el-icon-heavy-rain',
        'el-icon-sunrise',
        'el-icon-sunrise-1',
        'el-icon-sunset',
        'el-icon-sunny',
        'el-icon-cloudy',
        'el-icon-partly-cloudy',
        'el-icon-cloudy-and-sunny',
        'el-icon-moon',
        'el-icon-moon-night',
        'el-icon-dish',
        'el-icon-dish-1',
        'el-icon-food',
        'el-icon-chicken',
        'el-icon-fork-spoon',
        'el-icon-knife-fork',
        'el-icon-burger',
        'el-icon-tableware',
        'el-icon-sugar',
        'el-icon-dessert',
        'el-icon-ice-cream',
        'el-icon-hot-water',
        'el-icon-water-cup',
        'el-icon-coffee-cup',
        'el-icon-cold-drink',
        'el-icon-goblet',
        'el-icon-goblet-full',
        'el-icon-goblet-square',
        'el-icon-goblet-square-full',
        'el-icon-refrigerator',
        'el-icon-grape',
        'el-icon-watermelon',
        'el-icon-cherry',
        'el-icon-apple',
        'el-icon-pear',
        'el-icon-orange',
        'el-icon-coffee',
        'el-icon-ice-tea',
        'el-icon-ice-drink',
        'el-icon-milk-tea',
        'el-icon-potato-strips',
        'el-icon-lollipop',
        'el-icon-ice-cream-square',
        'el-icon-ice-cream-round'
      ],
      data: data,
      form: {
        menuid: '',
        title: '',
        icon: '',
        path: '',
        fid: '0',
        ftitle: '',
        type: ''
      },
      dialogFormVisible: false,
      dialogchildrenFormVisible: false,
      dialogupdateFormVisible: false,
      dialogtitle: '',
      iconbutton: ''
    }
  },
  methods: {
    addfatheredit () {
      this.form.fid = '0'
      this.form.ftitle = ''
      this.form.icon = ''
      this.form.type = '0'
      this.dialogFormVisible = true
    },
    addfather () {
      var that = this
      axios
        .get('http://api.25cl.cn/project/bms/saveModule', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          },
          params: {
            fid: that.form.fid,
            icon: that.form.icon,
            title: that.form.title,
            path: that.form.path,
            type: that.form.type
          }
        })
        .then((res) => {
          that.dialogFormVisible = false
          that.getModuleList()
        })
    },
    addchildrenedit (node, data) {
      this.form.fid = data.menuid
      this.form.ftitle = data.title
      this.iconbutton = data.icon
      this.form.icon = data.icon
      this.form.type = '1'
      this.dialogchildrenFormVisible = true
    },
    addchildren () {
      var that = this
      axios
        .get('http://api.25cl.cn/project/bms/saveModule', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          },
          params: {
            fid: that.form.fid,
            icon: that.form.icon,
            title: that.form.title,
            path: that.form.path,
            type: that.form.type
          }
        })
        .then((res) => {
          that.dialogchildrenFormVisible = false
          that.getModuleList()
        })
    },
    edit (node, data) {
      const parent = node.parent
      this.form.menuid = data.menuid
      this.form.fid =
        typeof parent.data.menuid === 'undefined' ? '' : parent.data.menuid
      this.form.ftitle = parent.data.title
      this.form.title = data.title
      this.iconbutton = data.icon
      this.form.icon = data.icon
      this.form.path = data.path
      this.form.type = data.type
      this.dialogupdateFormVisible = true
    },
    updatemodule () {
      console.log(this.form.menuid)
      console.log(this.form.fid)
      console.log(this.form.title)
      console.log(this.form.icon)
      console.log(this.form.path)
      console.log(this.form.type)
      var that = this
      axios
        .get('http://api.25cl.cn/project/bms/updateModule', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          },
          params: {
            id: that.form.menuid,
            fid: that.form.fid,
            icon: that.form.icon,
            title: that.form.title,
            path: that.form.path,
            type: that.form.type
          }
        })
        .then((res) => {
          that.dialogupdateFormVisible = false
          that.getModuleList()
        })
    },
    remove (node, data) {
      const parent = node.parent
      console.log(parent.data.title)
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.menuid === data.menuid)
      console.log(data.menuid)
      children.splice(index, 1)
    },
    renderContent (h, { node, data, store }) {
      console.log(data)
      return (
        <span class="custom-tree-node">
          <span>
            <i class={data.icon} /> {data.title}
          </span>
          <span>
            <el-button
              icon="el-icon-edit"
              plain
              size="mini"
              on-click={() => this.addchildrenedit(node, data)}
            >
              添加子模块
            </el-button>
            <el-button
              icon="el-icon-edit"
              plain
              size="mini"
              on-click={() => this.edit(node, data)}
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              size="mini"
              // on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      )
    },
    getModuleList () {
      var self = this
      axios
        .get('http://api.25cl.cn/project/bms/getModuleList', {
          headers: {
            userid: window.localStorage.getItem('userid'),
            token: window.localStorage.getItem('token')
          }
        })
        .then((res) => {
          console.log(res.data)
          self.data = []
          for (var value in res.data) {
            console.log('=================')
            console.log(value)
            self.data.push(res.data[value])
          }
        })
    },
    cl (data) {
      this.iconbutton = data
      this.form.icon = data
    },
    clen () {
      this.iconbutton = ''
      this.form.icon = ''
    }
  },
  mounted: function () {
    this.getModuleList()
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
  border-style: solid;
  border-color: #dcdfe6;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 2px;
  border-radius: 4px;
  height: 32px;
  margin-bottom: 2px;
}
.el-tree-node__children {
  margin-left: 18px;
}
.el-tree-node__content:hover {
  background-color: #909399;
}
.el-tree-node:focus > .el-tree-node__content {
  border-color: #909399;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 12px;
}
</style>
