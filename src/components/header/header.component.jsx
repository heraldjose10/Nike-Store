import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'
import { BsBag } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'

import Search from "../search/search.component";

import { selectAccessToken } from "../../redux/user/user.selectors";

const NavBar = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const accessToken = useSelector(selectAccessToken)

  const handleSignInButtonClick = () => {
    if (!accessToken) {
      navigate('/register', { state: { from: location } })
    }
    else {
      navigate('/profile', { state: { toShow: 'Profile' } })
    }
  }

  const handleFavoritesButtonClick = () => {
    if (!accessToken) {
      navigate('/register', { state: { from: location } }) // from should be the page to be redirected to?
    }
    else {
      navigate('/profile', { state: { toShow: 'Favorites' } })
    }
  }

  const handleCartButtonClick = () => {
    if (!accessToken) {
      navigate('/register', { state: { from: location } })
    }
    else {
      navigate('/cart')
    }
  }

  return (
    <nav className="flex justify-between items-center sticky top-0 bg-white z-10">
      <Link to={'/'}>
        <NikeIcon className="h-16 w-16 my-0 mx-4 hover:cursor-pointer" />
      </Link>
      <div className="flex items-center gap-5 mr-6">
        <div className="hidden font-sans mr-5 md:block">
          <ul className="flex flex-1">
            <Link to={'/shop?gender=men'}>
              <li
                className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black"
              >
                Men
              </li>
            </Link>
            <Link to={'/shop?gender=women'}>
              <li
                className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black"
              >
                Women
              </li>
            </Link>
            <Link to={'/shop?gender=kids'}>
              <li
                className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black"
              >
                Kids
              </li>
            </Link>
          </ul>
        </div>
        <Search />
        <BsBag
          className="h-6 w-6 hover:cursor-pointer"
          onClick={handleCartButtonClick}
        />
        <AiOutlineHeart
          className="h-7 w-7 hover:cursor-pointer"
          onClick={handleFavoritesButtonClick}
        />
        <button
          className="hover:cursor-pointer"
          onClick={handleSignInButtonClick}
        >
          <FaRegUserCircle
            className="h-6 w-6"
          />
        </button>
      </div>
    </nav>
  )
}

export default NavBar