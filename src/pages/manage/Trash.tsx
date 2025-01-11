import { FC, useState } from 'react'
import styles from '@/pages/Common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Table, Tag, Typography, Button, Space, Modal, message } from 'antd'
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
    answerCount: 10,
    createAt: '3月10 13:12',
  },
]

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
  useTitle('回收站')
  // 彻底删除提示
  const handleCompleteDelete = () => {
    Modal.confirm({
      title: '彻底删除',
      content: '确定要彻底删除吗,删除以后不可恢复?',
      onOk() {
        message.success('彻底删除成功')
      },
      onCancel() {
        message.error('取消彻底删除')
      },
    })
  }
  const { Title } = Typography
  const [questionList, setQuestionList] = useState(rawQuestionList)
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const TableEle = (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={handleCompleteDelete}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={tableColumns}
        dataSource={questionList}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          // 选中的每一行的数据
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
        <div className={styles.right}>搜索:{selectedIds}</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableEle}
      </div>
      <div className={styles.footer}></div>
    </>
  )
}
export default ManageTrash
