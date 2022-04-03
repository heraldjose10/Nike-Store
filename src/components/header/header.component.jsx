import React from "react";
import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'
import { BsBag } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="flex justify-between items-center sticky top-0 bg-white z-10">
    <Link to={'/'}>
      <NikeIcon className="h-16 w-16 my-0 mx-4 hover:cursor-pointer" />
    </Link>
    <div className="flex items-center gap-5 mx-6 ">
      <div className="hidden font-sans mr-5 md:block">
        <ul className="flex flex-1">
          <li className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black">Men</li>
          <li className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black">Women</li>
          <li className="p-4 hover:cursor-pointer border-b-2 border-b-white hover:border-b-black">Kids</li>
        </ul>
      </div>
      <div className="hidden h-10 bg-[#f5f5f5] rounded-full md:flex items-center hover:bg-[#e5e5e5]">
        <BsSearch className="h-6 w-6 mx-2 hover:cursor-pointer" />
        <input placeholder="Search" className="bg-inherit mr-4 placeholder-stale-400 focus:outline-none hover:placeholder-slate-700" />
      </div>
      <BsBag className="h-6 w-6 hover:cursor-pointer" />
      <BsSearch className="h-6 w-6 hover:cursor-pointer md:hidden" />
      <FaRegUserCircle className="h-6 w-6 hover:cursor-pointer" />
    </div>
  </nav>
)

export default NavBar