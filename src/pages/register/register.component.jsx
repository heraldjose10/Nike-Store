import { useState } from 'react'
import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

const Register = () => {

  const [showSignUp, setShowSignUp] = useState(true)

  return (
    <div className="flex flex-col my-10 items-center px-10 max-w-[400px] mx-auto mb-40 min-h-[666px]">
      <NikeIcon className='w-14 h-14' />
      {
        showSignUp
          ? <SignUpForm setShowSignUp={setShowSignUp} />
          : <SignInForm setShowSignUp={setShowSignUp} />
      }
      
    </div>
  )
}

export default Register