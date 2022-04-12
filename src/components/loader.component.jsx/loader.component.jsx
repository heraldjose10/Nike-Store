import { motion } from 'framer-motion'

import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'

const MotionNikeLogo = motion(NikeIcon)

const Loader = () => {
  return (
    <div className="text-6xl text-center flex flex-row justify-center">
      <MotionNikeLogo
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: .8,
            repeat: Infinity
          }
        }}
        className='h-[150px] w-[150px]'
      />
    </div>
  )
}

export default Loader