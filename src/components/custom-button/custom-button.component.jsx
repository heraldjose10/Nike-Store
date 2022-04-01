import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ buttonText, buttonLink, inverted, padding_y }) => {

  const navigate = useNavigate()

  return (
    <button
      className={`${inverted ? 'bg-white text-[#111111] border-[1px] border-[#757575] hover:border-black' : 'bg-[#111111] text-white hover:bg-[#757575]'} px-5 py-${padding_y} my-2 rounded-full`}
      onClick={() => navigate(buttonLink)}
    >
      {buttonText}
    </button>
  )
}

export default CustomButton