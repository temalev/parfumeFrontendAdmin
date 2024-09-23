<template>
  <main>
    <div v-loading="ordersLoading" class="card-list">
      <template v-if="orders.length">
        <order-card
          v-for="order in orders"
          :key="order?.id"
          :order="order"
          @updateList="getOrders()"
        />
      </template>
    </div>
  </main>
</template>

<script>
import OrderCard from '../components/OrderCard.vue'
import { getAllOrders } from '../api/orders'
export default {
  components: { OrderCard },
  data() {
    return {
      orders: [],
      ordersLoading: false
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      this.ordersLoading = true
      try {
        const res = await getAllOrders()
        this.orders = res
      } catch (e) {
        console.error(e)
      }
      this.ordersLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.card-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  height: 100%;
}
</style>
