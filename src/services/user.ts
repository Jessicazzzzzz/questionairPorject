import axios, { ResDataType } from './ajax'
// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `/api/user/info`
  const data = await axios.get(url)
  return data
}
// 注册用户
export async function registerUserService(data: Partial<userType>): Promise<ResDataType> {
  const url = `/api/user/register`
  const { username, password, nickname } = data
  const res = await axios.post(url, { username, password, nickname: nickname || username })
  return res
}
// 登录用户
export async function loginUserService(data: Partial<userType>): Promise<ResDataType> {
  const url = `/api/user/login`
  const res = await axios.post(url, data)
  return res
}
export type userType = {
  username: string
  password: string
  remember: boolean
  nickname: string
}
