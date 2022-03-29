import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../../components/product-card/product-card.component"
import { Link } from "react-router-dom"

const Shop = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/api/products',
          params: {
            limit: 20,
            offset: 1
          }
        })
        const data = response.data
        setProducts(data['items'])
      } catch (error) {
        console.log(error);
      }
    }
    getProducts()
  }, [])

  return (
    <div className="grow">
      <h1 className="mb-5 mx-5 text-2xl font-sans font-medium">Shop</h1>
      <main className="flex">
        <aside className="hidden lg:block w-[260px]">
          <h3>Filter</h3>
        </aside>
        <section className="grid grid-cols-2 auto-cols-max lg:grid-cols-3 grow gap-2 justify-between">
          {
            products.length > 0
              ? products.map(p => (
                <Link to={`product/${p.id}`} key={p.id}>
                  <ProductCard {...p} />
                </Link>
              ))
              : <p>LOADING.....</p>
          }
        </section>
      </main>
    </div>
  )
}

export default Shop