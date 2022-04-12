import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const Register = () => {
  return (
    <div className="flex flex-col my-14 items-center px-10 max-w-[400px] mx-auto">
      <NikeIcon className='w-14 h-14'/>
      <SignUpForm />
      <p className="text-[#979797] text-xs">
        <span>Already a Member? </span>
        <button className="underline hover:cursor-pointer text-black">Sign In</button>
      </p>
    </div>
  )
}

export default Register