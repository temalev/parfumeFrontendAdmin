import request from '@/utils/request'

/**
 * Получить текущий курс
 */
export function getPriceCourse() {
  return request({
    url: '/api/v1/param/price_course',
    method: 'get'
  })
}

/**
 * Обновить курс
 */
export function updatePriceCourse(data) {
  return request({
    url: '/api/v1/param/price_course',
    method: 'patch',
    data
  })
}
