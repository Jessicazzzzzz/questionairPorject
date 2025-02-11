import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, message, Space } from 'antd'
import { useRequest } from 'ahooks'

import { createQuestionListService } from '@/services/question'
const ManageLayout: FC = () => {
  const navigate = useNavigate()
  // 获取当前路由地址
  const pathName = useLocation().pathname
  // console.log(pathName);
  // 如果没有这个不停的点击创建,它就会不停地发送请求
  // 解决办法:使用loading
  //   const [loading,setLoading]  = useState(false)

  //  async function handleCreateClick(){
  //    setLoading(true)
  //    const data = await getQuestionListService()
  //    console.log("manage data",data);
  //    const {id} = data.data || {}
  //    if(id){
  //     navigate(`/question/edit/${id}`)
  //     message.success('创建成功')
  //    }
  //    setLoading(false)
  //   }

  const { loading, run: handleCreateClick } = useRequest(createQuestionListService, {
    manual: true,
    onSuccess(data) {
      const { id } = data.data || {}
      if (id) {
        navigate(`/question/edit/${id}`)
        message.success('创建成功')
      }
    },
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider style={{ borderColor: 'transparent' }} />
            <Button
              type={pathName === '/manage/list' ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => navigate('/manage/list')}
            >
              我的问卷
            </Button>

            <Button
              type={pathName.startsWith('/manage/star') ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => navigate('/manage/star')}
            >
              星标问卷
            </Button>

            <Button
              type={pathName === '/manage/trash' ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => navigate('/manage/trash')}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default ManageLayout
