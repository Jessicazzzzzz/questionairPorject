import React, { FC, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
const Logo: FC = () => {
  const { Title } = Typography
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined></FormOutlined>
          </Title>
          <Title>小牧问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
