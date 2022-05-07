import React from "react"
import { motion } from "framer-motion"
import { AiFillCloseCircle } from 'react-icons/ai'

const FiltersModal = React.forwardRef((props, ref) => {
  const { gender, handleClose } = props
  return (
    <motion.div
      className="bg-white min-h-screen overflow-x-hidden absolute top-0 left-0 z-10 min-w-full px-5"
      initial={{ opacity: 0, top: '100vh' }}
      animate={{ opacity: 100, top: 0 }}
      exit={{
        opacity: 0,
        top: '100vh',
        transition: {
          delay: .2
        }
      }}
      transition={{ ease: 'easeOut', duration: .2 }}
    >
      {/*give onchange for checkbox*/}
      {/*change checkbox style*/}
      <div className="flex justify-between my-6 items-center">
        <h1 className="text-2xl">Filter</h1>
        <motion.button
          initial={{
            opacity: 0,
            scale: .1,
            rotate: -180
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              delay: .3
            }
          }}
          exit={{
            opacity: 0,
            scale: .1,
            rotate: -180
          }}
        >
          <AiFillCloseCircle
            onClick={() => handleClose(false)} className="w-10 h-10"

          />
        </motion.button>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-xl pb-3">Gender</h2>
        <div className="flex items-center gap-1 hover:text-gray-500 text-lg">
          <input id="men" type='checkbox' checked={gender === 'men' ? true : false} />
          <label htmlFor="men">Men</label>
        </div>
        <div className="flex items-center gap-1 hover:text-gray-500 text-lg">
          <input id="women" type='checkbox' checked={gender === 'women' ? true : false} />
          <label htmlFor="women">Women</label>
        </div>
        <div className="flex items-center gap-1 hover:text-gray-500 text-lg">
          <input id="kids" type='checkbox' checked={gender === 'kids' ? true : false} />
          <label htmlFor="kids">Kids</label>
        </div>
      </div>
      <hr className="mt-5" />
    </motion.div>
  )
})

export default FiltersModal