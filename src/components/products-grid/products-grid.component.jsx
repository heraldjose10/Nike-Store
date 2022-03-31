import axios from "axios";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";
import CategoriesScroller from "../categories-scroller/categories-scroller.component";

const ProductsGrid = () => {

  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [category, setCategory] = useState({})

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = categoryId
          ? `/api/categories/${categoryId}/products`
          : '/api/products'
        const response = await axios({
          method: 'get',
          url: url,
          params: {
            limit: 20,
            offset: 1
          }
        })
        const data = response.data
        setProducts(data['items'])
        setTotalProducts(data['total'])
      } catch (error) {
        console.log(error);
      }
    }
    getProducts()
  }, [categoryId])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const url = `/api/categories/${categoryId}`
        const response = await axios({
          method: 'get',
          url: url,
        })
        const data = response.data
        setCategory(data['item'])
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId) {
      getCategory()
    }
  }, [categoryId])

  return (
    <Fragment>
      <header className="p-5 text-2xl font-sans font-medium sticky top-0 z-10 bg-white">
        {
          `${category.name ? category.name : 'Shop'}`
        }
      </header>
      <main className="flex flex-col lg:flex-row items-start">
        <CategoriesScroller categoryId={categoryId} />
        <hr className="mb-2 lg:hidden" />
        <div className="py-3 lg:hidden">
          <span className="ml-5 text-gray-500">{`${totalProducts} Results`}</span>
        </div>
        <section className="grid grid-cols-2 auto-cols-max lg:grid-cols-3 grow gap-2 justify-between">
          {
            products.length > 0
              ? products.map(p => (
                <Link to={`/shop/product/${p.id}`} key={p.id}>
                  <ProductCard {...p} />
                </Link>
              ))
              : <p>LOADING.....</p>
          }
        </section>
      </main>
    </Fragment>
  )
}

export default ProductsGrid;