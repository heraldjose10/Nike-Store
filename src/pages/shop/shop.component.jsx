import { Outlet } from "react-router-dom"

const Shop = () => {
  return (
    <div className="grow flex flex-col">
      <Outlet />
    </div>
  )
}

export default Shop