import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import CustomButton from "../custom-button/custom-button.component";

const Banner = ({ heading, subtext, pretext, images, alt, shop_link }) => {

  const windowWidth = useWindowWidth()
  const navigate = useNavigate()

  return (
    <div className='mb-20 md:flex flex-col items-center'>
      <img
        alt={alt}
        src={
          windowWidth > 1000
            ? images['landscape']
            : images['portrait']
        }
        className='w-full'
      />
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
      <CustomButton buttonLink={shop_link} buttonText={'Shop'} />
    </div>
  )
}

export default Banner