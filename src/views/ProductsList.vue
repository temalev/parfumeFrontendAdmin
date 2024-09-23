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
      <el-table-column prop="images" label="Фото">
        <template #default="props">
          <el-upload
            :file-list="fileList(props.row.images)"
            :limit="1"
            :multiple="false"
            :http-request="(val) => uploadFileRequest(val, props.row.id)"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            +
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProducts, editProduct } from '../api/products'
import { uploadFile } from '../api/fileStorage'

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
    fileList(images) {
      return images.map((el) => {
        return {
          url: el
        }
      })
    },
    async getProducts() {
      try {
        const res = await getProducts()
        this.products = res
      } catch (e) {
        console.error(e)
      }
    },
    handleRemove(uploadFile, uploadFiles) {
      console.log(uploadFile, uploadFiles)
    },
    handlePictureCardPreview(uploadFile) {
      this.dialogImageUrl = uploadFile.url
      this.dialogVisible = true
    },
    async uploadFileRequest({ file, onSuccess, onError }, id) {
      const formData = new FormData()
      formData.append('file', file)
      console.log(id)

      try {
        const res = await uploadFile(file) // Ваш вызов функции загрузки
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
        const res = await editProduct(data, id)
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
