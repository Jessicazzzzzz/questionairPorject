import { useRequest } from 'ahooks'
import { getQuestionListsService } from '../services/question'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_KEY,
} from '@/constant'
import { useSearchParams } from 'react-router-dom'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_KEY) || ''
      const page = searchParams.get(LIST_PAGE_PARAM_KEY) || ''
      const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || LIST_PAGE_SIZE

      const data = await getQuestionListsService({
        keyword,
        isStar,
        isDeleted,
        pageSize,
        page: page ? Number(page) : 1, // 如果没有给值,那么就给默认page 从1开始
      })
      return data
    },
    {
      refreshDeps: [searchParams], //依赖项变化重新请求
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
