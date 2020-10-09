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
      @mousedown="move">
    <el-popover
      placement="right"
      width="400"
      trigger="manual"
      v-model="menuvisible"
      @click.stop>
    <div
      style="padding: 4px;"
    >
      组件信息
      <el-divider></el-divider>
      <el-input
        v-model="showCp"
        @change="changeCP('cp', showCp)"
      >
        <template slot="prepend">组件类型</template>
      </el-input>
      <el-input
        v-model="showId"
        @change="changeCP('id', showId)"
      >
        <template slot="prepend">id</template>
      </el-input>
      <el-input
        v-model="showClass"
        @change="changeCP('class', showClass)"
      >
        <template slot="prepend">class</template>
      </el-input>
      <el-input
        v-model="showStyle"
        @change="changeCP('style', showStyle)"
      >
        <template slot="prepend">style</template>
      </el-input>
      <el-input
        v-model="showHeader"
        @change="changeCP('header', showHeader)"
      >
        <template slot="prepend">内容</template>
      </el-input>
      添加组件
      <el-divider></el-divider>
      <el-button-group>
  <el-button type="primary" @click="addBefore">添加前</el-button>
  <el-button type="primary" @click="addChildren">子组件</el-button>
  <el-button type="primary" @click="addAfter">添加后</el-button>
  <el-button type="primary" @click="deletecp">删除组件</el-button>
</el-button-group>
    </div>
    <el-button type="primary" icon="el-icon-edit" slot="reference" circle @click="menuvisible = !menuvisible"></el-button>
    </el-popover>
    </div>
    <div v-if="array!==undefined&&array.length>0" id='cpbox' v-html="html" style="width: 100%; height: 100%"></div>
    <div v-else id='cpbox' style="width: 100%; height: 100%;background-color:#eee;padding:1px" @click="newbox">点击新建box</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '',
      fid: '',
      showCp:'div',
      showId: '',
      showClass: '',
      showStyle: '',
      showHeader: '',
      array: [],
      nodes: [],
      html: "",
      menuvisible: false
    };
  },
  mounted() {},
  methods: {
    addChildren() {
      this.nodes[this.key].children.push({
          cp: "div",
          id: "",
          class: "",
          style: "width:50%;height:50%;background-color:#aa0",
          header: "",
          children: []
        })
      console.log(this.array)
      this.createdCP()
    },
    changeCP(item, value) {
      console.log(this.key)
      this.nodes[this.key][item] = value
      this.createdCP();
    },
    addBefore () {
      let childrens = this.nodes[this.fid].children
      for(let index in childrens){
        if(childrens[index]=== this.nodes[this.key]){
          childrens.splice(index,0,{
          cp: "div",
          id: "",
          class: "",
          style: "width:50%;height:50%;background-color:#bbb",
          header: "",
          children: []
        })
          this.createdCP()
          break
        }
      }
    },
    deletecp () {
      let childrens = this.nodes[this.fid].children
      for(let index in childrens){
        if(childrens[index]=== this.nodes[this.key]){
          childrens.splice(index,1)
          this.createdCP()
          break
        }
      }
    },
    newbox () {
      let test = {
          cp: "div",
          id: "",
          class: "",
          style: "width:100%;height:100%",
          header: "",
          children: []
        }
      this.array.push(test)
      this.createdCP()
    },
    
    createdCP() {
      this.html = ""
      this.nodes = []
      console.log('111')
      this.html = this.digui('root',this.array)
    },
    showCP(fid,key) {
      event.cancelBubble=true
      this.fid = fid
      this.key = key
      let node = this.nodes[key]
      this.showCp = node.cp
      this.showId = node.id
      this.showClass = node.class
      this.showStyle = node.style
      this.showHeader = node.header
    },
    digui(fid,a) {
      let that = this
      let h = ''
      for (let item of a) {
        let code = 'cp'+ parseInt(Math.random() * 1000)
        this.nodes[code] = item
        if (item.children !== undefined && item.children.length>0) {
          h =
            h +
            `<` +
            item.cp +
            ` id="` +
            item.id +
            `" class="` +
            item.class +
            `" style="` +
            item.style +
            `" ` +
            item.header +
            ` onclick="showCP('`+ fid +`','` +
            code +
            `')" >` +
            this.digui(code,item.children) +
            `</` +
            item.cp +
            `>`
        } else{
          h =
            h +
            `<` +
            item.cp +
            ` id="` +
            item.id +
            `" class="` +
            item.class +
            `" style="` +
            item.style +
            `" ` +
            item.header +
            ` onclick="showCP('`+ fid +`','` +
            code +
            `')" ></` +
            item.cp +
            `>`
        }
      }
      return h
    },
    move(e){
				let odiv = e.target;// 获取目标元素
				
				//计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
				let x = e.clientX - odiv.offsetLeft;
				let y = e.clientY - odiv.offsetTop;
				document.onmousemove = (e) => {
					// 获取拖拽元素的位置
					let left = e.clientX - x;
					let top = e.clientY - y;
					this.positionX = left;
					this.positionY = top;
					//console.log(document.documentElement.clientHeight,odiv.offsetHeight)
					// 把拖拽元素 放到 当前的位置
					if (left <= 0) {
						left = 0;
					} else if (left >= document.documentElement.clientWidth - odiv.offsetWidth){
						//document.documentElement.clientWidth 屏幕的可视宽度
						left = document.documentElement.clientWidth - odiv.offsetWidth;
					}
					
					if (top <= 0) {
						top = 0;
					} else if (top >= document.documentElement.clientHeight - odiv.offsetHeight){
						// document.documentElement.clientHeight 屏幕的可视高度
						top = document.documentElement.clientHeight - odiv.offsetHeight
						
					}
					odiv.style.left = left + "px";
					odiv.style.top = top + "px"
					
				}
                // 为了防止 火狐浏览器 拖拽阴影问题
				document.onmouseup = (e) => {
					document.onmousemove = null;
            		document.onmouseup = null
				}
    }
  },
  created() {
    window.showCP = this.showCP
  },
}
</script>
