import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()
  // 登录按钮点击事件，跳转到登录页
  const loginOnclick = () => {
    navigate('/login')
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={loginOnclick}>登录</button>
        <Link to="/register">注册</Link>
      </div>
    </div>
  )
}
export default Home
