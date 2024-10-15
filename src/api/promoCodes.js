import request from '@/utils/request'

/**
 * Получить все промокоды
 */
export function getAllPromoCodes() {
  return request({
    url: '/promocodes/all',
    method: 'get'
  })
}

/**
 * Изменить промокод
 */
export function editPromocode(id, data) {
  return request({
    url: `/promocodes/${id}`,
    method: 'put',
    data
  })
}

/**
 * Удалить промокод
 */
export function deletePromocode(id) {
  return request({
    url: `/promocodes/${id}`,
    method: 'delete'
  })
}

/**
 * Создать промокод
 */
export function createPromoCode(data) {
  return request({
    url: `/promocodes`,
    method: 'post',
    data
  })
}
