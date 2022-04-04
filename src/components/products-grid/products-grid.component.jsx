import axios from "axios";
import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { setProducts, setTotalProducts, setCurrentCategory, clearProducts } from "../../redux/shop/shop.actions";
import { selectCurrentCategory, selectProducts, selectTotalProducts } from "../../redux/shop/shop.selectors";

import ProductCard from "../product-card/product-card.component";
import CategoriesScroller from "../categories-scroller/categories-scroller.component";

const ProductsGrid = () => {

  const { categoryId } = useParams()

  const dispatch = useDispatch()

  const category = useSelector(selectCurrentCategory)
  const totalProducts = useSelector(selectTotalProducts)
  const products = useSelector(selectProducts)

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
        dispatch(setProducts(data['items']))
        dispatch(setTotalProducts(data['total']))
      } catch (error) {
        console.log(error);
      }
    }
    getProducts()
    return () => dispatch(clearProducts())
  }, [categoryId, dispatch])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const url = `/api/categories/${categoryId}`
        const response = await axios({
          method: 'get',
          url: url,
        })
        const data = response.data
        dispatch(setCurrentCategory(data['item']))
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId) {
      getCategory()
    }
  }, [categoryId, dispatch])

  return (
    <Fragment>
      <header className="p-5 text-2xl font-sans font-medium sticky top-0 z-10 bg-white">
        {
          `${category ? category.name : 'Shop'}`
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
                p.pic
                  ? (
                    <Link to={`/shop/product/${p.id}`} key={p.id}>
                      <ProductCard {...p} />
                    </Link>
                  )
                  : <ProductCard key={p.id} {...p} />
              ))
              : <p>LOADING.....</p>
          }
        </section>
      </main>
    </Fragment>
  )
}

export default ProductsGrid;