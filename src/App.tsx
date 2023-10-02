import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomeLayout from "./Layouts/HomeLayout"
import Tickets from "./components/tickets/Tickets"
import Issues from "./components/issues/Issues"
import UserLogin from "./pages/UserLogin"
import Info from "./components/info/Info"
import IssueInfo from "./components/IssueInfo/IssueInfo"
import IssueByNumber from "./components/IssueInfo/IssueByNumber"
import TicketByNumber from "./components/info/TicketByNumber"
import ProtectedRoute from "./Layouts/ProtectedRoute"
import Home from "./components/Home/Home"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const router = createBrowserRouter([
    {
      path:'/home',
      element:<Home/>
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomeLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "support/tickets",
          element: <Tickets />,
          children: [
            {
              path: "info",
              element: <Info />,
              children: [
                {
                  path: "issuebynumber/:no",
                  element: <IssueByNumber />,
                },
              ],
            },
          ],
        },
        {
          path: "build/issues",
          element: <Issues />,
          children: [
            {
              path: "issueinfo",
              element: <IssueInfo />,
              children: [
                {
                  path: "ticketbynumber/:no",
                  element: <TicketByNumber />,
                },
              ],
            },
          ],
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  )
}

export default App
