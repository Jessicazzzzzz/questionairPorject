import { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id } = useParams()

  return (
    <>
      <p>edit:{id}</p>
    </>
  )
}
export default Edit
