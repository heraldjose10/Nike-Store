import { Fragment, useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import 'react-lazy-load-image-component/src/effects/blur.css';

import {
  clearCurrentProduct,
  clearCurrentStyle,
  fetchCurrentProductStartAsync,
  setCurrentStyle,
  fetchCurrentProductStart
} from "../../redux/shop/shop.actions"
import { setCartItemStartAsync, updateCartItemAsync } from "../../redux/cart/cart.actions";
import { deleteFavoriteStartAsync, setFavoriteStartAsync } from "../../redux/favorites/favorites.actions";
import {
  selectCurrentProductItem,
  selectCurrentStyle,
  selectCurrentProductIsFetching,
  selectCurrentProductError
} from "../../redux/shop/shop.selectors"
import { selectAccessToken, selectRefreshToken } from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { selectItemInFavorites } from '../../redux/favorites/favorites.selectors';

import CustomButton from "../../components/custom-button/custom-button.component"
import ImageSlider from "../../components/images-slider/images-slider.component"
import StylesScroller from "../../components/styles-scroller/styles-scroller.component"
import Loader from "../../components/loader.component.jsx/loader.component"


const Item = () => {
  const { productId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentProduct = useSelector(selectCurrentProductItem)
  const currentProductIsLoading = useSelector(selectCurrentProductIsFetching)
  const currentStyle = useSelector(selectCurrentStyle)
  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const cartItems = useSelector(selectCartItems)
  const currentProductError = useSelector(selectCurrentProductError)
  const itemInFavorites = useSelector(selectItemInFavorites(currentStyle?.id))

  useLayoutEffect(() => {
    dispatch(fetchCurrentProductStart())
  }, [dispatch])

  useEffect(() => {
    let url = `/api/products/${productId}`
    dispatch(fetchCurrentProductStartAsync(url))
    return () => dispatch(clearCurrentProduct())
  }, [productId, dispatch])

  useEffect(() => {
    const setStyle = () => {
      if (currentProduct && currentProduct['styles']) {
        dispatch(setCurrentStyle(currentProduct['styles'][0]))
      }
    }
    setStyle()
    return () => dispatch(clearCurrentStyle())
  }, [dispatch, currentProduct])

  const item = {
    ...currentStyle,
    id: currentProduct?.id,
    name: currentProduct?.name,
    price: currentProduct?.price,
    short_description: currentProduct?.short_description,
    style_id: currentStyle?.id
  }

  const handleAddToCart = () => {
    const cartItem = cartItems.filter(i => i.style_id === item.style_id)[0]
    const count = cartItem ? cartItem['count'] += 1 : 1
    if (accessToken) {
      count === 1
        ? dispatch(setCartItemStartAsync(
          accessToken,
          '/api/cartitems',
          item,
          count,
          refreshToken
        ))
        : dispatch(updateCartItemAsync(
          accessToken,
          refreshToken,
          item,
          count,
          '/api/cartitems',
        ))
    }
    else {
      navigate('/register')
    }
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

  const ProductUI = (
    <Fragment>
      {/* images grid for large devices */}
      {
        currentStyle
          ? (
            <div className="hidden lg:grid grid-cols-2 auto-cols-max basis-2/3 flex-wrap gap-4 mx-5">
              {
                currentStyle['images'].map(image => (
                  <LazyLoadImage effect="blur" src={image} alt="product" key={image} />
                ))
              }
            </div>
          )
          : ''
      }
      {
        !currentProductError && (
          <div className="grow-0 basis-1/3">
            {
              currentProduct
                ? (
                  <div className="m-5 my-6">
                    <h1 className="  text-2xl">
                      {currentProduct['name']}
                    </h1>
                    <p>{currentProduct['short_description']}</p>
                    <p className="mt-6">{`₹${currentProduct['price']}`}</p>
                    <p className="text-gray-500">incl. of taxes and duties</p>
                  </div>
                )
                : ''
            }

            {/* sliding product images */}

            {
              currentStyle && currentStyle['images']
                ? <ImageSlider images={currentStyle['images']} />
                : ''
            }

            {/* horizontal styles scrolling button */}
            {
              currentProduct && currentStyle
                ? <StylesScroller styles={currentProduct['styles']} currentStyle={currentStyle} />
                : ''
            }
            {
              currentProduct && (
                <div className="flex flex-col my-3 px-10">
                  <CustomButton
                    buttonAction={handleAddToCart}
                    buttonText={'Add to Bag'}
                    padding_y={5}
                  />
                  <CustomButton
                    buttonAction={() => {
                      itemInFavorites
                        ? handleRemoveFromFavorites(item)
                        : handleAddToFavorites()
                    }}
                    buttonText={
                      <p className="flex justify-center items-center gap-1">
                        <span>Favourite</span>
                        {
                          itemInFavorites
                            ? <AiFillHeart className="w-6 h-6" />
                            : <AiOutlineHeart className="w-6 h-6" />
                        }
                      </p>
                    }
                    inverted={true}
                    padding_y={5}
                  />
                </div>
              )
            }
            <div className="mx-5 my-8 font-light">
              {
                currentProduct
                  ? <p className="leading-loose py-5">{currentProduct['long_description']}</p>
                  : ''
              }
              {
                currentStyle
                  ? (
                    <ul className="list-disc px-5">
                      <li>{`Colour Shown: ${currentStyle.colour}`}</li>
                      <li>{`Style: ${currentStyle.style_name}`}</li>
                    </ul>
                  )
                  : ''
              }
            </div>
          </div>
        )
      }
    </Fragment>
  )

  return (
    <main className="py-3 lg:flex lg:mx-5 max-w-[1440px] self-center">
      {
        currentProductIsLoading && !currentProductError
          ? <Loader />
          : ProductUI
      }
      {
        !currentProductIsLoading && currentProductError && (
          <div className="my-10">There was an error loading this product</div>
        )
      }
    </main>
  )
}

export default Item