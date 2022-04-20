const CartItem = ({ name, price, count, images }) => {
  return (
    <div className="flex px-4 gap-4 my-6 w-full">
      <div className="shrink-0">
        <img
          className="w-20 h-20"
          src={images[0]}></img>
      </div>
      <div className="grow flex-col flex">
        <p>{name}</p>
        <p className="text-gray-500">{`Quantity ${count}`}</p>
      </div>
      <div className="max-w-[100px] grow">
        <p>{`$ ${price}`}</p>
      </div>
    </div>
  )
}

export default CartItem