import request from '@/utils/request'

/**
 * Вход
 */
export function getMe() {
  return request({
    url: '/users/me',
    method: 'get'
  })
}

/**
 * Вход
 */
export function logIn(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * Вход
 */
export function getCode(data) {
  return request({
    url: '/auth/code/call',
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
