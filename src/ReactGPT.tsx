import { RouterProvider } from "react-router"
import { router } from "./presentation/router/router"
import './index.css'


const ReactGPT = () => {
  return (
     <RouterProvider router = { router }/>
  )
}

export default ReactGPT
