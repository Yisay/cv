<template>
  <el-container style="height:100%;">
    <el-header>
      <el-menu default-active="/" :router="true">
        <el-menu-item index="/">返回主页</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane label="快捷爬虫"><el-button type="" @click='getdaili'>获取代理ip</el-button></el-tab-pane>
        <el-tab-pane label="自定义">
          <el-form label-width="100px" style="width:830px">
            <el-input v-model="url" style="width:830px">
              <template slot="prepend">网站</template>
            </el-input>
            <div>
              <div v-for="(s, index) in search" :key="index">
                <el-divider style="width:750px"></el-divider>
                <div>第{{index+1}}层循环</div>
                <div v-for="(data, sindex) in s" :key="sindex">
                  <el-tag style="width:50px;">{{data.type?'字符串':'整数'}}</el-tag>
                  <el-switch
                    v-model="data.type"
                    active-color="#a0a0a0"
                    inactive-color="#696969"
                    @change="changetype(data)"
                  ></el-switch>
                  <el-input v-model="data.key" style="width:110px" size="small">
                    <template class="p2" slot="prepend" style="padding:0 2px">键</template>
                  </el-input>

                  <el-input v-model="data.start" style="width:110px" size="small">
                    <template class="p2" slot="prepend">初值</template>
                  </el-input>
                  <el-input v-model="data.end" style="width:110px" size="small">
                    <template class="p2" slot="prepend">终值</template>
                  </el-input>
                  <el-input v-model="data.step" style="width:100px" size="small">
                    <template class="p2" slot="prepend">步长</template>
                  </el-input>
                  <el-input v-model="data.fornumber" style="width:110px" size="small" type="number">
                    <template class="p2" slot="prepend">循环次数</template>
                  </el-input>
                  <el-checkbox-button v-model="data.loop">闭环</el-checkbox-button>
                  <el-button @click.prevent="remove(index,sindex)" size="small">删除</el-button>
                </div>
                <el-button @click.prevent="add(index)" size="small">新增同级</el-button>
              </div>
              <el-button @click.prevent="addchildern()" size="small">新增子循环</el-button>
            </div>
            <el-divider style="width:750px"></el-divider>结果筛选
            <el-button @click.prevent="addpart()" size="small">新增筛选器</el-button>
            <div v-for="(p, index) in part" :key="index" style="width:750px">
              <div class="flex">
                <el-input v-model="p.start" placeholder style="width:200px;padding-right:20px">
                  <template slot="prepend">前边界</template>
                </el-input>
                <el-input v-model="p.end" placeholder style="width:200px">
                  <template slot="prepend">后边界</template>
                </el-input>
                <el-button @click.prevent="removepart(index)" size="small">删除</el-button>
              </div>
            </div>
            <el-divider style="width:750px"></el-divider>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('search')">重置</el-button>
          </el-form>
        </el-tab-pane>
        <div>
            <el-tabs type="card">
              <el-tab-pane
                :key="rowindex"
                v-for="(row,rowindex) in result"
                :label="'结果'+(rowindex+1)"
              >
                <div class="flex" style="min-width: 0;flex-direction: row">
                  <div
                    v-for="(item, colindex) in row"
                    :key="colindex"
                    style="margin:4px;flex: 1;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                  >
                    <div v-for="(i, index) in item" :key="index">
                      <div>{{i}}</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      value2: true,
      url: '',
      search: [],
      part: [],
      result: []
    }
  },
  methods: {
    submitForm () {
      let that = this
      let params = new URLSearchParams()
      that.search.forEach(function (item, index) {
        item.forEach(function (i, index) {
          if (i['type']) {
            i['start'] = i['start'] + ''
            i['end'] = i['end'] + ''
            i['step'] = i['step'] + ''
            i['now'] = i['start'] + ''
            console.log(i['type'])
          } else {
            i['start'] = parseInt(i['start'])
            i['end'] = parseInt(i['end'])
            i['step'] = parseInt(i['step'])
            i['now'] = parseInt(i['start'])
            console.log(i['type'])
          }
        })
      })
      params.append('search', JSON.stringify(that.search))
      params.append('url', that.url)
      params.append('part', JSON.stringify(that.part))
      axios
        .post('http://api.25cl.cn/project/redog/select', params)
        .then((res) => {
          that.result = res.data
        })
    },
    getdaili () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/redog/getdaili', {params: {'number': 1}})
        .then((res) => {
          that.result = res.data
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    remove (index, sindex) {
      console.log(this.search[index][sindex])
      this.search[index].splice(sindex, 1)
      if (this.search[index].length === 0) {
        this.search.splice(index, 1)
      }
    },
    add (index) {
      this.search[index].push({
        key: '',
        start: '',
        end: '',
        step: '',
        fornumber: 1,
        now: '',
        loop: 0,
        type: true
      })
    },
    addchildern (ode) {
      this.search.push([
        {
          key: '',
          start: '',
          end: '',
          step: '',
          fornumber: 1,
          now: '',
          loop: 0,
          type: true
        }
      ])
    },
    addpart () {
      this.part.push({
        start: '',
        end: ''
      })
    },
    removepart (index) {
      this.part.splice(index, 1)
    },
    changetype (i) {
      if (i['type']) {
        i['key'] = ''
        i['start'] = ''
        i['end'] = ''
        i['step'] = ''
        i['now'] = ''
      } else {
        i['key'] = ''
        i['start'] = 0
        i['end'] = 0
        i['step'] = 0
        i['now'] = 0
      }
    }
  },
  mounted () {}
}
</script>
