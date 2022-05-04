const PrevArrow = ({ onClick }) => (
  <div className="font-bold text-3xl absolute top-[50%] left-6 bg-white rounded-full h-10 w-10 text-center opacity-30 hover:opacity-100 hover:cursor-pointer z-[5]" onClick={onClick}>
    &lt;
  </div>
)

export default PrevArrow