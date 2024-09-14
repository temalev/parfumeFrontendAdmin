import request from '@/utils/request'

/**
 * Получить все заказы пользователя
 */
export function getOrders() {
  return request({
    url: '/api/v1/orders',
    method: 'get'
  })
}

/**
 * Получить все заказы
 */
export function getAllOrders() {
  return request({
    url: '/api/v1/orders/all',
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
