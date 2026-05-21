<template>
  <div class="main">
    <header></header>
    <div class="body">
      <left-menu />
      <RouterView :orders="orders" />
      <el-dialog v-model="dialogFormVisible" title="Вход" width="500" :close-on-click-modal="false">
        <el-form :model="form" @submit.prevent="logIn">
          <el-form-item label="Email">
            <el-input
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="Введите email"
            />
          </el-form-item>
          <el-form-item label="Пароль">
            <el-input
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              show-password
              placeholder="Введите пароль"
              @keyup.enter="logIn"
            />
          </el-form-item>
          <div v-if="loginError" class="login-error">{{ loginError }}</div>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              type="primary"
              :loading="loginLoading"
              :disabled="!form.email || !form.password"
              @click="logIn"
            >
              Войти
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu.vue'
import { getMe, logIn } from './api/login'

export default {
  components: { LeftMenu },
  data() {
    return {
      dialogFormVisible: false,
      loginLoading: false,
      loginError: '',
      form: {
        email: '',
        password: ''
      },
      orders: []
    }
  },
  mounted() {
    this.getMe()
  },
  methods: {
    async getMe() {
      try {
        await getMe()
      } catch (e) {
        this.dialogFormVisible = true
      }
    },
    async logIn() {
      if (!this.form.email || !this.form.password) return
      this.loginError = ''
      this.loginLoading = true
      try {
        await logIn({
          email: this.form.email.trim().toLowerCase(),
          password: this.form.password
        })
        this.dialogFormVisible = false
        this.form.password = ''
        await this.getMe()
      } catch (e) {
        this.loginError = e?.message || 'Не удалось войти. Проверьте email и пароль.'
      } finally {
        this.loginLoading = false
      }
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
  height: 100%;
}
.body {
  display: flex;
  width: 100%;
  height: 100%;
}
.login-error {
  color: #f56c6c;
  font-size: 13px;
  margin-top: 4px;
}
</style>
