
const Button:React.FC<{children: string}> = ({children}) => {
  return (
    <button className="bg-[#F9FAFB] text-sm text-black py-2 px-3 rounded-sm">{children}</button>
  )
}

export default Button