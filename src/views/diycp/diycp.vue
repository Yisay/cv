<template>
  <div style="background-color: #fff; width: 100%; height: 100%">
    <!-- <div
      style="
        position: absolute;
        background-color: #eeeeeeee;
        width: 200px;
        height: 90%;
        padding: 4px;
      "
    >
      <el-collapse>
        <el-collapse-item title="Basic">
          <div @click="createdCP"><el-tag>Layout 布局</el-tag></div>
          <div><el-tag>Container 布局容器</el-tag></div>
          <div><el-tag>Color 色彩</el-tag></div>
          <div><el-tag>Typography 字体</el-tag></div>
          <div><el-tag>Border 边框</el-tag></div>
          <div><el-tag>Icon 图标</el-tag></div>
          <div><el-tag>Button 按钮</el-tag></div>
          <div><el-tag>Link 文字链接</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="Form">
          <div><el-tag>Radio 单选框</el-tag></div>
          <div><el-tag>Checkbox 多选框</el-tag></div>
          <div><el-tag>Input 输入框</el-tag></div>
          <div><el-tag>InputNumber 计数器</el-tag></div>
          <div><el-tag>Select 选择器</el-tag></div>
          <div><el-tag>Cascader 级联选择器</el-tag></div>
          <div><el-tag>Switch 开关</el-tag></div>
          <div><el-tag>Slider 滑块</el-tag></div>
          <div><el-tag>TimePicker 时间选择器</el-tag></div>
          <div><el-tag>DatePicker 日期选择器</el-tag></div>
          <div><el-tag>DateTimePicker 日期时间选择器</el-tag></div>
          <div><el-tag>Upload 上传</el-tag></div>
          <div><el-tag>Rate 评分</el-tag></div>
          <div><el-tag>ColorPicker 颜色选择器</el-tag></div>
          <div><el-tag>Transfer 穿梭框</el-tag></div>
          <div><el-tag>Form 表单</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="Data">
          <div><el-tag>Table 表格</el-tag></div>
          <div><el-tag>Tag 标签</el-tag></div>
          <div><el-tag>Progress 进度条</el-tag></div>
          <div><el-tag>Tree 树形控件</el-tag></div>
          <div><el-tag>Pagination 分页</el-tag></div>
          <div><el-tag>Badge 标记</el-tag></div>
          <div><el-tag>Avatar 头像</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="Notice">
          <div><el-tag>Alert 警告</el-tag></div>
          <div><el-tag>Loading 加载</el-tag></div>
          <div><el-tag>Message 消息提示</el-tag></div>
          <div><el-tag>MessageBox 弹框</el-tag></div>
          <div><el-tag>Notification 通知</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="Navigation">
          <div><el-tag>NavMenu 导航菜单</el-tag></div>
          <div><el-tag>Tabs 标签页</el-tag></div>
          <div><el-tag>Breadcrumb 面包屑</el-tag></div>
          <div><el-tag>PageHeader 页头</el-tag></div>
          <div><el-tag>Dropdown 下拉菜单</el-tag></div>
          <div><el-tag>Steps 步骤条</el-tag></div>
        </el-collapse-item>
        <el-collapse-item title="Others">
          <div><el-tag>Dialog 对话框</el-tag></div>
          <div><el-tag>Tooltip 文字提示</el-tag></div>
          <div><el-tag>Popover 弹出框</el-tag></div>
          <div><el-tag>Popconfirm 气泡确认框</el-tag></div>
          <div><el-tag>Card 卡片</el-tag></div>
          <div><el-tag>Carousel 走马灯</el-tag></div>
          <div><el-tag>Collapse 折叠面板</el-tag></div>
          <div><el-tag>Timeline 时间线</el-tag></div>
          <div><el-tag>Divider 分割线</el-tag></div>
          <div><el-tag>Calendar 日历</el-tag></div>
          <div><el-tag>Image 图片</el-tag></div>
          <div><el-tag>Backtop 回到顶部</el-tag></div>
          <div><el-tag>InfiniteScroll 无限滚动</el-tag></div>
          <div><el-tag>Drawer 抽屉</el-tag></div>
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <div
      style="
        position: absolute;
        background-color: #cccccc60;
        right: 0px;
        width: 42px;
        height: 42px;
      "
      @mousedown="move"
    >
      <el-popover
        placement="right"
        width="300"
        trigger="manual"
        v-model="menuvisible"
        @click.stop
      >
        <div style="padding: 4px">
          <el-divider>组件信息</el-divider>
          <el-input v-model="showCp" @change="changeCP('cp', showCp)">
            <template slot="prepend">组件类型</template>
          </el-input>
          <el-input v-model="showId" @change="changeCP('id', showId)">
            <template slot="prepend">id</template>
          </el-input>
          <el-input v-model="showClass" @change="changeCP('class', showClass)">
            <template slot="prepend">class</template>
          </el-input>
          <el-popover
            placement="right"
            width="200"
            trigger="click"
          >
          <div style="padding: 16px;background-color:#eee">
            <div class="flex">
              <el-tag style="width: 100px">width</el-tag>
              <el-input v-model="showStyle['width']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">height</el-tag>
              <el-input v-model="showStyle['height']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">position</el-tag>
              <el-input
                v-model="showStyle['position']"
                size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">display</el-tag>
              <el-input
                v-model="showStyle['display']"
                size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">margin</el-tag>
              <el-input v-model="showStyle['margin']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">padding</el-tag>
              <el-input
                v-model="showStyle['padding']"
                 placeholder="px|%" size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">自定义</el-tag>
              <el-input v-model="showStyle['other']" placeholder="xxx:'xxx';" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 83px">背景颜色</el-tag>
              <el-color-picker
                v-model="showStyle['background-color']"
                show-alpha
                size="medium"
              ></el-color-picker>
            </div>
            <div class="flex">
              <el-tag style="width: 83px">文字颜色</el-tag>
              <el-color-picker
                v-model="showStyle['color']"
                show-alpha
                size="medium"
              ></el-color-picker>
            </div>
            <div class="flex">
            <el-button type="primary" @click="changeCP('style', showStyle)">确认更改</el-button>
          </div>
          </div>
            <el-button slot="reference">style</el-button>
          </el-popover>
          <el-input
            v-model="showHeader"
            @change="changeCP('header', showHeader)"
          >
            <template slot="prepend">其他属性</template>
          </el-input>
          <el-divider>添加组件</el-divider>
          <el-button-group>
            <el-button type="primary" @click="dialogNewCPVisible = true"
              >添加组件</el-button
            >
            <el-button type="primary" @click="deletecp">删除组件</el-button>
          </el-button-group>
          <el-menu default-active="/" :router="true" style="width:120px;height:20px;background-color:#00000000">
        <el-menu-item index="/" style="width:120px;height:20px;background-color:#00000000;line-height:20px">返回主页</el-menu-item>
      </el-menu>
        </div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          slot="reference"
          circle
          @click="menuvisible = !menuvisible"
        ></el-button>
      </el-popover>
    </div>
    <div
      v-if="array !== undefined && array.length > 0"
      id="cpbox"
      v-html="html"
      style="width: 100%; height: 100%"
    ></div>
    <div
      v-else
      id="cpbox"
      style="width: 100%; height: 100%; background-color: #eee; padding: 1px"
      @click="newbox"
    >
      点击新建box
    </div>
    <el-dialog title="新组件" :visible.sync="dialogNewCPVisible" width="300px">
      <el-select v-model="newCp" placeholder="组件类型">
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-option-group>
      </el-select>
      <el-input v-model="newId">
        <template slot="prepend">id</template>
      </el-input>
      <el-input v-model="newClass">
        <template slot="prepend">class</template>
      </el-input>
      <el-popover
            placement="right"
            width="200"
            trigger="click"
          >
          <div style="padding: 16px;background-color:#eee">
            <div class="flex">
              <el-tag style="width: 100px">width</el-tag>
              <el-input v-model="newStyle['width']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">height</el-tag>
              <el-input v-model="newStyle['height']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">position</el-tag>
              <el-input
                v-model="newStyle['position']"
                size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">display</el-tag>
              <el-input
                v-model="newStyle['display']"
                size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">margin</el-tag>
              <el-input v-model="newStyle['margin']" placeholder="px|%" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">padding</el-tag>
              <el-input
                v-model="newStyle['padding']"
                 placeholder="px|%" size="small"
              ></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 100px">自定义</el-tag>
              <el-input v-model="newStyle['other']" placeholder="xxx:'xxx';" size="small"></el-input>
            </div>
            <div class="flex">
              <el-tag style="width: 83px">背景颜色</el-tag>
              <el-color-picker
                v-model="newStyle['background-color']"
                show-alpha
                size="medium"
              ></el-color-picker>
            </div>
            <div class="flex">
              <el-tag style="width: 83px">文字颜色</el-tag>
              <el-color-picker
                v-model="newStyle['color']"
                show-alpha
                size="medium"
              ></el-color-picker>
            </div>
          </div>
            <el-button slot="reference">style</el-button>
      </el-popover>
      <el-input v-model="newHeader">
        <template slot="prepend">其他属性</template>
      </el-input>
      <el-button-group>
        <el-button type="primary" @click="addBefore">添加前</el-button>
        <el-button type="primary" @click="addChildren">子组件</el-button>
        <el-button type="primary" @click="addAfter">添加后</el-button>
      </el-button-group>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: '',
      fid: '',
      showCp: 'div',
      showId: '',
      showClass: '',
      showStyle: '',
      showHeader: '',
      newCp: '',
      newId: '',
      newClass: '',
      newStyle: {
        width: '',
        height: '',
        'background-color': '',
        color: '',
        padding: '',
        margin: '',
        position: '',
        display: '',
        other: ''
      },
      newHeader: '',
      array: [],
      nodes: [],
      options: [
        {
          label: 'Basic',
          options: [
            {
              value: 'div',
              label: 'div'
            },
            {
              value: 'button',
              label: 'button'
            },
            {
              value: 'input',
              label: 'input'
            },
            {
              value: 'radio',
              label: 'radio'
            },
            {
              value: 'Checkbox',
              label: 'Checkbox'
            }
          ]
        },
        {
          label: '表格',
          options: [
            {
              value: 'table',
              label: 'table'
            },
            {
              value: 'tr',
              label: 'tr'
            },
            {
              value: 'th',
              label: 'th'
            },
            {
              value: 'td',
              label: 'td'
            }
          ]
        }
      ],
      html: '',
      menuvisible: false,
      dialogNewCPVisible: false
    }
  },
  mounted () {},
  methods: {
    addChildren () {
      this.dialogNewCPVisible = true
      this.nodes[this.key].children.push({
        cp: this.newCp,
        id: this.newId,
        class: this.newClass,
        style: JSON.parse(JSON.stringify(this.newStyle)),
        header: this.newHeader,
        children: []
      })
      console.log(this.array)
      this.createdCP()
    },
    changeCP (item, value) {
      console.log(this.key)
      this.nodes[this.key][item] = value
      this.createdCP()
    },
    addBefore () {
      this.dialogNewCPVisible = true
      let childrens = this.nodes[this.fid].children
      for (let index in childrens) {
        if (childrens[index] === this.nodes[this.key]) {
          childrens.splice(index, 0, {
            cp: this.newCp,
            id: this.newId,
            class: this.newClass,
            style: JSON.parse(JSON.stringify(this.newStyle)),
            header: this.newHeader,
            children: []
          })
          this.createdCP()
          break
        }
      }
    },
    addAfter () {
      this.dialogNewCPVisible = true
      let childrens = this.nodes[this.fid].children
      for (let index in childrens) {
        if (childrens[index] === this.nodes[this.key]) {
          childrens.splice(index + 1, 0, {
            cp: this.newCp,
            id: this.newId,
            class: this.newClass,
            style: JSON.parse(JSON.stringify(this.newStyle)),
            header: this.newHeader,
            children: []
          })
          this.createdCP()
          break
        }
      }
    },
    deletecp () {
      let childrens = this.nodes[this.fid].children
      for (let index in childrens) {
        if (childrens[index] === this.nodes[this.key]) {
          childrens.splice(index, 1)
          this.createdCP()
          break
        }
      }
    },
    newbox () {
      let test = {
        cp: 'div',
        id: '',
        class: '',
        style: {
          width: '100%',
          height: '100%',
          'background-color': '',
          color: '',
          padding: '',
          margin: '',
          position: '',
          display: '',
          other: ''
        },
        header: '',
        children: []
      }
      this.array.push(test)
      this.createdCP()
    },

    createdCP () {
      this.html = ''
      this.nodes = []
      console.log(this.showStyle)
      this.html = this.digui('root', this.array)
    },
    showCP (fid, key) {
      event.cancelBubble = true
      this.fid = fid
      this.key = key
      let node = this.nodes[key]
      this.showCp = node.cp
      this.showId = node.id
      this.showClass = node.class
      this.showStyle = node.style
      this.showHeader = node.header
    },
    digui (fid, a) {
      let that = this
      let h = ''
      for (let item of a) {
        let code = 'cp' + parseInt(Math.random() * 1000)
        that.nodes[code] = item
        let stylestr = ''
        for (let key in item.style) {
          if (item.style[key] !== '') {
            if (key === 'other') {
              stylestr = stylestr + item.style[key] + ';'
            } else {
              stylestr = stylestr + key + ':' + item.style[key] + ';'
            }
          }
        }
        if (item.children !== undefined && item.children.length > 0) {
          h =
            h +
            `<` +
            item.cp +
            ` id="` +
            item.id +
            `" class="` +
            item.class +
            `" style="` +
            stylestr +
            `" ` +
            item.header +
            ` onclick="showCP('` +
            fid +
            `','` +
            code +
            `')" >` +
            that.digui(code, item.children) +
            `</` +
            item.cp +
            `>`
        } else {
          h =
            h +
            `<` +
            item.cp +
            ` id="` +
            item.id +
            `" class="` +
            item.class +
            `" style="` +
            stylestr +
            `" ` +
            item.header +
            ` onclick="showCP('` +
            fid +
            `','` +
            code +
            `')" ></` +
            item.cp +
            `>`
        }
      }
      return h
    },
    move (e) {
      let odiv = e.target // 获取目标元素

      // 计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
      let x = e.clientX - odiv.offsetLeft
      let y = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 获取拖拽元素的位置
        let left = e.clientX - x
        let top = e.clientY - y
        this.positionX = left
        this.positionY = top
        // console.log(document.documentElement.clientHeight,odiv.offsetHeight)
        // 把拖拽元素 放到 当前的位置
        if (left <= 0) {
          left = 0
        } else if (
          left >=
          document.documentElement.clientWidth - odiv.offsetWidth
        ) {
          // document.documentElement.clientWidth 屏幕的可视宽度
          left = document.documentElement.clientWidth - odiv.offsetWidth
        }

        if (top <= 0) {
          top = 0
        } else if (
          top >=
          document.documentElement.clientHeight - odiv.offsetHeight
        ) {
          // document.documentElement.clientHeight 屏幕的可视高度
          top = document.documentElement.clientHeight - odiv.offsetHeight
        }
        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'
      }
      // 为了防止 火狐浏览器 拖拽阴影问题
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  created () {
    window.showCP = this.showCP
  }
}
</script>
