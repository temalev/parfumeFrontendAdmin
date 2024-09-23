<template>
  <el-menu :default-active="$route.name" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item index="home" @click="$router.push({ name: 'home' })">
      <template #title>Главная</template>
    </el-menu-item>
    <el-menu-item index="ordersList" @click="$router.push({ name: 'ordersList' })">
      <template #title>Заказы</template>
    </el-menu-item>
    <el-menu-item index="productsList" @click="$router.push({ name: 'productsList' })">
      <template #title>Товары</template>
    </el-menu-item>
    <el-menu-item index="sync" @click="$router.push({ name: 'sync' })">
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
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$route)
    })
  }
}
</script>

<style></style>
