import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { TicketType } from "../../types/ticket"
import axios from "axios"
import { useAppSelector } from "../../store/hooks"
import { UserType } from "../../types/user"

const NewIssue:React.FC<{ticket:TicketType}> = ({ticket}) => {

    const authToken = useAppSelector(state => state.userAuth.authToken)
    const [formData, setFormData] = useState({
        owner:'',
        priority:''
    })
    const [users, setUsers] = useState<UserType[] | null>(null)

    useEffect(() => {
        (async() => {
            try {
              const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/user/getAllUsers`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              )
              //   console.log(res)
              setUsers(res.data.data)
            } catch (error) {
              console.log(error)
            }
        })()
    },[])


    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        console.log(formData)
        const {owner, priority} = formData
        const {name, customer_name, ticket_no, _id} =  ticket
        const apiBody = {name, customer_name, ticket_no, ticket_id: _id, owner, priority};
        console.log(apiBody);

        (async() => {
            try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/issues/createNewIssue`,apiBody,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                )
                console.log(res)
            } catch (error) {
                
            }
        })()
    }

    if(!users){
        return
    }

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="inp-label text-txtprm text-sm" htmlFor="owner">
            Owner
          </label>
          <select
            onChange={handleSelectChange}
            name="owner"
            className="inp rounded-md border-[0.5px] border-gray-600"
          >
            {
                users.map(item => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                ))
            }
          </select>
        </div>

        <div>
          <label className="inp-label text-txtprm text-sm" htmlFor="priority">
            Priority
          </label>
          <select
            onChange={handleSelectChange}
            name="priority"
            className="inp rounded-md border-[0.5px] border-gray-600"
          >
            <option value={"p1"}>p1</option>
            <option value={"p2"}>p2</option>
            <option value={"p3"}>p3</option>
          </select>
        </div>

        <button className="btn-prm mt-4">Create Issue</button>
      </form>
    </div>
  )
}
export default NewIssue