import { useEffect, useState } from "react"
import add from "../../assets/sidebar/add.svg"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { TicketType } from "../../types/ticket"
import Ticket from "./Ticket"
import { Outlet } from "react-router-dom"

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketType[] | null>(null)
  const authToken = useAppSelector((state) => state.userAuth.authToken)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tickets/getAllTickets`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      //   console.log(res)
      setTickets(res.data.data)
    })()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between p-4 px-8 text-sm">
        <div>
          <span className="text-txtprm ">Support</span> / Tickets{" "}
          <span className="text-sm ml-2 text-txtprm">{tickets?.length}</span>
        </div>
        <div>
          <button className="flex items-center gap-2 btn-prm">
            <img src={add} />
            <h1>Ticket</h1>
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 grid grid-cols-10 px-8 mt-8 py-2 border-b-[0.5px] border-b-gray-600">
        <h1 className="col-span-6 my-2">Items</h1>
        <h1 className="pl-1 my-2 border-l-[0.5px] border-l-gray-600">
          Customer
        </h1>
        <h1 className="pl-1 my-2 border-l-[0.5px] border-l-gray-600 col-span-2">
          Stage
        </h1>
        <h1 className="pl-1 border-l-[0.5px] border-l-gray-600 my-2">Links</h1>
      </div>
        <div>
      {tickets?.map((item) => (
        <Ticket key={item._id} item={item} />
      ))}
      
        <Outlet />
      </div>
    </>
  )
}
export default Tickets
