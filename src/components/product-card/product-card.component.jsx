import product_images from "../../data/product_images"

const ProductCard = ({ pic, short_description, price, category, name, width }) => (
  <div className={`${width ? width : 'w-[50vw-8px] lg:w-[25vw]'} mb-2`}>
    <img
      src={
        pic || product_images[category]
      }
      alt="product"
      className={`w-full object-cover ${width ? width : 'h-[50vw] lg:h-[25vw]'} ${pic ? '' : 'opacity-30'}`}
    />
    <div className="p-3 text-sm font-sans">
      <h3 className="font-medium">{name}</h3>
      <p className="text-gray-500">{short_description}</p>
      <p className="my-3">{`₹${price}.00`}</p>
    </div>
  </div>
)

export default ProductCard