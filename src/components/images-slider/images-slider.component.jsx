import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PrevArrow from "../prev-arrow/prev-arrow.component";
import NextArrow from "../next-arrow/next-arrow.component";

const ImageSlider = ({ images }) => {

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