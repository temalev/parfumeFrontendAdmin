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

/**
 * Подтвердить заказ
 */
export function approveOrder(id) {
  return request({
    url: `/api/v1/orders/${id}/approve`,
    method: 'post'
  })
}
