import { FC, useState } from 'react'
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
import { useRequest } from 'ahooks'
import { copyQuestionService, updateQuestionService } from '@/services/question'
type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, answerCount, createAt, isStar } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const navigate = useNavigate()
  const { confirm } = Modal

  // 复制
  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => {
      const result = await copyQuestionService(_id)
      return result.data
    },
    {
      manual: true,

      onSuccess(result) {
        message.success('复制成功')
        navigate(`${QUESTION_EDIT_PATHNAME}/${result.id}`)
      },
    }
  )
  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: handleDeleteQuestion } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isDelete: true })
      return res.data
    },
    {
      manual: true,
      onSuccess(res) {
        if (res) {
          confirm({
            title: '删除问卷',
            content: '确定要删除吗?',
            onOk() {
              message.success('删除成功')
              setIsDeletedState(true)
            },
            onCancel() {
              message.error('取消删除')
            },
          })
        }
      },
    }
  )

  //   confirm({
  //     title: '删除问卷',
  //     content: '确定要删除吗?',
  //     onOk() {
  //       message.success('删除成功')
  //     },
  //     onCancel() {
  //       message.error('取消删除')
  //     },
  //   })
  // }
  // 点击按钮的时候,发起请求,跟新标星状态
  const { loading: changeStarLoading, run: handleStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        if (!isStarState) {
          message.success('标星成功')
          return
        }
        message.success('取消标星成功')
      },
    }
  )
  // 因为假删除,只是改变数据的属性,所以我们要设置一个变量
  // 如果这个属性为true , 那么我们就不会渲染这个组件
  if (isDeletedState) return null
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
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
            <Button
              icon={<StarOutlined onClick={handleStar} disabled={changeStarLoading} />}
              type="text"
              size="small"
            >
              {isStarState ? '取消收藏' : '收藏'}
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
              <Button icon={<CopyOutlined />} type="text" size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              disabled={deleteLoading} // 防止重复点击
              onClick={() => {
                handleDeleteQuestion()
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
