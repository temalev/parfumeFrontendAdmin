import request from '@/utils/request'

export function uploadImage(file, params) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/storage/image',
    method: 'post',
    params,
    data: formData
  })
}

export function uploadFile(file) {
  return request({
    url: '/storage/file',
    method: 'post',
    data: file
  })
}
