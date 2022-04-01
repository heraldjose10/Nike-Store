import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import CustomButton from "../../components/custom-button/custom-button.component"
import StylesScroller from "../../components/styles-scroller/styles-scroller.component"

const Item = () => {
  const { productId } = useParams()

  const [product, setProduct] = useState({})
  const [currentStyle, setCurrentStyle] = useState({})

  useEffect(() => {
    const getProduct = async () => {
      const url = `/api/products/${productId}`
      try {
        const response = await axios({
          method: 'get',
          url: url
        })
        const data = response.data
        setProduct(data['item'])
        if (data['item']['styles']) {
          setCurrentStyle(data['item']['styles'][0])
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProduct()
  }, [productId])
  return (
    <main className="py-3">
      <div className="m-5 my-6">
        <h1 className="  text-2xl">
          {product['name']}
        </h1>
        <p>{product['short_description']}</p>
        <p className="mt-6">{`₹${product['price']}`}</p>
        <p className="text-gray-500">incl. of taxes and duties</p>
      </div>
      {
        product['styles'] && product['styles'].length > 0
          ? <img alt="product" src={product['styles'][0]['images'][0]} />
          : ''
      }
      {
        product['styles'] && product['styles'].length > 0
          ? <StylesScroller styles={product['styles']} currentStyle={currentStyle} />
          : ''
      }
      <div className="flex flex-col my-3 px-10">
        <CustomButton buttonText={'Add to Bag'} padding_y={5} />
        <CustomButton buttonText={'Favourite'} inverted={true} padding_y={5} />
      </div>
      <div className="mx-5 my-8 font-light">
        <p className="leading-loose py-5">{product['long_description']}</p>
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
    </main>
  )
}

export default Item