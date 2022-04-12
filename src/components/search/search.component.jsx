import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import useScrollBarWidth from '../../hooks/useScrollBarWidth';

import SearchModal from '../search-modal/search-modal.component';

const Search = () => {

  const [searchOn, setSearchOn] = useState(false)

  const searchBoxRef = useRef()

  useEffect(() => {
    if (searchOn && searchBoxRef.current) {
      searchBoxRef.current.focus()
    }
  }, [searchOn])

  const handleSearch = () => {
    setSearchOn(!searchOn)
  }

  const root = document.getElementById('root')
  const scrollBarWidth = useScrollBarWidth()

  if (searchOn) {
    document.body.style.paddingRight = `${scrollBarWidth}px`
    root.style.overflow = "hidden"
    root.style.maxHeight = '100vh'
  }
  else {
    document.body.style.paddingRight = `0px`
    root.style.overflow = "auto"
    root.style.maxHeight = 'unset'
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
      <AnimatePresence>
        {
          searchOn
            ? <SearchModal ref={searchBoxRef} handleClose={handleSearch} />
            : ''
        }
      </AnimatePresence>
    </Fragment>
  )
}

export default Search