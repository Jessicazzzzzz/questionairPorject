import { FC, useState } from 'react'
import styles from '@/pages/Common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import ListSearch from '@/components/ListSearch'

const rawQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 10,
    createAt: '3月10 13:12',
  },
  {
    _id: '2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 13,
    createAt: '6月10 10:12',
  },
]
const ManageStar: FC = () => {
  useTitle('小牧星标问卷')
  const { Title } = Typography
  const [questionLists, setQuestionLists] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {questionLists.length === 0 && <Empty description="暂无数据" />}
        {questionLists.length > 0 &&
          questionLists.map(item => {
            return <QuestionCard key={item._id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}
export default ManageStar
