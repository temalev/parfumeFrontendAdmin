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

/**
 * Запустить синхронизацию
 */
export function startSync() {
  return request({
    url: '/api/v1/products/sync/start',
    method: 'post'
  })
}

/**
 * Проверить синхронизацию
 */
export function getSyncStatus() {
  return request({
    url: '/api/v1/products/sync',
    method: 'get'
  })
}
/**
 * Получить товары для синхронизации
 */
export function getSyncProducts() {
  return request({
    url: '/api/v1/sync-products',
    method: 'get'
  })
}
