import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {

  const PrevArrow = ({ onClick }) => (
    <div className="font-bold text-3xl absolute top-[50%] left-6 bg-white rounded-full h-10 w-10 text-center opacity-30 hover:opacity-100 hover:cursor-pointer z-[5]" onClick={onClick}>
      &lt;
    </div>
  )

  const NextArrow = ({ onClick }) => (
    <div className="font-bold text-3xl absolute top-[50%] right-6 bg-white rounded-full h-10 w-10 text-center opacity-30 hover:opacity-100 hover:cursor-pointer" onClick={onClick}>
      &gt;
    </div>
  )

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings} arrows={true} className="max-w-[100vw] overflow-hidden relative lg:hidden">
      {
        images.map(image => (
          <img src={image} alt="product" key={image} />
        ))
      }
    </Slider>
  )
}

export default ImageSlider