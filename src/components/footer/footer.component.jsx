import React from "react";
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white py-4 sm:p-10 sm:pb-[80px] sm:px-[80px] md:px-[120px]">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col items-center sm:flex-row sm:items-start basis-2/3">
          <ul className="uppercase font-saira leading-8 basis-2/6 my-5 pl-6 w-full md:text-xl md:leading-loose">
            <li className="cursor-pointer w-fit">find a store</li>
            <li className="cursor-pointer w-fit">become a member</li>
            <li className="cursor-pointer w-fit">sign up for email</li>
            <li className="cursor-pointer w-fit">student discounts</li>
            <li className="cursor-pointer w-fit">send us feedback</li>
          </ul>
          <hr className="sm:hidden h-[1px] bg-slate-400 w-[90%]" />
          <ul className="my-5 text-[#777777] basis-2/6 text-sm leading-8 pl-6 w-full">
            <li className="uppercase font-saira text-white text-base md:text-xl md:leading-loose cursor-pointer w-fit">get help</li>
            <li className="hover:text-white cursor-pointer w-fit">Order Status</li>
            <li className="hover:text-white cursor-pointer w-fit">Delivery</li>
            <li className="hover:text-white cursor-pointer w-fit">Returns</li>
            <li className="hover:text-white cursor-pointer w-fit">Payment Options</li>
            <li className="hover:text-white cursor-pointer w-fit">Contact Us On Nike.com Inquiries</li>
            <li className="hover:text-white cursor-pointer w-fit">Contact Us On All Other Inquiries</li>
          </ul>
          <ul className="my-5 text-[#777777] basis-2/6 text-sm leading-8 pl-6 w-full">
            <li className="uppercase font-saira text-white text-base md:text-xl md:leading-loose cursor-pointer w-fit">About Nike</li>
            <li className="hover:text-white cursor-pointer w-fit ">News</li>
            <li className="hover:text-white cursor-pointer w-fit" >Careers</li>
            <li className="hover:text-white cursor-pointer w-fit" >Investors</li>
            <li className="hover:text-white cursor-pointer w-fit" >Sustainability</li>
          </ul>
        </div>
        <div className="my-7">
          <ul className="flex gap-3 pl-6 basis-1/3">
            <li className="cursor-pointer rounded-full bg-[#7e7e7e] w-8 h-8 flex items-center justify-center hover:bg-white">
              <a target='_blank' href="https://www.facebook.com/nike">
                <FaFacebook className="w-6 h-6 text-black" />
              </a>
            </li>
            <li className="cursor-pointer rounded-full bg-[#7e7e7e] w-8 h-8 flex items-center justify-center hover:bg-white">
              <a target='_blank' href="https://twitter.com/Nike">
                <FaTwitter className="w-6 h-6 text-black" />
              </a>
            </li>
            <li className="cursor-pointer rounded-full bg-[#7e7e7e] w-8 h-8 flex items-center justify-center hover:bg-white">
              <a target='_blank' href="https://instagram.com/nike">
                <FaInstagram className="w-6 h-6 text-black" />
              </a>
            </li>
            <li className="cursor-pointer rounded-full bg-[#7e7e7e] w-8 h-8 flex items-center justify-center hover:bg-white">
              <a target='_blank' href="https://www.youtube.com/user/nike">
                <FaYoutube className="w-6 h-6 text-black" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col text-xs text-[#7e7e7e] pl-6 sm:flex-row justify-between mt-4">
        <p className="mb-3">2022 Nike, Inc. All Rights Reserved</p>
        <ul className="sm:flex flex-row gap-6">
          <li className="mb-3 hover:cursor-pointer hover:text-white w-fit">Terms of Sale</li>
          <li className="mb-3 hover:cursor-pointer hover:text-white w-fit">Terms of Use</li>
          <li className="mb-3 hover:cursor-pointer hover:text-white w-fit">Nike Privacy Policy</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer