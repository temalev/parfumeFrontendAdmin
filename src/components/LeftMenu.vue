<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item index="1" @click="$router.push({ name: 'ordersList' })">
      <template #title>Заказы</template>
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push({ name: 'productsList' })">
      <template #title>Товары</template>
    </el-menu-item>
    <el-menu-item index="3" @click="$router.push({ name: 'sync' })">
      <template #title>Синхронизация</template>
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
