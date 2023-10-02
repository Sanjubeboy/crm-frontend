import { useNavigate } from "react-router-dom"
import { IssueType } from "../../types/issue"
import { getConvertedNumber } from "../utils/Numbers"

const Issue:React.FC<{item:IssueType}> = ({item}) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`issueinfo/?id=${item._id}`)} className="text-[12px] cursor-pointer hover:bg-hvr text-gray-400 grid grid-cols-10 px-8 py-2 items-center border-b-[0.5px] border-b-gray-600">
      <div className="col-span-5 flex items-center gap-8">
        <div className="p-1 px-2 cursor-pointer text-[10px] bg-issbg text-isstxt rounded-md border-[0.5px] border-isstxt">
          ISS-{getConvertedNumber(item.issue_no)}
        </div>
        <h1>{item.name}</h1>
      </div>
      <h1 className="pl-1">{item.customer_name[0]}</h1>
      {item.tickets.length === 0 ? (
        <h1 className="w-[60px] flex justify-center">-</h1>
      ) : (
        <h1 className="pl-1 p-1 px-2 cursor-pointer text-[10px] bg-tktbg text-tkttxt w-[70px] flex justify-center rounded-md border-[0.5px] border-tkttxt">
          TKT-{getConvertedNumber(item.tickets[0])}
        </h1>
      )}
      <h1 className="pl-1">{item.priority}</h1>
      <h1 className="pl-1">{item.owner.name}</h1>
      <h1 className="pl-1">{item.stage}</h1>
    </div>
  )
}
export default Issue