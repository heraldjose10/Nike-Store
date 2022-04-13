import { motion } from "framer-motion"

import CustomButton from "../custom-button/custom-button.component"
import CustomFormInput from "../custom-form-input/custom-form-input.component"

const SignInForm = ({ setShowSignUp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="my-6 text-2xl font-saira font-bold uppercase px-6 text-center">
        Your Account For Everything Nike
      </h1>
      <form className="gap-4 my-4 flex flex-col w-full">
        <CustomFormInput placeholder={'Email address'} />
        <CustomFormInput placeholder={'Password'} />
        <div className="flex flex-row text-xs justify-between">
          <div className="basis-1/2 text-[#979797] flex flex-row items-center gap-4">
            <input
              type='checkbox'
              className="min-h-6 min-w-6 border-[#e5e5e5] border-solid"
              id='check-email-update'
            />
            <label
              for='check-email-update'
              className="text-[#979797] text-xs pr-8"
            >
              Keep me signed in
            </label>
          </div>
          <a
            className="basis-1/3 text-[#bebebe] text-right hover:cursor-pointer"
            href="/"          >
            Forgotten your password?
          </a>
        </div>
        <p className="text-[#979797] text-xs text-center mb-1">
          <span>By creating an account, you agree to Nike's </span>
          <a
            rel="noreferrer"
            target='_blank'
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=IN&language=en&mobileStatus=true&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
            className="underline">Privacy Policy
          </a>
          <span> and </span>
          <a
            rel="noreferrer"
            href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=IN&language=en&mobileStatus=true&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
            className="underline hover:cursor-pointer">
            Terms of Use
          </a>
        </p>
        <CustomButton
          buttonLink={''}
          buttonText={'SIGN IN'}
          customStyles={'rounded h-12 font-saira font-bold text-xl w-full'}
        />
        <p className="text-[#979797] text-xs text-center">
          <span>
            Not a Member?
          </span>
          <button
            className="underline hover:cursor-pointer text-black"
            onClick={() => setShowSignUp(true)}
          >
            Join Us
          </button>
        </p>
      </form>
    </motion.div>
  )
}

export default SignInForm