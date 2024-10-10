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

/**
 * Получить медиа
 */
export function getMedia() {
  return request({
    url: '/param/public_media',
    method: 'get'
  })
}

/**
 * Получить медиа
 */
export function updateMedia(data) {
  return request({
    url: '/param/public_media',
    method: 'patch',
    data
  })
}

/**
 * Обновить бэкграунд
 */
export function editBackground(data) {
  return request({
    url: '/param/public_media',
    method: 'patch',
    data
  })
}
