import request from '@/utils/request'

/**
 * Вход
 */
export function getMe() {
  return request({
    url: '/api/v1/users/me',
    method: 'get'
  })
}

/**
 * Вход
 */
export function logIn(data) {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data
  })
}

/**
 * Вход
 */
export function getCode(data) {
  return request({
    url: '/api/v1/auth/code/call',
    method: 'post',
    data
  })
}

/**
 * Выход
 */
export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}
