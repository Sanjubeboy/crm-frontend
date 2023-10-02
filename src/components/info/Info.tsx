import { Outlet, useNavigate, useSearchParams } from "react-router-dom"
import close from "../../assets/sidebar/close.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { TicketType } from "../../types/ticket"
import { getConvertedNumber } from "../utils/Numbers"
import NewIssue from "./NewIssue"
import ExistingIssue from "./ExistingIssue"
import IssueGrid from "./IssueGrid"

const Info = () => {
  const navigate = useNavigate()
  const authToken = useAppSelector(state => state.userAuth.authToken)

  const [activePage, setActivePage] = useState('new')
  const [ticket, setTicket] = useState<TicketType | null>(null)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    (async() => {
        try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/tickets/getTicketById/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            )
            console.log(res)
            setTicket(res.data.data[0])
        } catch (error) {
            console.log(error)
        }
    })()
  },[])

  if(!ticket){
    return
  }

  return (
    <div className="fixed flex flex-col  top-0 bottom-0 w-[50%] bg-bgsec border-l-[0.5px] border-l-gray-600 pt-4 right-0">
      <div className="flex justify-between px-4 pb-4 items-center border-b-[0.5px] border-b-gray-600">
        <h1 className="pl-1 p-1 px-2 cursor-pointer text-[10px] bg-tktbg text-tkttxt w-[70px] flex justify-center rounded-md border-[0.5px] border-tkttxt">
          TKT-{getConvertedNumber(ticket?.ticket_no!)}
        </h1>

        <img
          src={close}
          onClick={() => navigate("..")}
          className="h-3 w-3 cursor-pointer"
        />
      </div>

      <div className="flex flex-1 text-[12px]">
        <div className="w-1/2 border-r-[0.5px] border-r-gray-600 flex flex-col">
          <div className="flex flex-col gap-2 border-b-[0.5px] border-b-gray-600 px-2 py-4">
            <h1 className="text-gray-500">Description</h1>
            <p className="text-txtprm">{ticket?.name}</p>
          </div>
          <div className="flex flex-col gap-2 border-b-[0.5px] border-b-gray-600 px-2 py-4">
            <h1 className="text-gray-500">Customer</h1>
            <p className="text-txtprm">{ticket?.customer_name}</p>
          </div>
          <div className="flex flex-col gap-2  px-2 py-4">
            <h1 className="text-gray-500">Issues</h1>
            <div className="text-txtprm">
                <IssueGrid issues={ticket.issues} isDirected={true}/>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="flex p-2 border-b-[0.5px] border-b-gray-600">
            <h1
              onClick={() => setActivePage("new")}
              className={`w-1/2 text-center rounded-md py-1 cursor-pointer  ${
                activePage === "new" ? "bg-hvr text-txtprm" : "text-gray-500"
              }`}
            >
              Create new Issue
            </h1>
            <h1
              onClick={() => setActivePage("existing")}
              className={`w-1/2 text-center rounded-md py-1 cursor-pointer  ${
                activePage === "existing"
                  ? "bg-hvr text-txtprm"
                  : "text-gray-500"
              }`}
            >
              Link Existing Issue
            </h1>
          </div>

          <div className="flex-1 p-8">
            {activePage === "new" ? (
              <NewIssue ticket={ticket} />
            ) : (
              <ExistingIssue ticket={ticket}/>
            )}
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}
export default Info
