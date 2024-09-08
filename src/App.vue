<template>
  <div class="main">
    <header></header>
    <div class="body">
      <left-menu />
      <RouterView />
      <el-dialog v-model="dialogFormVisible" title="Вход" width="500">
        <el-form v-if="step === 1" :model="form">
          <el-form-item label="Номер телефона">
            <el-input
              v-model="form.phone"
              style="width: 240px"
              placeholder="Введите номер телефона"
              :formatter="formatPhone"
              :parser="parsePhone"
            />
          </el-form-item>
        </el-form>
        <el-form v-if="step === 2" :model="form">
          <el-form-item label="Код доступа">
            <el-input v-model="form.code" style="width: 240px" placeholder="Введите код" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="step === 2 ? (step = 1) : (dialogFormVisible = false)"
              >Cancel</el-button
            >
            <el-button v-if="step === 1" type="primary" @click="getCode(), (step = 2)">
              Confirm
            </el-button>
            <el-button v-else type="primary" @click="logIn()"> Confirm </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu.vue'
import { getMe, logIn, getCode } from './api/login'

export default {
  components: { LeftMenu },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        phone: '',
        code: ''
      },
      step: 1,
      uuid: null
    }
  },
  mounted() {
    this.getMe()
  },
  methods: {
    async getMe() {
      try {
        const res = await getMe()
      } catch (e) {
        this.dialogFormVisible = true
      }
    },
    async getCode() {
      const data = {
        phoneNumber: this.form.phone
      }
      try {
        const res = await getCode(data)
        this.uuid = res.uuid
      } catch (e) {
        this.dialogFormVisible = true
      }
    },
    async logIn() {
      const data = {
        uuid: this.uuid,
        code: this.form.code
      }
      try {
        const res = await logIn(data)
      } catch (e) {
        this.dialogFormVisible = true
      }
    },
    formatPhone(value) {
      if (!value) return ''

      // Удаляем все, кроме цифр
      const cleanedValue = value.replace(/\D/g, '')

      // Ограничим ввод до 11 цифр (7 для России + 10 цифр номера)
      const match = cleanedValue.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)

      if (!match) {
        return cleanedValue
      }

      let formatted = '+7' // Формируем номер с +7 для России

      // Если есть код города
      if (match[2]) {
        formatted += ` (${match[2]}`
      }

      // Если есть первая часть номера
      if (match[3]) {
        formatted += `) ${match[3]}`
      }

      // Если есть первая пара цифр
      if (match[4]) {
        formatted += `-${match[4]}`
      }

      // Если есть вторая пара цифр
      if (match[5]) {
        formatted += `-${match[5]}`
      }

      return formatted
    },
    parsePhone(value) {
      return value.replace(/\D/g, '') // Удалить все нецифровые символы
    }
  }
}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.main {
  display: flex;
  flex-direction: column;
}
.body {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
