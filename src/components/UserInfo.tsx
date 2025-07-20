import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import userToken from '@/utils/user-token'
const UserInfo: FC = () => {
  // 对已经登录的用户,显示什么
  // 对未登录的用户,显示什么
  const { data } = useRequest(getUserInfoService)

  const nav = useNavigate()
  if (!data) return null
  const { username, nickname } = data.data || {}
  // 清除本地的token 存储
  // 下次就没有token了, 需要重新登录
  const Logout = () => {
    userToken.removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={Logout}>
        退出
      </Button>
    </>
  )
  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )

  return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo
