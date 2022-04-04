import { useDispatch } from "react-redux"
import { setCurrentStyle } from "../../redux/shop/shop.actions"

const StylesScroller = ({ styles, currentStyle }) => {

  const dispatch = useDispatch()

  return (
    <div className="flex gap-1 no-scrollbar overflow-x-scroll mt-1 max-w-[100vw] lg:flex-wrap">
      {
        styles.map(style => (
          <button key={style['style_name']} onClick={() => dispatch(setCurrentStyle(style))}>
            <img
              src={style['images'][0]}
              className={`min-w-[125px] h-[125px] object-cover border-black rounded ${style.style_name === currentStyle.style_name ? 'border-[1px]' : ''}`}
              alt="product thumbnail"
            />
          </button>
        ))
      }
    </div>
  )
}

export default StylesScroller