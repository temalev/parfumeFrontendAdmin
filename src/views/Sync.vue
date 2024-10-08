<template>
  <div class="products-view">
    <div class="products-view-header">
      <h1>Товары ({{ products?.length }})</h1>
      <div class="d-flex gap-3 align-center">
        {{ SYNC_STATUS[syncStatus?.statusId] }}
        <el-button
          v-if="syncStatus?.statusId === 3"
          @click="deleteSync"
          type="danger"
          :loading="syncLoading"
          >Отменить синхронизацию</el-button
        >
        <el-button
          v-if="syncStatus?.statusId === 3"
          @click="performSync"
          type="primary"
          :loading="syncLoading"
          >Выполнить синхронизацию</el-button
        >
        <el-button
          v-if="
            syncStatus?.statusId === 0 ||
            syncStatus?.statusId === 1 ||
            syncStatus?.statusId === 2 ||
            syncStatus?.statusId === 4
          "
          @click="getSyncStatus"
          :loading="syncLoading"
          type="primary"
          >Проверить синхронизацию</el-button
        >
        <el-button
          v-if="!syncStatus?.statusId || syncStatus?.statusId === 6"
          @click="sync"
          :loading="syncLoading"
          type="primary"
          >Получить новые товары</el-button
        >
      </div>
    </div>
    <el-alert
      v-if="syncStatus?.errorsCount && syncStatus?.statusId !== 6"
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
      <el-table-column prop="price" label="Фото">
        <template #default="props">
          <el-upload
            :file-list="fileList(props.row.images)"
            :limit="1"
            :multiple="false"
            :http-request="(val) => uploadImageRequest(val, props.row.id)"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            +
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getSyncProducts,
  startSync,
  getSyncStatus,
  deleteSync,
  performSync,
  editSyncProduct
} from '../api/products'
import { uploadImage } from '../api/fileStorage'

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
      syncLoading: false,
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
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.getSyncStatus()
  },
  computed: {
    buttonName() {
      switch (this.syncStatus?.statusId) {
        case 6:
          return 'Синхронизировать'

        default:
          return 'Обновить товары'
      }
    }
  },
  methods: {
    fileList(images) {
      return images.map((el) => {
        return {
          url: el
        }
      })
    },
    async getSyncProducts() {
      this.syncLoading = true
      try {
        const res = await getSyncProducts()
        this.products = res
      } catch (e) {
        console.error(e)
      }
      this.syncLoading = false
    },
    async deleteSync() {
      this.syncLoading = true
      try {
        const res = await deleteSync()
        setTimeout(() => {
          this.getSyncStatus()
        }, 2000)
      } catch (e) {
        console.error(e)
      }
    },
    async performSync() {
      this.syncLoading = true
      try {
        const res = await performSync()
        setTimeout(() => {
          this.getSyncStatus()
        }, 2000)
      } catch (e) {
        console.error(e)
      }
    },
    async getSyncStatus() {
      this.syncLoading = true
      try {
        const res = await getSyncStatus()
        this.syncStatus = res
      } catch (e) {
        console.error(e)
        this.syncStatus = null
      }
      this.getSyncProducts()
    },
    sync() {
      this.startSync()
    },
    async startSync() {
      this.syncLoading = true
      try {
        await startSync()
        setTimeout(() => {
          this.getSyncStatus()
        }, 2000)
      } catch (e) {
        console.error(e)
      }
    },
    handleRemove(uploadImage, uploadImages) {
      console.log(uploadImage, uploadImages)
    },
    handlePictureCardPreview(uploadImage) {
      this.dialogImageUrl = uploadImage.url
      this.dialogVisible = true
    },
    async uploadImageRequest({ file, onSuccess, onError }, id) {
      const formData = new FormData()
      formData.append('file', file)
      console.log(id)

      try {
        const res = await uploadImage(file) // Ваш вызов функции загрузки
        onSuccess(res) // Сообщаем об успешной загрузке
        this.editProduct(res.full, id)
      } catch (e) {
        console.error(e)
        onError(e) // Сообщаем о неудачной загрузке
      }
    },
    async editProduct(file, id) {
      const data = {
        images: [file]
      }
      try {
        const res = await editSyncProduct(data, id)
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
