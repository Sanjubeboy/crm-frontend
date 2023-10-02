import { useEffect, useState } from "react"
import add from "../../assets/sidebar/add.svg"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { IssueType } from "../../types/issue"
import Issue from "./Issue"
import { Outlet } from "react-router-dom"

const Issues = () => {
  const [issues, setIssues] = useState<IssueType[] | null>(null)
  const authToken = useAppSelector((state) => state.userAuth.authToken)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/issues/getAllIssues`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
    //   console.log(res)
      setIssues(res.data.data)
    })()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between p-4 px-8 text-sm">
        <div>
          <span className="text-txtprm ">Build</span> / Issues{" "}
          <span className="text-sm ml-2 text-txtprm">{issues?.length}</span>
        </div>
        <div>
          <button className="flex items-center gap-2 btn-prm">
            <img src={add} />
            <h1>Issue</h1>
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 grid grid-cols-10 px-8 mt-8 py-2 border-b-[0.5px] border-b-gray-600">
        <h1 className="col-span-5 my-2">Items</h1>
        <h1 className="pl-1 my-2 border-l-[0.5px] border-l-gray-600">
          Customer
        </h1>
        <h1 className="pl-1 border-l-[0.5px] border-l-gray-600 my-2">Links</h1>
        <h1 className="pl-1 border-l-[0.5px] border-l-gray-600 my-2">Priority</h1>
        <h1 className="pl-1 border-l-[0.5px] border-l-gray-600 my-2">Owner</h1>
        <h1 className="pl-1 my-2 border-l-[0.5px] border-l-gray-600 ">
          Stage
        </h1>
      </div>

      {issues?.map((item) => (
        <Issue key={item._id} item={item}/>
      ))}
      <Outlet/>
    </>
  )
}
export default Issues
