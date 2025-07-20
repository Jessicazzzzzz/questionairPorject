import { FC, useState } from 'react'
import styles from '@/pages/Common.module.scss'
import ListSearch from '@/components/ListSearch'
import { useRequest, useTitle } from 'ahooks'
import { Empty, Table, Tag, Typography, Button, Space, Modal, message, Spin } from 'antd'

import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { QuestionItem } from '../List'
import ListPage from '@/components/ListPage'
import { deleteQuestionService, updateQuestionService } from '@/services/question'

const tableColumns = [
  {
    // key 循环列的key,如果dataIndex一样,可以不写
    title: '问卷标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    key: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag> // isPublished ? '已发布' : '未发布'
    },
  },

  {
    title: '回答数量',
    dataIndex: 'answerCount',
    key: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
  },
]

const ManageTrash: FC = () => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const questionLists = data?.data?.list || []
  const total = data?.data?.total
  useTitle('回收站')

  const { Title } = Typography

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDelete: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([]) // 删除成功之后,重新刷新了页面,恢复和彻底删除的按钮应该是不能点击的,所以要重置
      },
    }
  )
  // 彻底删除
  const tryDelete = () => {
    Modal.confirm({
      title: '彻底删除',
      content: '确定要彻底删除吗,删除以后不可恢复?',
      onOk() {
        deleteQuestionPermanently()
      },
      onCancel() {
        message.error('取消彻底删除')
      },
    })
  }

  const { run: deleteQuestionPermanently } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('彻底删除成功')
        refresh() // 手动刷新列表
        setSelectedIds([]) // 删除成功之后,重新刷新了页面,恢复和彻底删除的按钮应该是不能点击的,所以要重置
      },
    }
  )
  const TableEle = (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={tryDelete}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={questionLists}
        pagination={false}
        rowKey={(q: QuestionItem) => q._id}
        rowSelection={{
          type: 'checkbox',
          // 选中的每一行的数据
          // 当选择了一行数据的时候,就将这行的id存储到selectedIds中
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
          {/* {selectedIds} */}
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <>
          <div className={styles.content}>
            {!loading && questionLists.length === 0 && <Empty description="暂无数据" />}
            {questionLists.length > 0 && TableEle}
          </div>
          <div className={styles.footer}>
            <ListPage total={total}></ListPage>
          </div>
        </>
      )}
    </>
  )
}
export default ManageTrash
