import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IssueType } from "../../types/issue"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { getConvertedNumber } from "../utils/Numbers"
import { TicketType } from "../../types/ticket"

const ExistingIssue:React.FC<{ticket:TicketType}> = ({ticket}) => {

    const [issues, setIssues] = useState<IssueType[] | null>(null)
    const [issue_no, setIssueNo] = useState<number|null>(null)
    const authToken = useAppSelector((state) => state.userAuth.authToken)

    useEffect(() => {
        (async() => {
            try {
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
            } catch (error) {
                console.log(error)
            }
        })()    
    },[])

    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setIssueNo(parseInt(e.target.value))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        // console.log(issue_no)
        const {ticket_no, customer_name, _id} = ticket
        const apiBody = {ticket_no, customer_name, ticket_id:_id, issue_no};
        console.log(apiBody);

        (async() => {
            try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/issues/linkExistingIssue`,
                  apiBody,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                )
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        })()

    }

    if(!issues){
        return
    }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <label className="inp-label text-txtprm text-sm" htmlFor="issue_no">
          Select issue
        </label>
        <select
          onChange={handleSelectChange}
          name="issue_no"
          className="inp rounded-md border-[0.5px] border-gray-600"
        >
            {
                issues.map(item => (
                    <option key={item._id} value={item.issue_no}>{item.name} - [ISS-{getConvertedNumber(item.issue_no)}]</option>
                ))
            }
        </select>
      </div>

      <button className="btn-prm mt-4">Link Issue</button>
    </form>
  )
}
export default ExistingIssue