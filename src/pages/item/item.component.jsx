import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  clearCurrentProduct,
  clearCurrentStyle,
  fetchCurrentProductStartAsync,
  setCurrentStyle
} from "../../redux/shop/shop.actions"
import {
  selectCurrentProductItem,
  selectCurrentStyle,
  selectCurrentProductIsFetching
} from "../../redux/shop/shop.selectors"

import CustomButton from "../../components/custom-button/custom-button.component"
import ImageSlider from "../../components/images-slider/images-slider.component"
import StylesScroller from "../../components/styles-scroller/styles-scroller.component"

const Item = () => {
  const { productId } = useParams()

  const dispatch = useDispatch()

  const currentProduct = useSelector(selectCurrentProductItem)
  const currentProductIsLoading = useSelector(selectCurrentProductIsFetching)
  const currentStyle = useSelector(selectCurrentStyle)

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

  const ProductUI = (
    <Fragment>
      {
        currentStyle
          ? (
            <div className="hidden lg:grid grid-cols-2 auto-cols-max basis-2/3 flex-wrap gap-4 mx-5">
              {
                currentStyle['images'].map(image => (
                  <img src={image} alt="product" key={image} />
                ))
              }
            </div>
          )
          : ''
      }
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
        <div className="flex flex-col my-3 px-10">
          <CustomButton buttonText={'Add to Bag'} padding_y={5} />
          <CustomButton buttonText={'Favourite'} inverted={true} padding_y={5} />
        </div>
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
    </Fragment>
  )

  return (
    <main className="py-3 lg:flex lg:mx-5 max-w-[1440px] self-center">

      {/* images grid for large devices */}
      {
        currentProductIsLoading
          ? <div>Your Product is Laoding!!!!</div>
          : ProductUI
      }
    </main>
  )
}

export default Item