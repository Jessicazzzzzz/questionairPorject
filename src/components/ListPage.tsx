import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '@/constant'
import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
type PropType = {
  total: number
}
const ListPage: FC<PropType> = pros => {
  const { total } = pros
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  // 动态的调整page 和 pageSize
  // 当searchParams发生变化时,也就是url发生变化的时候,它就会发生变化
  useEffect(() => {
    const page = searchParams.get(LIST_PAGE_PARAM_KEY)
    const size = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)
    if (page) {
      setCurrent(Number(page))
    }
    if (size) {
      setPageSize(Number(size))
    }
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()
  // 点击分页的时候,将page 和 pageSize 放到url中
  const handleChange = (page: number, pageSize: number) => {
    // 1. 将page 和 pageSize 放到url中
    searchParams.set(LIST_PAGE_PARAM_KEY, String(page))
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, String(pageSize))
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handleChange}
    ></Pagination>
  )
}
export default ListPage
