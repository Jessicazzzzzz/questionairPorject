import { FC } from 'react'
import styles from '@/pages/Common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '@/components/ListSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { QuestionItem } from '../List'

const ManageStar: FC = () => {
  useTitle('小牧星标问卷')
  const { Title } = Typography
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const questionLists = data?.data?.list || []
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
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div className={styles.content}>
          {!loading && questionLists.length === 0 && <Empty description="暂无数据" />}
          {questionLists.length > 0 &&
            questionLists.map((item: QuestionItem) => {
              return <QuestionCard key={item._id} {...item} />
            })}
        </div>
      )}

      <div className={styles.footer}>分页</div>
    </>
  )
}
export default ManageStar
