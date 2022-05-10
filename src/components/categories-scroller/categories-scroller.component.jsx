import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { setCategories } from "../../redux/shop/shop.actions"
import { selectCategories } from "../../redux/shop/shop.selectors"
import useQueryParams from "../../hooks/useQueryParams"

import { FilterInput } from "../filters-modal/filters-modal.component"

const CategoriesAndFilters = ({ categoryId, setFilter }) => {

  const gender = useQueryParams('gender')

  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/api/categories'
        })
        const data = response.data
        dispatch(setCategories(data['items']))
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
  }, [dispatch])

  return (
    <aside className="flex gap-2 overflow-scroll no-scrollbar max-w-full lg:sticky lg:top-[72px] lg:flex-col lg:flex lg:w-[260px] lg:gap-1">
      {
        categories.length > 0
          ? categories.map(category => (
            <Link
              to={`/shop/category/${category.id}`}
              className={`min-w-fit pb-2 border-b-2 ${String(category.id) === categoryId ? 'border-b-black lg:underline' : 'border-b-white'} lg:my-2 lg:pb-0 lg:border-0`}
              key={category.id}
            >
              <p className="mx-5" >{category.name}</p>
            </Link>
          ))
          : ''
      }
      <div className="hidden flex-col justify-between my-6 items-start mx-5 lg:flex">
        <h1 className="text-2xl py-2">Filters</h1>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-lg pb-1">Gender</h2>
          <FilterInput
            gender={gender}
            filtername={'men'}
            setFunction={setFilter}
          />
          <FilterInput
            gender={gender}
            filtername={'women'}
            setFunction={setFilter}
          />
          <FilterInput
            gender={gender}
            filtername={'kids'}
            setFunction={setFilter}
          />
        </div>
        <hr className="my-5" />
      </div>
    </aside>
  )
}

export default CategoriesAndFilters