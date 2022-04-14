import React from "react";

const CustomButton = ({
  buttonText,
  buttonAction,
  inverted,
  padding_y,
  customStyles
}) => {

  return (
    <button
      className={`${inverted ? 'bg-white text-[#111111] border-[1px] border-[#757575] hover:border-black' : 'bg-[#111111] text-white hover:bg-[#757575]'} px-5 py-${padding_y} my-2 rounded-full ${customStyles ? customStyles : ''}`}
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  )
}

export default CustomButton