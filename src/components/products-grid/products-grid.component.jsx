import axios from "axios";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  setCurrentCategory,
  clearProducts,
  clearCurrentCategory,
  fetchProductsStartAsync
} from "../../redux/shop/shop.actions";
import {
  selectNextURL,
  selectCurrentCategory,
  selectProductItems,
  selectTotalProducts,
  selectProductsIsFetching
} from "../../redux/shop/shop.selectors";
import useQueryParams from "../../hooks/useQueryParams";

import ProductCard from "../product-card/product-card.component";
import CategoriesScroller from "../categories-scroller/categories-scroller.component";
import Loader from "../loader.component.jsx/loader.component";

const ProductsGrid = () => {

  const { categoryId } = useParams()
  const search = useQueryParams('search')

  const dispatch = useDispatch()

  const category = useSelector(selectCurrentCategory)
  const totalProducts = useSelector(selectTotalProducts)
  const products = useSelector(selectProductItems)
  const nextURL = useSelector(selectNextURL)
  const isLoadingProducts = useSelector(selectProductsIsFetching)

  const observer = useRef()

  const lastProductRef = useCallback((node) => {
    if (isLoadingProducts) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextURL) {
        let url = nextURL
        dispatch(fetchProductsStartAsync(url, 20, 1))
      }
    })
    if (node) observer.current.observe(node)
  }, [dispatch, nextURL, isLoadingProducts])

  useEffect(() => {
    let url = categoryId
      ? `/api/categories/${categoryId}/products`
      : '/api/products'
    url = search
      ? url + '?query=' + search
      : url
    dispatch(fetchProductsStartAsync(url, 20, 1))
    return () => dispatch(clearProducts())
  }, [categoryId, dispatch, search])

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
    return () => dispatch(clearCurrentCategory())
  }, [categoryId, dispatch])


  let heading = null

  if (search) {
    heading = (
      <div>
        <p className="text-[15px]">Search results for</p>
        <p>
          <span>{search}</span>
          <span className="hidden lg:inline">{`(${totalProducts})`}</span>
        </p>
      </div>
    )
  }
  else if (category) {
    heading = `Shop ${category.name}`
  }
  else {
    heading = 'Shop'
  }

  return (
    <Fragment>
      <header className="p-5 text-2xl font-sans font-medium sticky top-0 z-10 bg-white">
        {
          heading
        }
      </header>
      <main className="flex flex-col lg:flex-row items-start">
        <CategoriesScroller categoryId={categoryId} />
        <hr className="mb-2 lg:hidden" />
        <div className="py-3 lg:hidden">
          <span className="ml-5 text-gray-500">{`${totalProducts} Results`}</span>
        </div>
        <div className="flex flex-col w-full">
          <section
            className={'grid grid-cols-2 auto-cols-max lg:grid-cols-3 gap-2 justify-between grow'}
          >
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
                : !isLoadingProducts && <p>No Products!</p>
            }
          </section>
          {
            isLoadingProducts
              ? <Loader />
              : <div ref={lastProductRef}></div>
          }
        </div>
      </main>
    </Fragment>
  )
}

export default ProductsGrid;