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
 * Выполнить синхронизацию
 */
export function performSync() {
  return request({
    url: '/api/v1/products/sync',
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
 * Проверить синхронизацию
 */
export function deleteSync() {
  return request({
    url: '/api/v1/products/sync',
    method: 'delete'
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

/**
 * Обновить данные товара
 */
export function editSyncProduct(data, id) {
  return request({
    url: `/api/v1/sync-products/${id}`,
    method: 'patch',
    data
  })
}

/**
 * Обновить данные загруженного товара
 */
export function editProduct(data, id) {
  return request({
    url: `/api/v1/products/${id}`,
    method: 'put',
    data
  })
}
