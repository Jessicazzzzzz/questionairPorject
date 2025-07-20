import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
const QuestionLayout: FC = () => {
  return (
    <>
      <div>
        Question layout
        <Outlet />
      </div>
    </>
  )
}
export default QuestionLayout
