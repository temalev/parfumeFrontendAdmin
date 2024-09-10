<template>
  <main>
    <div class="card">
      <h4>Заказы</h4>
      <div class="card-value">{{ orders.length }}</div>
    </div>
  </main>
</template>
<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.card {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
}

.card-value {
  font-size: 18px;
}
</style>
