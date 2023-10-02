import { ChangeEvent, FormEvent, useState } from "react"
import logoWhite from "../assets/logoWhite.svg"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useAppDispatch } from "../store/hooks"
import { LoginUser } from "../store/user-auth-slice"

const AdminLogin = () => {
  const [isPassVisible, setPassVisible] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const toggleVisibility = () => {
    setPassVisible((prev) => !prev)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
    const {username, password} = formData
    dispatch(LoginUser({email:username, password}, 'admin'))
  }

  return (
    <>
      <h1 className="text-2xl text-center mt-52 mb-4">Admin page</h1>
      <div className="w-[30%] mx-auto  bg-bgprm border-[0.5px] p-8 border-prm rounded-md flex flex-col gap-8">
        <div className="border-b border-b-prm pb-6">
          <img src={logoWhite} className="w-44 mx-auto" />
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <label className="inp-label" htmlFor="username">
              Username
            </label>
            <input
              onChange={handleChange}
              className="inp"
              type="text"
              name="username"
            />
          </div>
          <div>
            <label className="inp-label" htmlFor="password">
              Password
            </label>
            <div className="relative flex flex-col">
              <input
                onChange={handleChange}
                className="inp"
                type={`${isPassVisible ? "text" : "password"}`}
                name="password"
              />
              <div className="absolute right-2 top-2">
                {isPassVisible ? (
                  <AiFillEyeInvisible
                    onClick={toggleVisibility}
                    className="text-xl cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={toggleVisibility}
                    className="text-xl cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <button className="btn-prm">Login</button>
        </form>
      </div>
    </>
  )
}
export default AdminLogin
