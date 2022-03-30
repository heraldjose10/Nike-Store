import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ buttonText, buttonLink }) => {

  const navigate = useNavigate()

  return (
    <button
      className="bg-[#111111] text-white px-5 py-1 my-2 rounded-full hover:bg-[#757575]"
      onClick={() => navigate(buttonLink)}
    >
      {buttonText}
    </button>
  )
}

export default CustomButton