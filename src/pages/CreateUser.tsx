import { ChangeEvent, FormEvent, useState } from "react"
import logoWhite from "../assets/logoWhite.svg"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

const CreateUser = () => {
  const [isPassVisible, setPassVisible] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email:""
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
  }

  return (
    <>
      <h1 className="text-2xl text-center mt-52 mb-4">Admin page</h1>
      <div className="w-[30%] mx-auto bg-bgprm border-[0.5px] p-8 border-prm rounded-md flex flex-col gap-8">
        <div className="border-b border-b-prm pb-6">
          <img src={logoWhite} className="w-44 mx-auto" />
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <label className="inp-label" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleChange}
              className="inp"
              type="text"
              name="name"
            />
          </div>
          <div>
            <label className="inp-label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              className="inp"
              type="email"
              name="email"
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
export default CreateUser
