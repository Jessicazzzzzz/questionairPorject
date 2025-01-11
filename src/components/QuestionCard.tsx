import { FC } from 'react'
import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from 'antd'
import styles from './QuestionCard.module.scss'
import {
  CopyOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '../router'
type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { title, isPublished, answerCount, createAt, isStar } = props
  const navigate = useNavigate()
  const { confirm } = Modal
  const handleDuplicate = () => {
    message.success('复制成功')
  }
  const handleDelete = () => {
    confirm({
      title: '删除问卷',
      content: '确定要删除吗?',
      onOk() {
        message.success('删除成功')
      },
      onCancel() {
        message.error('取消删除')
      },
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={
              isPublished
                ? `${QUESTION_STAT_PATHNAME}/${props._id}`
                : `${QUESTION_EDIT_PATHNAME}/${props._id}`
            }
          >
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag className={styles.isPublished} color="processing">
                已发布
              </Tag>
            ) : (
              <Tag className={styles.isNotPublished}>未发布</Tag>
            )}
            <span className={styles.answerCount}>答卷 : {answerCount}</span>
            <span className={styles.createAt}>创建于:{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`${QUESTION_EDIT_PATHNAME}/${props._id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`${QUESTION_STAT_PATHNAME}/${props._id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} type="text" size="small">
              {isStar ? '取消收藏' : '收藏'}
            </Button>
            <Popconfirm
              title="确定要复制问卷吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                handleDuplicate()
              }}
              onCancel={() => {
                message.error('取消复制')
              }}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={() => {
                handleDelete()
              }}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
