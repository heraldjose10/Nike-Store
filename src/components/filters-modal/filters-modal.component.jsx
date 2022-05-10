import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'

export const FilterInput = ({ gender, filtername, setFunction }) => {
  const url = useLocation()
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    gender === filtername
      ? setChecked(true) : setChecked(false)
  }, [gender, filtername])

  return (
    <div className="flex items-center gap-3 hover:text-gray-500 text-lg relative hover:cursor-pointer">
      <div
        className={`absolute left-0 border-2 h-5 w-5 rounded-[4px] ${checked ? 'bg-black border-black' : ''}`}
        onClick={() => {
          if (checked === false) {
            setFunction(filtername)
            setChecked(true)
            navigate(url.pathname + '?gender=' + filtername)
          }
          else {
            setChecked(false)
          }
        }}
      >
        <TiTick className="h-full w-full text-white" />
      </div>
      <input
        className="invisible"
        onChange={() => {
          setFunction(filtername)
          setChecked(true)
          navigate(url.pathname + '?gender=' + filtername)
        }}
        id={filtername}
        type='checkbox'
        checked={gender === filtername ? true : false}
      />
      <label htmlFor={filtername}>{filtername}</label>
    </div>
  )
}

const FiltersModal = React.forwardRef((props, ref) => {
  const { gender, handleClose, setFunction } = props
  const colours = [
    { colour: 'bg-red-500', text: 'red' },
    { colour: 'bg-blue-500', text: 'blue' },
    { colour: 'bg-pink-500', text: 'pink' },
    { colour: 'bg-pink-500', text: 'green' },
    { colour: 'bg-yellow-500', text: 'yellow' },
    { colour: 'bg-black', text: 'black' },
    { colour: 'bg-purple-500', text: 'purple' },
    { colour: 'bg-orange-500', text: 'orange' },
    { colour: 'bg-gray-500', text: 'gray' },
  ]
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
        <h2 className="text-lg pb-1">Gender</h2>
        <FilterInput
          gender={gender}
          filtername={'men'}
          setFunction={setFunction}
        />
        <FilterInput
          gender={gender}
          filtername={'women'}
          setFunction={setFunction}
        />
        <FilterInput
          gender={gender}
          filtername={'kids'}
          setFunction={setFunction}
        />
      </div>
      <hr className="my-5" />

      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-lg pb-1">Colour</h2>
        <div className="flex gap-5 flex-wrap justify-center w-full">
          {
            colours.map(colour => (
              <div className="basis-1/4 shrink-0 grow-0 items-center flex flex-col hover:cursor-pointer hover:text-gray-500">
                <div className={`${colour.colour} w-7 h-7 rounded-full `}></div>
                <p className="text-sm">{colour.text}</p>
              </div>
            ))
          }
        </div>
      </div>
      <hr className="mt-16" />
    </motion.div>
  )
})

export default FiltersModal