const StylesScroller = ({ styles, currentStyle }) => (
  <div className="flex gap-1 no-scrollbar overflow-x-scroll mt-1">
    {
      styles.map(style => (
        <img
          src={style['images'][0]}
          className={`min-w-[125px] h-[125px] object-cover border-black rounded ${style.style_name === currentStyle.style_name ? 'border-[1px]' : ''}`}
          alt="product thumbnail"
          key={style['style_name']}
        />
      ))
    }
  </div>
)

export default StylesScroller