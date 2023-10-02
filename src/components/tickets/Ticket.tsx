import { Link } from "react-router-dom"
import { TicketType } from "../../types/ticket"
import { getConvertedNumber } from "../utils/Numbers"

const Ticket:React.FC<{item:TicketType}> = ({item}) => {
  return (
    <Link to={`info/?id=${item._id}`} className="text-[12px] hover:bg-hvr text-gray-400 grid grid-cols-10 px-8 py-2 items-center border-b-[0.5px] border-b-gray-600">
      <div className="col-span-6 flex items-center gap-8">
        <div className="p-1 px-2 cursor-pointer text-[10px] bg-tktbg text-tkttxt rounded-md border-[0.5px] border-tkttxt">
          TKT-{getConvertedNumber(item.ticket_no)}
        </div>
        <h1>{item.name}</h1>
      </div>
      <h1 className="pl-1">{item.customer_name}</h1>
      <h1 className="pl-1 col-span-2">{item.status}</h1>
      {item.issues.length === 0 ? (
        <h1 className="w-[60px] flex justify-center">-</h1>
      ) : (
        <h1 className="pl-1 p-1 px-2 cursor-pointer text-[10px] bg-issbg text-isstxt w-[60px] flex justify-center rounded-md border-[0.5px] border-isstxt">
          ISS-{getConvertedNumber(item.issues[0])}
        </h1>
      )}
    </Link>
  )
}
export default Ticket