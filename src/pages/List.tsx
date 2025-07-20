import { FC, useState, useEffect, useRef, useMemo } from 'react'
import styles from './Common.module.scss'
import QuestionCard from '../components/QuestionCard'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListsService } from '@/services/question'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '@/components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_KEY } from '../constant/index'

import { LIST_PAGE_SIZE } from '@/constant'
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
  // 为什么不用这个自定义的hook
  // 因为自定义的hook ,会自动跟新page,pageSize ,但是我们load more , 是不能跟新url 的page,pageSize的
  // const { data, loading } = useLoadQuestionListData()
  // const list = data?.data?.list || []
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
  // const lastScrollX = useRef(0)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) // 全部的列表的数据,上划加载累加数据
  const [total, setTotal] = useState(0)
  // 标记是否开始加载,因为防抖它会有个延迟,所以要加一个标记,
  // 不然会显示empty ,数据total == 0
  const [started, setStarted] = useState(false)
  const haveMoreData = list.length < total
  const [searchParams] = useSearchParams() // url 中虽然没有page ,pageSize, 但是有keyword
  const keyword = searchParams.get(LIST_SEARCH_KEY) || ''

  const { run: load, loading } = useRequest(
    async () => {
      const res = await getQuestionListsService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return res.data
    },
    {
      manual: true,
      // 如果执行成功,从服务端返回的数据会赋值给data
      onSuccess(data) {
        const { total, list: l = [] } = data
        setTotal(total)
        setList(list.concat(l)) // 累加数据
        setPage(page + 1) // 下一页
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  // 尝试触发加载,防抖

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      // console.log("domRect",domRect.bottom);
      // console.log("document.body.clientHeight",document.body.clientHeight);
      // 需要引入 import 'antd/dist/antd.css' 来引入

      if (domRect.bottom <= document.body.clientHeight - 65) {
        load() // 真正的加载数据
        setStarted(true) // 这个就是已经开始了,是为了防止出现empty
      }
    },
    {
      wait: 1000,
    }
  )

  // 当searchParams发生变化时，它就会发生变化,这个里面是有keyword 的参数的
  // 这个是通过searchBar 来控制的
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  // 当页面滚动的时候,要触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', () => {
        // 如果是横向的滚动,就不进行加载
        // const currentScrollX = window.scrollX
        // if (currentScrollX !== lastScrollX.current) {
        //   lastScrollX.current = currentScrollX
        //   return
        // }
        tryLoadMore()
      }) // 要考虑防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 对于搜索框,如果有搜索关键字,那么就要情空所有的配置,重新加载页面
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])
  const { Title } = Typography
  useTitle('小牧问卷调查-我的问卷')

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) {
      return <Spin></Spin>
    }
    if (total == 0) return <Empty description="暂无数据"></Empty>
    if (!haveMoreData) {
      return <div>没有更多数据了...</div>
    }
    return <div>开始加载数据</div>
  }, [started, loading, haveMoreData, total])
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

      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: QuestionItem) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>

      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
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
