import { Fragment } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";

const ProductsGrid = () => {

  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

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
    const getCategories = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/api/categories'
        })
        const data = response.data
        setCategories(data['items'])
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
  }, [])

  return (
    <Fragment>
      <h1 className="mb-5 mx-5 text-2xl font-sans font-medium">Shop</h1>
      <main className="flex flex-col lg:flex-row">
        <aside className="hidden lg:flex w-[260px] flex-col items-center">
          <div>
            {
              categories.length > 0
                ? categories.map(category => (
                  <Link
                    to={`/shop/category/${category.id}`}
                    className={`min-w-fit block my-3 ${String(category.id) === categoryId ? 'underline' : ''}`}
                    key={category.id}
                  >
                    <div className="mx-5" >{category.name}</div>
                  </Link>
                ))
                : <span>loading...</span>
            }
          </div>
          <hr className="mt-6 w-[80%]" />
        </aside>
        <div className="flex gap-2 overflow-scroll no-scrollbar lg:hidden">
          {
            categories.length > 0
              ? categories.map(category => (
                <Link
                  to={`/shop/category/${category.id}`}
                  className={`min-w-fit pb-2 border-b-2 ${String(category.id) === categoryId ? 'border-b-black' : 'border-b-white'}`}
                >
                  <span className="mx-5" >{category.name}</span>
                </Link>
              ))
              : <span>loading...</span>
          }
        </div>
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