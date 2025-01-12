import { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_KEY } from '../constant'
const ListSearch: FC = () => {
  const { Search } = Input
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')
  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSearch = (value: string) => {
    // 跳转页面,带上搜索关键字
    navigate({
      pathname,
      search: `${LIST_SEARCH_KEY}=${value}`,
    })
  }
  // 从url中获取搜索关键字,并且写回输入框
  useEffect(() => {
    const searchValue = searchParams.get(LIST_SEARCH_KEY)
    setValue(searchValue || '')
  }, [searchParams])
  return (
    <>
      <Search
        size="large"
        placeholder="请输入关键字"
        value={value}
        onChange={handleSearchValue}
        onSearch={handleSearch}
        enterButton
        style={{ width: 260 }}
        allowClear
      />
    </>
  )
}
export default ListSearch
