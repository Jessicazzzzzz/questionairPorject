import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Login: FC = () => {
  const history = useNavigate()
  const backOnclick = () => {
    history(-1)
  }

  return (
    <>
      <p>Login</p>
      <button onClick={backOnclick}>back</button>
    </>
  )
}
export default Login
