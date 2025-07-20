/**
存储以及获取token 
*/

const TOKEN_KEY = 'USER_TOKEN'
export default {
  // 存储token
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  // 获取token
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  // 删除token
  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
