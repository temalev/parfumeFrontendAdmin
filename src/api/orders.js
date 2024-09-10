import request from '@/utils/request'

/**
 * Получить все заказы
 */
export function getOrders() {
  return request({
    url: '/api/v1/orders',
    method: 'get'
  })
}
