const CustomerGrid:React.FC<{customer_name:string[]}> = ({customer_name}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {customer_name.map((item) => (
        <div key={item} className="p-1 px-2 cursor-pointer flex justify-center text-[10px]  text-txtprm rounded-md border-[0.5px] border-txtprm">
            {item}
        </div>
      ))}
    </div>
  )
}
export default CustomerGrid