import { FC } from 'react'
import styles from './Common.module.scss'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Spin, Typography } from 'antd'
import ListSearch from '@/components/ListSearch'

import useLoadQuestionListData from '../hooks/useLoadQuestionListData'
// import { useSearchParams } from 'react-router-dom'
// const rawQuestionList = [
//   {
//     _id: '1',
//     title: '问卷1',
//     isPublished: true,
//     isStar: true,
//     answerCount: 10,
//     createAt: '3月10 13:12',
//   },
//   {
//     _id: '2',
//     title: '问卷2',
//     isPublished: false,
//     isStar: true,
//     answerCount: 13,
//     createAt: '6月10 10:12',
//   },
//   {
//     _id: '3',
//     title: '问卷3',
//     isPublished: true,
//     isStar: false,
//     answerCount: 40,
//     createAt: '4月10 13:12',
//   },
// ]
const List: FC = () => {
  // const [list, setQuestionLists] = useState([])

  const { data, loading } = useLoadQuestionListData()
  const list = data?.data?.list || []
  // if(!data) return;
  // const {list=[]} = data.data
  // useEffect(() => {
  //   //   // async function getQuestionList() {
  //   //   //   const res = await getQuestionListsService()
  //   //   //   const { total,list } = res.data
  //   //   //   setQuestionLists(list)
  //   //   //   setTotal(total)
  //   //   //   console.log("list page",res.data.list)
  //   //   // }
  //   //   // getQuestionList()

  //   if (data) {
  //     const { list } = data.data
  //     setQuestionLists(list)
  //   }
  // }, [data, loading])

  // const [searchParams] = useSearchParams()
  // console.log("keyword",searchParams.get('keyword'));
  const { Title } = Typography
  useTitle('小牧问卷调查-我的问卷')
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      ) : (
        <div className={styles.content}>
          {list.length > 0 &&
            list.map((item: QuestionItem) => {
              const { _id } = item
              return <QuestionCard key={_id} {...item} />
            })}
        </div>
      )}

      <div className={styles.footer}>load more</div>
    </>
  )
}
export interface QuestionItem {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
  isDeleted: boolean
}

export default List
