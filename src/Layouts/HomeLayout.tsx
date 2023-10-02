import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

const HomeLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen">
        <Outlet />
      </div>
    </div>
  )
}
export default HomeLayout
