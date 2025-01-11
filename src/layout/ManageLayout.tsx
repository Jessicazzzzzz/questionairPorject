import React, { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Space } from 'antd'
const ManageLayout: FC = () => {
  const navigate = useNavigate()
  // 获取当前路由地址
  const pathName = useLocation().pathname
  // console.log(pathName);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建问卷
            </Button>
            <Divider style={{ borderColor: 'transparent' }} />
            <Button
              type={pathName === '/manage/list' ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => navigate('/manage/list')}
            >
              我的问卷
            </Button>

            <Button
              type={pathName.startsWith('/manage/star') ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => navigate('/manage/star')}
            >
              星标问卷
            </Button>

            <Button
              type={pathName === '/manage/trash' ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => navigate('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default ManageLayout
