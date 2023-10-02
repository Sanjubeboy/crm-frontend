import { useNavigate, useParams } from "react-router-dom"
import close from "../../assets/sidebar/close.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { getConvertedNumber } from "../utils/Numbers"
import { IssueType } from "../../types/issue"
import TicketGrid from "./TicketGrid"
import CustomerGrid from "./CustomerGrid"

const IssueByNumber = () => {
  const navigate = useNavigate()
  const authToken = useAppSelector((state) => state.userAuth.authToken)
  const [issue, setIssue] = useState<IssueType | null>(null)
  const {no} = useParams()
  

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/issues/getIssueByNo/${no}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        console.log(res)
        setIssue(res.data.data[0])
      } catch (error) {
        console.log(error)
      }
    })()
  },[no])

  if (!issue) {
    return
  }

  return (
    <div className="fixed flex flex-col  top-0 bottom-0 right-[50%] w-[30%] bg-bgsec border-l-[0.5px] border-l-gray-600 pt-4 ">
      <div className="flex justify-between px-4 pb-4 items-center border-b-[0.5px] border-b-gray-600">
        <h1 className="pl-1 p-1 px-2 cursor-pointer text-[10px] bg-issbg text-isstxt w-[70px] flex justify-center rounded-md border-[0.5px] border-isstxt">
          ISS{getConvertedNumber(issue?.issue_no!)}
        </h1>

        <img
          src={close}
          onClick={() => navigate("..")}
          className="h-3 w-3 cursor-pointer"
        />
      </div>

      <div className="flex flex-1 text-[12px]">
        <div className="w-full border-r-[0.5px] border-r-gray-600 flex flex-col">
          <div className="flex flex-col gap-2 border-b-[0.5px] border-b-gray-600 px-2 py-4">
            <h1 className="text-gray-500">Description</h1>
            <p className="text-txtprm">{issue.name}</p>
          </div>
          <div className="flex flex-col gap-2 border-b-[0.5px] border-b-gray-600 px-2 py-4">
            <h1 className="text-gray-500">Owner</h1>
            <p className="text-txtprm">{issue.owner.name}</p>
          </div>
          <div className="flex flex-col gap-2 border-b-[0.5px] border-b-gray-600 px-2 py-4">
            <h1 className="text-gray-500">Customers</h1>
            <CustomerGrid customer_name={issue.customer_name} />
          </div>
          <div className="flex flex-col gap-2  px-2 py-4">
            <h1 className="text-gray-500">Tickets</h1>
            <div className="text-txtprm">
              <TicketGrid tickets={issue.tickets} isDirected={false}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IssueByNumber
