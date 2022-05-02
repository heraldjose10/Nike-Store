import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"
import { RiDeleteBinLine, RiHeartLine } from "react-icons/ri"
import { useDispatch } from "react-redux"

import { deleteFromCartAsync } from "../../redux/cart/cart.actions"

const CartItem = ({ item, accessToken, refreshToken }) => {

  const { id, name, short_description, price, count, images, colour } = item

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCartAsync(accessToken, '/api/cartitems', item, refreshToken))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: .2 }}
      className="flex px-4 gap-4 my-6 w-full"
    >
      <div className="shrink-0">
        <img
          className="w-20 h-20 object-cover hover:cursor-pointer md:w-[150px] md:h-[150px]"
          onClick={() => navigate(`/shop/product/${id}`)} //fix this! dont navigate with this id
          alt='product thumbnail'
          src={images[0]}
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
            onClick={handleDeleteFromCart}
            className="w-6 h-6 hover:cursor-pointer hover:text-gray-500"
          />
          <RiHeartLine
            className="w-6 h-6 hover:cursor-pointer hover:text-gray-500"
          />
        </p>
      </div>
      <div className="max-w-[100px] shrink-0 grow">
        <p className="text-right" >{`₹ ${price * count}`}</p>
      </div>
    </motion.div>
  )
}

export default CartItem