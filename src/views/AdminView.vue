<template>
  <main>
    <div class="d-flex gap-4">
      <el-input-number v-model="priceCourse" :min="1" :max="200" />
      <el-button type="primary" @click="updatePriceCourse">Обновить курс</el-button>
    </div>
    <div class="d-flex stories mt-5">
      <el-upload
        :file-list="media.stories"
        action="#"
        list-type="picture-card"
        :http-request="uploadFile"
        :on-success="handleUploadSuccess"
      >
        +

        <template #file="{ file }">
          <div v-loading="!media.stories?.find((el) => el.url === file.url)">
            <video :key="file.url" :data="file.url" playsinline preload="metadata" loop muted>
              <source :src="file.url" type="video/mp4" />
            </video>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <Icon icon="material-symbols-light:fullscreen" width="24" height="24" />
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <Icon icon="material-symbols-light:delete-outline" width="24" height="24" />
              </span>
            </span>
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <video
          :key="dialogImageUrl"
          :data="dialogImageUrl"
          playsinline
          preload="metadata"
          loop
          muted
          autoplay
        >
          <source :src="dialogImageUrl" type="video/mp4" />
        </video>
      </el-dialog>
    </div>
  </main>
</template>
<script>
import {
  getPriceCourse,
  updatePriceCourse,
  getMedia,
  editBackground,
  updateMedia
} from '../api/params'
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
      priceCourse: 0,
      media: { storeis: null },
      dialogVisible: false,
      dialogImageUrl: null
    }
  },
  mounted() {
    this.getPriceCourse()
    // this.editBackground()
    this.getMedia()
  },
  methods: {
    handleFileChange(test) {
      console.log(test)
    },
    handleUploadSuccess(response, file) {
      // Обрабатываем успешную загрузку, обновляем список файлов
      console.log('Upload successful:', response)
    },
    handleRemove(file) {
      const stories = this.media.stories.filter((el) => el.url !== file.url)

      this.updateMediaData({ stories: stories })
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // handleDownload(file){
    //   console.log(file)
    // },
    async getMedia() {
      try {
        const res = await getMedia()
        // Преобразуем массив строк в массив объектов с полями url и uid
        this.media = res.data
      } catch (e) {
        console.error(e)
      }
    },
    async uploadFile({ file, onSuccess, onError }) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await uploadFile(formData)
        onSuccess(res)

        let data = this.media

        if (data?.stories?.length) {
          data.stories.push({ url: res.path })
        } else {
          data = { stories: [{ url: res.path }] }
        }

        this.updateMediaData(data)
      } catch (e) {
        console.error(e)
        onError(e)
      }
    },
    async updateMediaData(data) {
      try {
        const res = await updateMedia({ data })
        this.media = res.data
      } catch (e) {
        console.error(e)
      }
    },
    async editBackground() {
      const data = {
        data: {
          background: 'url'
        }
      }
      try {
        const res = await editBackground(data)
      } catch (e) {
        console.error(e)
      }
    },
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
<style scoped lang="scss">
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

::v-deep {
  .el-upload-list__item {
    width: 135px;
    height: 240px;
    video {
      height: 240px;
      border-radius: 8px;
    }
  }
  .el-dialog {
    width: min-content;

    video {
      height: 500px;
    }
  }
}
</style>
