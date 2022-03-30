import { useParams } from "react-router-dom"

const Item = () => {
  const { productId } = useParams()
  return (
    <div>
      <h1>{productId}</h1>
    </div>
  )
}

export default Item