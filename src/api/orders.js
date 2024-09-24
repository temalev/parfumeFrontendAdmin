import request from '@/utils/request'

/**
 * Получить все заказы пользователя
 */
export function getOrders() {
  return request({
    url: '/orders',
    method: 'get'
  })
}

/**
 * Получить все заказы
 */
export function getAllOrders() {
  return request({
    url: '/orders/all',
    method: 'get'
  })
}

/**
 * Подтвердить заказ
 */
export function approveOrder(id) {
  return request({
    url: `/orders/${id}/approve`,
    method: 'post'
  })
}
