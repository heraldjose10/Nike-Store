import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../custom-button/custom-button.component"
import CustomFormInput from "../custom-form-input/custom-form-input.component"

import { selectUserLoading } from "../../redux/user/user.selectors";
import { userSignUpEnd, userSignUpError, userSignUpStart } from "../../redux/user/user.actions";

const SignUpForm = ({ setShowSignUp }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const dispatch = useDispatch()

  const userLoading = useSelector(selectUserLoading)

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
    if (password.length < 8) {
      setPasswordError('Password does not meet minimum requirements. Password must have minimum 8 letters.')
    }
    else if (!(/\d/.test(password))) {
      setPasswordError('Password does not meet minimum requirements. Password must have atleast a number.')
    }
    else if (!(/[a-zA-Z]/g.test(password))) {
      setPasswordError('Password does not meet minimum requirements. Password must have atleast a alphabet.')
    }
    else {
      setPasswordError('')
    }
  }

  const handleUsernameValidation = () => {
    if (username.length === 0) {
      setUsernameError('Please enter a valid username.')
    }
    else {
      setUsernameError('')
    }
  }

  const handleSignUp = async e => {
    e.preventDefault()
    dispatch(userSignUpStart())
    handleEmailValidation()
    handleUsernameValidation()
    handlePasswordValidation()
    if (email.length === 0 || password.length === 0 || username.length === 0 || emailError || passwordError) {
      dispatch(userSignUpError())
      return
    }
    else {
      try {
        await axios({
          method: 'post',
          url: '/api/users',
          data: {
            username: username,
            password: password,
            email: email
          }
        })
        dispatch(userSignUpEnd())
        setShowSignUp(false)
      } catch (error) {
        dispatch(userSignUpError())
        if (error.response.status === 409) {
          if ('email' in error.response.data['message']) {
            setEmailError(error.response.data['message']['email'])
          }
          else if ('username' in error.response.data['message']) {
            setUsernameError(error.response.data['message']['username'])
          }
          console.log(error);
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: .2 }}
    >
      <h1 className="my-6 text-2xl font-saira font-bold uppercase px-6 text-center">
        Become a Nike Member
      </h1>
      <p className="text-center text-[#979797] text-[14px]">
        Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.
      </p>

      <form onSubmit={handleSignUp} noValidate className="gap-4 my-4 flex flex-col">
        <CustomFormInput
          setChange={setEmail}
          placeholder={'Email address'}
          inputType={'email'}
          handleValidation={handleEmailValidation}
          error={emailError}
        />
        <CustomFormInput
          setChange={setPassword}
          placeholder={'Password'}
          inputType={'password'}
          handleValidation={handlePasswordValidation}
          error={passwordError}
        />
        <CustomFormInput
          setChange={setUsername}
          placeholder={'Username'}
          inputType={'text'}
          handleValidation={handleUsernameValidation}
          error={usernameError}
        />
        <div className="flex flex-row gap-4 items-center">
          <input
            type='checkbox'
            className="min-h-6 min-w-6 border-[#e5e5e5] border-solid"
            id='check-email-update'
          />
          <label
            htmlFor='check-email-update'
            className="text-[#979797] text-xs"
          >
            Sign up for emails to get updates from Nike on products, offers and your Member benefits
          </label>
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
          buttonText={userLoading ? 'PROCESSING...' : 'JOIN US'}
          // buttonText={'JOIN US'}
          customStyles={'rounded h-12 font-saira font-bold text-xl'}
          buttonAction={handleSignUp}
        />
      </form>

      <p className="text-[#979797] text-xs text-center">
        <span>
          Already a Member?
        </span>
        <button
          className="underline hover:cursor-pointer text-black"
          onClick={(e) => setShowSignUp(false)}
        >
          Sign In
        </button>
      </p>
    </motion.div>
  )
}

export default SignUpForm