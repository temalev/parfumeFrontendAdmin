import request from '@/utils/request'

/**
 * Получить все заказы
 */
export function getProducts() {
  return request({
    url: '/api/v1/products',
    method: 'get'
  })
}
