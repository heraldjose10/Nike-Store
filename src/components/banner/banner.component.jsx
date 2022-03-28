import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const Banner = ({ heading, subtext, pretext, images, alt }) => {

  const windowWidth = useWindowWidth()

  return (
    <div className='md:flex flex-col items-center'>
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
      <button className="bg-[#111111] text-white px-2 py-1 my-2">SHOP</button>
    </div>
  )
}

export default Banner