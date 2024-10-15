<template>
  <main>
    <el-button type="primary" @click="isCreatePromoCodeForm = true">Создать промокод</el-button>
    <el-table class="mt-2" :data="promoCodes" style="width: 100%">
      <el-table-column prop="name" label="Промокод" width="180" />
      <el-table-column prop="discount" label="Скидка" />
      <el-table-column prop="quantity" label="Количество" />
      <el-table-column prop="createdAt" label="Дата создания" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ formatDate(scope.row.createdAt) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="existsUp" label="Действителен до" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ formatDate(scope.row.existsUp) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="" width="120">
        <el-button link type="primary" size="small" @click.prevent="editPromocode(row)">
          <span v-if="row.isDisabled">Активировать</span>
          <span v-else>Деактивировать</span>
        </el-button>
      </el-table-column>
      <el-table-column v-slot="{ row }" align="center" prop="status" label="Статус" min-width="120">
        <el-tag v-if="row.isDisabled" class="ml-2" effect="dark" type="info">Не активный</el-tag>
        <el-tag v-else class="ml-2" effect="dark">Активный</el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="" width="120">
        <Icon
          icon="material-symbols-light:delete-outline"
          width="24"
          height="24"
          class="pointer"
          @click="deletePromocode(row)"
        />
      </el-table-column>
    </el-table>
    <el-dialog v-model="isCreatePromoCodeForm" title="Создание промокода" width="500">
      <el-form :model="form" label-position="top">
        <el-form-item label="Название">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Скидка">
          <el-input
            v-model="form.discount"
            :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
            :parser="(value) => value.replace(/\s?|( *)/g, '')"
          />
        </el-form-item>
        <el-form-item label="Дата деактивации">
          <el-date-picker
            v-model="form.existsUp"
            type="date"
            placeholder="Выберите дату"
            :first-day-of-week="1"
            :disabled-date="disabledDate"
            format="YYYY.MM.DD"
          />
        </el-form-item>
        <el-form-item label="Количество">
          <el-input-number v-model="form.quantity" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isCreatePromoCodeForm = false">Отменить</el-button>
          <el-button type="primary" :loading="createPromoCodeLoading" @click="createPromoCode">
            Создать
          </el-button>
        </div>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import {
  getAllPromoCodes,
  editPromocode,
  deletePromocode,
  createPromoCode
} from '../api/promoCodes'
export default {
  data() {
    return {
      promoCodes: [],
      promoCodesLoading: false,
      createPromoCodeLoading: false,
      isCreatePromoCodeForm: false,

      form: {
        name: '',
        discount: null,
        existsUp: '',
        quantity: 0
      }
    }
  },
  mounted() {
    this.getAllPromoCodes()
  },
  methods: {
    async createPromoCode() {
      this.createPromoCodeLoading = true

      this.form.discount = Number(this.form.discount)
      try {
        const res = await createPromoCode(this.form)
        this.getAllPromoCodes()
        this.isCreatePromoCodeForm = false
      } catch (e) {
        console.error(e)
      }
      this.createPromoCodeLoading = false
    },
    async getAllPromoCodes() {
      this.promoCodesLoading = true
      try {
        const res = await getAllPromoCodes()
        this.promoCodes = res
      } catch (e) {
        console.error(e)
      }
      this.promoCodesLoading = false
    },
    formatDate(date) {
      const d = new Date(date)
      return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}.${d.getFullYear()}`
    },
    async editPromocode(promocode, action) {
      this.promoCodesLoading = true
      if (action === 'delete') {
        const isDeleted = true
        await editPromocode(promocode.id, { isDeleted })
        setTimeout(() => {
          this.getAllPromoCodes()
          this.promoCodesLoading = false
        }, 1000)
      } else {
        const isDisabled = !promocode.isDisabled
        await editPromocode(promocode.id, { isDisabled })
        setTimeout(() => {
          this.getAllPromoCodes()
          this.promoCodesLoading = false
        }, 1000)
      }
    },
    async deletePromocode(promocode) {
      this.promoCodesLoading = true
      try {
        await deletePromocode(promocode.id)
      } catch (e) {
        console.error(e)
      }
      this.promoCodesLoading = false
    },
    disabledDate(date) {
      return date.getTime() < Date.now() - 86400000
    }
  }
}
</script>

<style scoped lang="scss"></style>
