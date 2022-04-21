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

export const removeFromCart = (cartItems, item) => {

  const newCart = cartItems.map(cartItem => {
    if (cartItem.id === item.id && cartItem.style_name === item.style_name) {
      return {
        ...cartItem,
        count: cartItem.count -= 1
      }
    }
    else {
      return cartItem
    }
  })

  return newCart
}

export const deleteFromCart = (cartItems, item) => {
  const newCart = cartItems.filter(cartItem => (cartItem.id !== item.id || cartItem.style_name !== item.style_name))
  return newCart
}