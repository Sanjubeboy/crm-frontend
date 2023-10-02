import { useNavigate } from "react-router-dom"
import { getConvertedNumber } from "../utils/Numbers"

const TicketGrid:React.FC<{tickets:number[], isDirected:boolean}> = ({tickets, isDirected}) => {

    const navigate = useNavigate()

    const handleClick = (item:number) => {
        if(!isDirected){
            return
        }
        navigate(`ticketbynumber/${item}`)
    }

  return (
    <div className="grid grid-cols-5 gap-2">
      {tickets.map((item) => (
        <div onClick={() => handleClick(item)} key={item} className="p-1 px-2 cursor-pointer flex justify-center text-[10px] bg-tktbg text-tkttxt rounded-md border-[0.5px] border-tkttxt">
          TKT-{getConvertedNumber(item)}
        </div>
      ))}
    </div>
  )
}
export default TicketGrid