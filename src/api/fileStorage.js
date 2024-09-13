import request from '@/utils/request'

export function uploadFile(file, params) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/api/v1/storage/image',
    method: 'post',
    params,
    data: formData
  })
}
