import { FC } from 'react'
import { Space, Typography, Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Register.module.scss'
import { LOGIN_PATHNAME } from '../router'
const Register: FC = () => {
  const { Title } = Typography

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined></UserOutlined>
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
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
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={['password']} // 依赖上面的password,password改变的时候,confirm也会改变
          rules={[
            { required: true, message: '请输入确认密码' },
            ({ getFieldValue }) => ({
              validator: (_, value) => {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Link to={LOGIN_PATHNAME}>已有账号,请登录</Link>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
