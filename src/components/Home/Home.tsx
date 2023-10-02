import { Link } from 'react-router-dom'
import logo from '../../assets/logoBlack.svg'
import message from '../../assets/sidebar/message.svg'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {

    const [isPlugOpen, setPlugOpen] = useState(false)

    const [formData, setFormData] = useState({
        company:'',
        issue:''
    })

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => {
          return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        console.log(formData);

        (async() => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/tickets/createTicket`, {name:formData.issue,customer_name:formData.company})
                console.log(res)
                toast.success('Ticket created successfully!')
            } catch (error) {
                console.log(error)
            }
        })()


    }

  return (
    <div className="h-screen bg-white">
      <div className="bg-gray-200 px-60 p-4 flex justify-between">
        <img className="w-32 cursor-pointer" src={logo} />
        <div className="flex gap-8 text-lg">
          <Link
            
            className="hover:text-black hover:underline text-gray-600"
            to={'/'}
          >
            Home
          </Link>
          <Link
            
            className="hover:text-black hover:underline text-gray-600"
            to={'/'}
          >
            About
          </Link>
          <Link
            
            className="hover:text-black hover:underline text-gray-600"
            to={'/'}
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="pt-16 px-60 flex flex-col gap-8">
        <h1 className="text-6xl text-black">Your copilot for growth</h1>
        <p className="text-gray-700 pl-2">
          A blazingly fast neural engine for next generation customer<br></br>{" "}
          support and software development
        </p>

        <div className="flex px-2 gap-6">
          <div className="text-white bg-black px-3 py-2 rounded-md hover:opacity-70 cursor-pointer">
            Try DevRev for free
          </div>
          <a
            className="border-[1px] text-black border-gray-600 px-3 py-2 rounded-md hover:opacity-50 cursor-pointer"
            href="https://devrev.ai/"
          >
            Learn more
          </a>
        </div>
      </div>

      <div className='bg-sec fixed bottom-8 right-8 p-2 rounded-full cursor-pointer' onClick={() => setPlugOpen(prev => !prev)}>
        <img src={message}/>
      </div>

      {isPlugOpen && <div className='bg-bgprm w-1/3 p-8 py-12 rounded-md fixed right-8 bottom-32'>
        <h1 className='text-3xl mb-6 text-center'>
            PLUG
        </h1>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div>
                <label className='inp-label' htmlFor='company'>Select company</label>
                <select onChange={handleSelectChange} className='inp' defaultValue={'infosys'} name="company">
                    <option value={'infosys'}>Infosys</option>
                    <option value={'tcs'}>TCS</option>
                    <option value={'accenture'}>Accenture</option>
                    <option value={'wipro'}>Wipro</option>
                    <option value={'mindtree'}>Mindtree</option>
                </select>
            </div>

            <div>
                <label className='inp-label' htmlFor='issue'>Issue</label>
                <input onChange={handleInputChange} value={formData.issue} className='inp' type='text' name='issue'/>
            </div>

            <button className='btn-prm'>Report issue</button>
        </form>
      </div>}
    </div>
  )
}
export default Home