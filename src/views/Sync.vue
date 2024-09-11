<template>
  <div class="products-view">
    <div class="products-view-header">
      <h1>Товары</h1>
      <div class="d-flex gap-3 align-center">
        {{ SYNC_STATUS[syncStatus?.statusId] }}
        <el-button @click="sync" type="primary">Синхронизировать</el-button>
      </div>
    </div>
    <el-alert
      v-if="syncStatus?.errorsCount"
      title="Найдены ошибки"
      type="error"
      description="More text description"
      show-icon
      class="mb-4"
    >
      <p v-for="(error, i) in syncStatus?.data?.errors" :key="i">{{ error }}</p>
    </el-alert>
    <el-table v-loading="syncProductsLoading" :data="products" style="width: 100%">
      <el-table-column prop="name" label="Название" width="180" />
      <el-table-column prop="brand" label="Бренд" />
      <el-table-column prop="description" label="Описание" />
      <el-table-column prop="price" label="Стоимость" />
    </el-table>
  </div>
</template>

<script>
import { getSyncProducts, startSync, getSyncStatus } from '../api/products'

export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products: [],
      syncProductsLoading: false,
      syncStatus: null,
      SYNC_STATUS: {
        0: 'Создан',
        1: 'Запущена',
        2: 'Загружена',
        3: 'Ожидает подтверждения',
        4: 'Ожидает обновления',
        5: 'Обновляется',
        6: 'Завершена',
        7: 'Ошибка'
      }
    }
  },
  mounted() {
    this.getSyncProducts()
    this.getSyncStatus()
  },
  methods: {
    async getSyncProducts() {
      this.syncProductsLoading = true
      try {
        const res = await getSyncProducts()
        this.products = res
      } catch (e) {
        console.error(e)
      }
      this.syncProductsLoading = false
    },
    async getSyncStatus() {
      this.syncStatusLoading = true
      try {
        const res = await getSyncStatus()
        this.syncStatus = res
      } catch (e) {
        console.error(e)
      }
      this.syncStatusLoading = false
    },
    sync() {
      this.startSync()
    },
    async startSync() {
      try {
        await startSync()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.products-view {
  margin: 20px;
  width: 100%;
}

.products-view-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
