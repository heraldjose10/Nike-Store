import { Fragment } from "react";

import CustomButton from "../custom-button/custom-button.component"
import CustomFormInput from "../custom-form-input/custom-form-input.component"

const SignUpForm = () => (
  <Fragment>
    <h1 className="my-6 text-2xl font-saira font-bold uppercase px-6 text-center">
      Become a Nike Member
    </h1>
    <p className="text-center text-[#979797] text-[14px]">
      Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.
    </p>
    <form className="gap-4 my-4 flex flex-col">
      <CustomFormInput placeholder={'Email address'} />
      <CustomFormInput placeholder={'Password'} />
      <CustomFormInput placeholder={'Username'} />
      <div className="flex flex-row gap-4 items-center">
        <input
          type='checkbox'
          className="min-h-6 min-w-6 border-[#e5e5e5] border-solid"
          id='check'
        />
        <label
          for='check'
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
        buttonText={'JOIN US'}
        customStyles={'rounded h-12 font-saira font-bold text-xl'}
      />
    </form>
  </Fragment>
)

export default SignUpForm