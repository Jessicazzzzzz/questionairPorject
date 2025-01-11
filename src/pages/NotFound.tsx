import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router'
const NotFound: FC = () => {
  const nag = useNavigate()
  return (
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => nag(MANAGE_LIST_PATHNAME)}>
          Back Home
        </Button>
      }
    ></Result>
  )
}
export default NotFound
