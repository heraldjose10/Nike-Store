import React from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { CgClose } from "react-icons/cg"

import { clearError } from "../../redux/user/user.actions"

const SignInError = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  return (
    <motion.div
      className="h-screen w-screen absolute top-0 right-0 z-20 bg-gray-500/50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-[90%] h-[30%] bg-white relative p-10 flex flex-col gap-5 sm:gap-10 max-w-[500px] max-h-[300px]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h2 className="font-saira font-bold uppercase text-2xl sm:text-4xl">
          oops!! An error occured
        </h2>
        <div className="border-4 border-black absolute top-4 right-4 w-10 h-10 hover:cursor-pointer">
          <CgClose
            className="w-8 h-8"
            onClick={() => dispatch(clearError())}
          />
        </div>
        <p className="text-red-600 sm:text-xl">
          Your email or password was entered incorrectly.
        </p>
      </motion.div>
    </motion.div>
  )
}, document.getElementById('search-modal'))

export default SignInError