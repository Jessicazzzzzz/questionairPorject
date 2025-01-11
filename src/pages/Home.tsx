import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router'
import styles from './Home.module.scss'
const Home: FC = () => {
  const navigate = useNavigate()
  const { Title, Paragraph } = Typography

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
