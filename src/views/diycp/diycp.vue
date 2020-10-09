<template>
  <div style="background-color: #fff; width: 100%; height: 100%">
    <div
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
          <div @click="addarray"><el-tag>Layout 布局</el-tag></div>
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
    </div>
    <div
      style="
        position: absolute;
        background-color: #eeeeeeee;
        right: 0px;
        width: 200px;
        height: 90%;
        padding: 4px;
      "
    >
      组件信息
      <el-divider></el-divider>
      <el-input placeholder="请输入内容">
        <template slot="prepend">id</template>
      </el-input>
      <el-input placeholder="请输入内容">
        <template slot="prepend">class</template>
      </el-input>
      <el-input placeholder="请输入内容">
        <template slot="prepend">style</template>
      </el-input>
      <el-input placeholder="请输入内容">
        <template slot="prepend">内容</template>
      </el-input>
    </div>
  <div>
    <treelist v-for="value in items" :item="value" :key="value.id"></treelist>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      array: [
        {
          cp: 'div',
          id: '',
          class: '',
          style: 'width:100%;height:100%;background-color:#000',
          header: '',
          body: ''
        }
      ],
      items: [
        { id: '10', parent_id: '0', sort: '0', name: '其它', status: '0' },
        { id: '12', parent_id: '0', sort: '0', name: '测试', status: '0' },
        {
          id: '1',
          parent_id: '0',
          sort: '0',
          name: '水果',
          status: '0',
          children: [
            { id: '4', parent_id: '1', sort: '0', name: '香蕉', status: '0' }
          ]
        },
        {
          id: '2',
          parent_id: '0',
          sort: '0',
          name: '饮料',
          status: '0',
          children: [
            { id: '5', parent_id: '2', sort: '0', name: '可乐', status: '0' },
            {
              id: '6',
              parent_id: '2',
              sort: '0',
              name: '酒水',
              status: '0',
              children: [
                {
                  id: '7',
                  parent_id: '6',
                  sort: '0',
                  name: '啤酒',
                  status: '0'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          parent_id: '0',
          sort: '0',
          name: '美食',
          status: '0',
          children: [
            { id: '8', parent_id: '3', sort: '0', name: '红烧鱼', status: '0' }
          ]
        }
      ],
      html: ''
    }
  },
  mounted () {},
  methods: {
    addarray () {
      let that = this
      console.log(this.html)
      for (let value of that.array) {
        that.html =
          that.html +
          '<' +
          value.cp +
          ' class' +
          value.class +
          ' style="' +
          value.style +
          '"></' +
          value.cp +
          '>'
      }
    }
  }
}
</script>
