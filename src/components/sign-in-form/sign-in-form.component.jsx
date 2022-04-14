import { motion } from "framer-motion"
import { useState } from "react"

import CustomButton from "../custom-button/custom-button.component"
import CustomFormInput from "../custom-form-input/custom-form-input.component"

const SignInForm = ({ setShowSignUp }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleEmailValidation = () => {
    if (email.split('@').length !== 2) {
      setEmailError('Please enter a valid email address.')
    }
    else if (email.split('@')[1].split('.').length < 2) {
      setEmailError('Please enter a valid email address.')
    }
    else if (email.split('@')[1].split('.')[0].length === 0 || email.split('@')[1].split('.').at(-1).length === 0) {
      setEmailError('Please enter a valid email address.')
    }
    else {
      setEmailError('')
    }
  }

  const handlePasswordValidation = () => {
    if (password.length === 0) {
      setPasswordError('Please enter a password.')
    }
    else {
      setPasswordError('')
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    handleEmailValidation()
    handlePasswordValidation()
    if (email.length === 0 || password.length === 0 || emailError) {
      return
    }
    else {
      console.log({ email, password });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="my-6 text-2xl font-saira font-bold uppercase px-6 text-center">
        Your Account For Everything Nike
      </h1>

      <form onSubmit={handleSignIn} noValidate className="gap-4 my-4 flex flex-col w-full">
        <CustomFormInput
          setChange={setEmail}
          placeholder={'Email address'}
          error={emailError}
          handleValidation={handleEmailValidation}
          inputType={'email'}
        />
        <CustomFormInput
          setChange={setPassword}
          placeholder={'Password'}
          error={passwordError}
          handleValidation={handlePasswordValidation}
          inputType={'password'}
        />
        <div className="flex flex-row text-xs justify-between">
          <div className="basis-1/2 text-[#979797] flex flex-row items-center gap-4">
            <input
              type='checkbox'
              className="min-h-6 min-w-6 border-[#e5e5e5] border-solid"
              id='check-email-update'
            />
            <label
              htmlFor='check-email-update'
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
          buttonAction={handleSignIn}
          buttonText={'SIGN IN'}
          customStyles={'rounded h-12 font-saira font-bold text-xl w-full'}
        />
      </form>

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
    </motion.div>
  )
}

export default SignInForm