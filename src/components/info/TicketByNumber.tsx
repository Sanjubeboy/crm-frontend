import {  useNavigate, useParams } from "react-router-dom"
import close from "../../assets/sidebar/close.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { TicketType } from "../../types/ticket"
import { getConvertedNumber } from "../utils/Numbers"
import IssueGrid from "./IssueGrid"

const TicketByNumber = () => {
  const navigate = useNavigate()
  const authToken = useAppSelector((state) => state.userAuth.authToken)

  const [ticket, setTicket] = useState<TicketType | null>(null)
  const {no} = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/tickets/getTicketByNo/${no}`,
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
  }, [no])

  if (!ticket) {
    return
  }

  return (
    <div className="fixed flex flex-col  top-0 bottom-0 w-[30%] bg-bgsec border-l-[0.5px] border-l-gray-600 pt-4 right-[30%]">
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
        <div className="w-full border-r-[0.5px] border-r-gray-600 flex flex-col">
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
              <IssueGrid issues={ticket.issues} isDirected={false} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default TicketByNumber
