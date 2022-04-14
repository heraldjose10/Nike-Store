import { AnimatePresence, motion } from "framer-motion"

const CustomFormInput = ({
  placeholder,
  handleValidation,
  error,
  inputType,
  setChange
}) => {
  return (
    <div className="w-full flex-col flex">
      <input
        placeholder={placeholder}
        className={`border-[1px] h-10 border-solid border-[#e5e5e5] px-4 focus:outline-none ${error && 'border-red-500'}`}
        onBlur={handleValidation}
        type={inputType}
        onChange={(e) => setChange(e.target.value)}
      />
      {/* Show error in red */}
      <span
        className="text-[14px] min-h-[21px] font-medium text-red-500 mt-2"
      >
        <AnimatePresence>
          {
            error && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {error}
              </motion.p>
            )
          }
        </AnimatePresence>
      </span>
    </div>
  )
}

export default CustomFormInput