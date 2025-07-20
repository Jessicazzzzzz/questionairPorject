import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import 'antd/dist/reset.css'

function App() {
  return <RouterProvider router={routerConfig} future={{ v7_startTransition: true }} />
}

export default App
