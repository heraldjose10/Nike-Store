import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { setCategories } from "../../redux/shop/shop.actions"
import { selectCategories } from "../../redux/shop/shop.selectors"

const CategoriesScroller = ({ categoryId }) => {

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
              <span className="mx-5" >{category.name}</span>
            </Link>
          ))
          : ''
      }
    </aside>
  )
}

export default CategoriesScroller