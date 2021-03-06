export const addToCart = (cartItems, item) => {

  let itemPresent = false

  const newCart = cartItems.map(cartItem => {
    if (cartItem.id === item.id && cartItem.style_name === item.style_name) {
      itemPresent = true
      return {
        ...cartItem,
        count: cartItem.count += 1
      }
    }
    else {
      return cartItem
    }
  })

  if (itemPresent) {
    return newCart
  }
  else {
    return [...newCart, { ...item, count: 1 }]
  }
}

export const deleteFromCart = (cartItems, item) => {
  const newCart = cartItems.filter(cartItem =>
    (cartItem.style_id !== item.style_id || (cartItem.style_name !== item.style_name))
  )
  return newCart
}