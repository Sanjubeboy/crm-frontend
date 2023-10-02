const Notification:React.FC<{image:string, text:string}> = ({image, text}) => {
  return (
    <div className=" flex gap-3 items-center pl-3 rounded-md hover:bg-hvr py-1 cursor-pointer">
      <img src={image} className="h-4 w-4" />
      <h1>{text}</h1>
    </div>
  )
}
export default Notification