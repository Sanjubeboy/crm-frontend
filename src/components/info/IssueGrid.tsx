import { useNavigate } from "react-router-dom"
import { getConvertedNumber } from "../utils/Numbers"

const IssueGrid: React.FC<{ issues: number[], isDirected:boolean }> = ({ issues, isDirected }) => {
  const navigate = useNavigate()

  const handleClick = (item:number) => {
    if(!isDirected){
        return
    }
    navigate(`issuebynumber/${item}`)
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {issues.map((item) => (
        <div
          key={item}
          onClick={() =>  handleClick(item)}
          className="p-1 px-2 cursor-pointer flex justify-center text-[10px] bg-issbg text-isstxt rounded-md border-[0.5px] border-isstxt"
        >
          ISS-{getConvertedNumber(item)}
        </div>
      ))}
    </div>
  )
}
export default IssueGrid
