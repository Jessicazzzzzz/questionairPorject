/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '@/router'
const Login: FC = () => {
  // const navigate = useNavigate()
  const USERNAME_KEY = 'username'
  const PASSWORD_KEY = 'password'
  const [form] = Form.useForm()
  const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
  }
  const deleteUserFromStorage = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }
  const getInfoFromStorage = () => {
    const username = localStorage.getItem(USERNAME_KEY)
    const password = localStorage.getItem(PASSWORD_KEY)
    return { username, password }
  }

  const { Title } = Typography
  const onFinish = (values: any) => {
    console.log('Success:', values)
    const { username, password, remember } = values || {}

    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  useEffect(() => {
    const { username, password } = getInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [form])
  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 2, max: 10, message: '用户名长度为2-10', type: 'string' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母或数字或下划线' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
            {/*正常的每个都是每个表单组件都是name,value ,checkbox 的value 就是等于它checked的属性,我们就用valuePropName来表示他的checked的值,这样选中就是remember=true,没选中就是remember=false*/}
            <Form.Item
              wrapperCol={{ offset: 6, span: 16 }}
              name={'remember'}
              valuePropName="checked"
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME}>注册新用户</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default Login
