import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router'
import styles from './Home.module.scss'

import axios from 'axios'
const Home: FC = () => {
  const navigate = useNavigate()
  const { Title, Paragraph } = Typography
  // 不直接使用mockjs 在前端项目中
  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => {
  //   //     console.log(res.json())
  //   //   })
  //   //   .then(data => {
  //   //     console.log('data res', data)
  //   //   })
  //   axios.get('/api/test').then(res => {
  //     console.log(res.data)
  //   })
  // })
  useEffect(() => {
    // 会有跨域的问题
    axios.get('/api/test').then(res => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷100份,发布问卷90 份, 收到答卷980份</Paragraph>
        <div className={styles.info}>
          <Button type="primary" onClick={() => navigate(MANAGE_LIST_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home
