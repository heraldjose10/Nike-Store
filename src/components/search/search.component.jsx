import { Fragment, useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import SearchModal from '../search-modal/search-modal.component';

const Search = () => {

  const [searchOn, setSearchOn] = useState(false)

  const handleSearch = () => {
    setSearchOn(!searchOn)
  }

  if (searchOn) {
    document.body.style.overflow = "hidden"
    document.documentElement.scrollTo(0, 0)
  }
  else {
    document.body.style.overflow = "scroll"
  }

  return (
    <Fragment>
      <div
        className={`h-10 md:bg-[#f5f5f5] rounded-full flex justify-center items-center hover:bg-[#e5e5e5]`}
      >
        <BsSearch
          onClick={handleSearch}
          className={`h-6 w-6 mx-2 hover:cursor-pointer`}
        />
        <input
          placeholder="Search"
          onKeyUp={handleSearch}
          onClick={handleSearch}
          className={`hidden bg-inherit mr-4 placeholder-stale-400 focus:outline-none hover:placeholder-slate-700 md:inline`}
        />
      </div>
      {
        searchOn
          ? <SearchModal handleClose={handleSearch} />
          : ''
      }
    </Fragment>
  )
}

export default Search