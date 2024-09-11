<template>
  <div class="products-view">
    <div class="products-view-header">
      <h1>Товары</h1>
    </div>

    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="Название" width="180" />
      <el-table-column prop="brand" label="Бренд" />
      <el-table-column prop="description" label="Описание" />
      <el-table-column prop="price" label="Стоимость" />
    </el-table>
  </div>
</template>

<script>
import { getProducts } from '../api/products'

export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const res = await getProducts()
        this.products = res
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
