<template>
 <el-menu mode="vertical" unique-opened :default-active="$route.path" class="el-menu-vertical-demo">
  <sidebar-item :routes="routes"></sidebar-item>
 </el-menu>
</template>
<script>
import sidebarItem from './sidebarItem'
export default {
  components: { sidebarItem },
  computed: {
    routes () {
      return global.antRouter
    }
  }
}
</script>
