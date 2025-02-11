import axios, { ResDataType } from './ajax'
type SearchOption = {
  keyword: string
  //page
  //pageSize
  isStar: boolean
  isDeleted: boolean
  pageSize?: number // 每页显示数量
  page?: number // 当前页数
}
// import type {ResDataType} from './ajax';
// 获取单个问卷
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.get(url)
  return data
}
// 创建问卷
export async function createQuestionListService(): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.post(url)
  return data
}
// 获取(查询)问卷列表
export async function getQuestionListsService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.get(url, { params: opt })
  return data
}
