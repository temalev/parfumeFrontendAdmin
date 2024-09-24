import request from '@/utils/request'

/**
 * Получить текущий курс
 */
export function getPriceCourse() {
  return request({
    url: '/param/price_course',
    method: 'get'
  })
}

/**
 * Обновить курс
 */
export function updatePriceCourse(data) {
  return request({
    url: '/param/price_course',
    method: 'patch',
    data
  })
}
