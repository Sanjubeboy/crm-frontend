import { useState } from "react"
import arrow from "../../assets/sidebar/arrow.svg"
import { NavLink } from "react-router-dom"

const Accordion: React.FC<{
  image: string
  text: string
  options: string[]
}> = ({ image, text, options }) => {
  const [isOpen, setIsOpen] = useState(false)

  const height = (options.length * 26)
  let heightClass
  if(height === 104){
    heightClass = 'h-[104px]'
  }
  if(height === 78){
    heightClass = 'h-[78px]'
  }

  const activeStyle = ({isActive}:{isActive:boolean}) => {
    return isActive
      ? "p-1 hover:bg-hvr rounded-md cursor-pointer capitalize bg-hvr"
      : "p-1 hover:bg-hvr rounded-md cursor-pointer capitalize"
  }

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center justify-between hover:bg-hvr px-3 py-1 rounded-md cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <img src={image} className="h-4 w-4" />
          <h1 className="capitalize">{text}</h1>
        </div>
        <img src={arrow} className={`${isOpen ? "rotate-90" : ""}`} />
      </div>

      <div
        className={`flex flex-col ml-9  overflow-hidden transition-all duration-300  ${
          !isOpen ? "h-0" : heightClass
        }`}
      >
        {options.map((item) => (
          <NavLink to={`${text}/${item}`} key={item} className={activeStyle}>{item}</NavLink>
        ))}
      </div>
    </div>
  )
}
export default Accordion
