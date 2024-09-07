<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item index="4">
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style></style>
