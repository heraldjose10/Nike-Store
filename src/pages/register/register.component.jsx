import { Helmet } from 'react-helmet'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import { selectAccessToken } from '../../redux/user/user.selectors'

const Register = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const navigatedFrom = location.state?.from || "/";

  const [showSignUp, setShowSignUp] = useState(true)

  const accessToken = useSelector(selectAccessToken)
  useEffect(() => {
    if (accessToken) {
      navigate(navigatedFrom)
    }
  }, [accessToken, navigatedFrom, navigate])


  return (
    <Fragment>
      <Helmet>
        <title>{showSignUp ? 'Register with Nike' : 'Sign In'}</title>
      </Helmet>
      <div className="flex flex-col my-10 items-center px-10 max-w-[400px] mx-auto mb-40 min-h-[666px]">
        <NikeIcon className='w-14 h-14' />
        {
          showSignUp
            ? <SignUpForm setShowSignUp={setShowSignUp} />
            : <SignInForm setShowSignUp={setShowSignUp} navigateAfterLogin={navigatedFrom} />
        }

      </div>
    </Fragment>
  )
}

export default Register