<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link
        v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
        :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name"
        style="text-decoration:none"
      >
        <el-menu-item
          :index="item.path+'/'+item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <i :class="item.children[0].icon" />
          <span
            v-if="item.children[0]&&item.children[0].title"
            slot="title"
          >{{item.children[0].title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.title||item.path" :key="item.id">
        <template slot="title">
          <i :class="item.icon" />
          <span v-if="item&&item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>
          <router-link
            v-else
            :to="item.path+'/'+child.path"
            :key="child.name"
            style="text-decoration:none"
          >
            <el-menu-item :index="item.path+'/'+child.path">
              <i :class="child.icon" />
              <span v-if="child&&child.title" slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
</style>
