// 加载问卷的数据

import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
// 一开始进入页面是loading 的状态,
// 当返回数据后,loading 变成 false
// 通过useEffect 来加载数据
// 可以复用代码在Edit 和stat 中
export default function useLoadQuestionList() {
  const { id = '' } = useParams()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function getQuestion() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data.data)
  //     setLoading(false)
  //   }
  //   getQuestion()
  // }, [])

  // return {
  //   loading,

  //   questionData,
  // }
  async function load() {
    const data = await getQuestionService(id)
    return data.data
  }
  const { data, loading, error } = useRequest(load)
  return {
    loading,
    questionData: data,
    error,
  }
}
