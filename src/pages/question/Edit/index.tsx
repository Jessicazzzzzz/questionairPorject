import { FC } from 'react'
import useLoadQuestionList from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, questionData, error } = useLoadQuestionList()
  console.log('edit', error)
  return (
    <>
      <p>Edit page</p>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(questionData)}</div>}
    </>
  )
}
export default Edit
