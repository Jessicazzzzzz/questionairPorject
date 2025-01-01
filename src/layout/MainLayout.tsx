import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
const MainLayout: FC = () => {
  return (
    <>
      <div>Mainlayout header</div>
      <div>
        <Outlet />
      </div>
      <div>Mainlayout footer</div>
    </>
  )
}
export default MainLayout
