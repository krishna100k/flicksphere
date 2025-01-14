
const Button:React.FC<{children: any, action ?: any}> = ({children, action}) => {
  return (
    <button onClick={action} className="bg-[#F9FAFB] text-sm text-black py-2 px-3 rounded-sm">{children}</button>
  )
}

export default Button