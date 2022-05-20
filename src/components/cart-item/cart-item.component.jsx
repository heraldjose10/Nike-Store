import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { RiDeleteBinLine } from "react-icons/ri"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { deleteFromCartAsync } from "../../redux/cart/cart.actions"
import {
  deleteFavoriteStartAsync,
  setFavoriteStartAsync
} from '../../redux/favorites/favorites.actions';
import { selectItemInFavorites } from '../../redux/favorites/favorites.selectors';

const CartItem = ({ item, accessToken, refreshToken }) => {

  const { id, name, short_description, price, count, images, colour, style_id } = item
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const itemInFavorites = useSelector(selectItemInFavorites(style_id))

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCartAsync(accessToken, '/api/cartitems', item, refreshToken))
  }

  const handleAddToFavorites = () => {
    dispatch(setFavoriteStartAsync(
      accessToken,
      '/api/favorites',
      item,
      refreshToken
    ))
  }

  const handleRemoveFromFavorites = (item) => {
    dispatch(deleteFavoriteStartAsync(
      accessToken,
      '/api/favorites',
      item,
      refreshToken
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: .2 }}
      className="flex px-4 gap-4 my-6 w-full"
    >
      <div className="shrink-0">

        <LazyLoadImage
          alt='product thumbnail'
          src={images[0]}
          effect="opacity"
          className="w-20 h-20 object-cover hover:cursor-pointer md:w-[150px] md:h-[150px]"
          onClick={() => navigate(`/shop/product/${id}`)}
        />
      </div>
      <div className="grow flex-col flex">
        <p
          className="hover:cursor-pointer"
          onClick={() => navigate(`/shop/product/${id}`)}
        >
          {name}
        </p>
        <p className="text-gray-500">{short_description}</p>
        <p className="hidden text-gray-500 md:block">{colour}</p>
        <p className="text-gray-500">{`Quantity ${count}`}</p>
        <p className="flex gap-3 my-2">
          <RiDeleteBinLine
            onClick={handleDeleteFromCart} // animate deletion from cart
            className="w-6 h-6 hover:cursor-pointer hover:text-gray-500 hover:scale-150 transition ease-in-out"
          />

          {
            itemInFavorites
              ? (
                <AiFillHeart
                  onClick={() => handleRemoveFromFavorites(item)}
                  className='w-6 h-6 hover:cursor-pointer hover:text-gray-500 hover:scale-150 transition ease-in-out'
                />
              )
              : (
                <AiOutlineHeart
                  onClick={handleAddToFavorites}
                  className="w-6 h-6 hover:cursor-pointer hover:text-gray-500 hover:scale-150 transition ease-in-out"
                />
              )
          }
        </p>
      </div>
      <div className="max-w-[100px] shrink-0 grow">
        <p className="text-right" >{`₹ ${price * count}`}</p>
      </div>
    </motion.div>
  )
}

export default CartItem