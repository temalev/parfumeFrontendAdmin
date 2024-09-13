<template>
  <main>
    <div class="d-flex gap-4">
      <el-input-number v-model="priceCourse" :min="1" :max="200" />
      <el-button type="primary" @click="updatePriceCourse">Обновить курс</el-button>
    </div>
  </main>
</template>
<script>
import { getPriceCourse, updatePriceCourse } from '../api/params'
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      priceCourse: 0
    }
  },
  mounted() {
    this.getPriceCourse()
  },
  methods: {
    async getPriceCourse() {
      try {
        const res = await getPriceCourse()
        this.priceCourse = res.value
      } catch (e) {
        console.error(e)
      }
    },
    async updatePriceCourse() {
      const data = {
        value: this.priceCourse
      }
      try {
        const res = await updatePriceCourse(data)
        this.priceCourse = res.value
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style scoped>
main {
  padding: 20px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
}

.card-value {
  font-size: 18px;
}
</style>
