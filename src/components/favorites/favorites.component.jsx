import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"

import { setFavoritesStart, deleteFavoriteStartAsync } from "../../redux/favorites/favorites.actions";
import {
  selectFavoriteItems,
  selectFavoritesIsLoading,
  selectFavoritesError
} from "../../redux/favorites/favorites.selectors";
import {
  selectAccessToken,
  selectRefreshToken
} from "../../redux/user/user.selectors";

import Loader from "../loader.component.jsx/loader.component";
import ProductCard from "../product-card/product-card.component";

const MotionLink = motion(Link)

const Favorites = () => {

  const dispatch = useDispatch()

  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const favorites = useSelector(selectFavoriteItems)
  const favoritesIsLoading = useSelector(selectFavoritesIsLoading)
  const favoritesError = useSelector(selectFavoritesError)

  useLayoutEffect(() => {
    dispatch(setFavoritesStart(
      accessToken,
      '/api/favorites',
      refreshToken
    ))
  }, [accessToken, dispatch, refreshToken])

  const handleRemoveFromFavorites = (item) => {
    dispatch(deleteFavoriteStartAsync(
      accessToken,
      '/api/favorites',
      item,
      refreshToken
    ))
  }

  return (
    <div className="my-10">
      {
        favoritesIsLoading
          ? <Loader />
          : (
            <section  className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-20 auto-cols-max justify-between grow-0">
              {
                favorites.map(item => (
                  <AnimatePresence>
                    <MotionLink
                      to={`/shop/product/${item.id}`}
                      key={item.style_id}
                      className="relative"
                      initial={{ scaleY: .1, opacity:0 }}
                      animate={{ scaleY: 1, opacity: 1, transitionDuration: '.1s' }}
                      exit={{ scale: .1, transitionDuration: '.2s' }}
                    >
                      <AiFillHeart
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveFromFavorites(item) // animate on deletion from favorites
                        }}
                        className="text-gray-700 absolute top-3 right-3 lg:top-5 lg:right-5 h-5 w-5 lg:h-8 lg:w-8 hover:scale-150 transition ease-in-out z-10"
                      />
                      <ProductCard category={'Shoes'} {...item} pic={item.images[0]} />
                    </MotionLink>
                  </AnimatePresence>
                ))
              }
            </section>
          )
      }
      {
        !favoritesIsLoading && !favoritesError && favorites.length === 0 && (
          <div className='text-center text-lg my-10'>
            Items added to your Favorites will be saved here.
          </div>
        )
      }
      {
        favoritesError && (
          <div className='text-center text-lg my-10'>
            There was an error loading Favorites
          </div>
        )
      }
    </div>
  )
}

export default Favorites;