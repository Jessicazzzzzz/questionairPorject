import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  return <RouterProvider router={routerConfig} future={{ v7_startTransition: true }} />
}

export default App
