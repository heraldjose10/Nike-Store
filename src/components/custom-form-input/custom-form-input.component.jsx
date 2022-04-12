const CustomFormInput = ({ placeholder }) => {
  return (
    <div className="w-full flex-col flex">
      <input
        placeholder={placeholder}
        className="border-[1px] h-10 border-solid border-[#e5e5e5] px-4"
      />
      <span className="text-[14px] font-medium text-red-500 mt-2" >
        There is a error
      </span>
    </div>
  )
}

export default CustomFormInput