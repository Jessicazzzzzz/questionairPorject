import { FC } from 'react'
import useLoadQuestionList from '@/hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionList()
  return (
    <>
      <p>stat</p>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(questionData)}</div>}
    </>
  )
}
export default Stat
