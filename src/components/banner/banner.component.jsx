import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/opacity.css';

import CustomButton from "../custom-button/custom-button.component";

const Banner = ({ heading, subtext, pretext, images, alt, shop_link, windowWidth }) => {

  const navigate = useNavigate()

  return (
    <div className='mb-20 md:flex flex-col items-center'>
      <div
        onClick={() => navigate(shop_link)}
        className={`relative w-full h-0 ${windowWidth > 1000 ? 'pt-[49.3%]' : 'pt-[133%]'} hover:cursor-pointer`}>
        <LazyLoadImage
          alt={alt}
          effect="opacity"
          src={
            windowWidth > 1000
              ? images['landscape']['url']
              : images['portrait']['url']
          }
          className='w-full absolute top-0 left-0'
        />
      </div>
      <div className='my-4 md:flex flex-col items-center'>
        {
          pretext
            ? <p className='capitalize font-light text-l lg:text-xl'>{pretext}</p>
            : ''
        }
        <h1 className="uppercase font-passion text-6xl -tracking-wide leading-[44px] lg:text-8xl lg:leading-[64px]">{heading}</h1>
        {
          subtext
            ? <p className='capitalize font-light text-l lg:text-xl'>{subtext}</p>
            : ''
        }
      </div>
      <CustomButton
        buttonText={'Shop'}
        padding_y={3}
        buttonAction={() => navigate(shop_link)}
      />
    </div>
  )
}

export default Banner