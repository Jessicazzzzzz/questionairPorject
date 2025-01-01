import { FC, useState } from 'react'
import styles from './List.module.scss'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from 'ahooks'
// import { useSearchParams } from 'react-router-dom'
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
  {
    _id: '3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 40,
    createAt: '4月10 13:12',
  },
]
const List: FC = () => {
  const [questionlist] = useState(rawQuestionList)
  // const [searchParams] = useSearchParams()
  // console.log("keyword",searchParams.get('keyword'));
  useTitle('小牧问卷调查-我的问卷')
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionlist.map(item => {
          const { _id } = item
          return <QuestionCard key={_id} {...item} />
        })}
      </div>
      <div className={styles.footer}>分页 </div>
    </>
  )
}

export default List
