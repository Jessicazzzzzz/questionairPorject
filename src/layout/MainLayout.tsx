import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex, Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const MainLayout: FC = () => {
  const { Header, Footer, Content } = Layout
  return (
    <>
      <Flex gap="middle" wrap>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.left}>
              <Logo></Logo>
            </div>
            <div className={styles.right}>
              <UserInfo></UserInfo>
            </div>
          </Header>
          <Content className={styles.main}>
            <Outlet />
          </Content>
          <Footer className={styles.footer}>
            小牧问卷&copy;2024 - present. All rights reserved.
          </Footer>
        </Layout>
      </Flex>
    </>
  )
}
export default MainLayout
