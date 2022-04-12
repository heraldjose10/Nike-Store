import React, {
  Fragment,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { debounce } from 'lodash'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

import popularSearchTerms from '../../data/search_terms'

import ProductCard from '../product-card/product-card.component'
import Loader from '../loader.component.jsx/loader.component'

const SearchModal = React.forwardRef((props, ref) => {
  const { handleClose } = props
  const [query, setQuery] = useState('')
  const [results, setResults] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    let url = '/api/products?query=' + query
    const getResults = async () => {
      const response = await axios({
        method: 'get',
        url: url,
        params: {
          limit: 6
        }
      })
      const data = response.data
      setResults(data['items'])
    }
    if (query.length > 2) {
      getResults()
    }
  }, [query])

  const closeVariants = {
    start: {
      opacity: 0,
      scale: .1,
      rotate: -180
    },
    end: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: .9
      }
    }
  }

  const mainVarients = {
    start: {
      y: '-100vh',
    },
    end: {
      y: 0,
      transition: {
        duration: .3
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0,
      transition: {
        delay: .3,
        duration: .5
      }
    }
  }

  const inputVariants = {
    start: {
      x: '80vw',
      opacity: 0
    },
    end: {
      opacity: 1,
      x: 0,
      transition: {
        delay: .3,
        duration: .5
      }
    },
    exit: {
      opacity: 0
    }
  }

  const smallFallVariants = {
    start: {
      y: -10,
      opacity: 0
    },
    end: i => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: .2,
        delay: (i - 1) * .2 + .9
      }
    }),
    exit: {
      y: 30,
      opacity: 0
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      navigate('/shop?search=' + query)
      handleClose()
    }
    else {
      setQuery(e.target.value)
    }
  }

  const debouncedHandleKeyUp = debounce(handleKeyUp, 300)

  return ReactDOM.createPortal(
    <motion.div
      initial="start"
      animate="end"
      exit="exit"
      variants={mainVarients}
      className='bg-white min-h-screen overflow-x-hidden overflow-y-auto lg:min-h-[400px] min-w-full absolute top-0 left-0 z-10 flex flex-col items-center'
    >
      {/* search icon and input box */}
      <div className='flex justify-between px-5 my-3 w-[100%] gap-4 lg:max-w-5xl'>
        <motion.div
          initial='start'
          animate='end'
          exit='exit'
          variants={inputVariants}
          className='flex items-center grow bg-[#f5f5f5] rounded-full'
        >
          <BsSearch
            onClick={
              query.length > 2
                ? () => {
                  navigate('/shop?search=' + query)
                  handleClose()
                }
                : handleClose
            }
            className={`h-6 w-6 mx-2 hover:cursor-pointer`}
          />
          <input
            ref={ref}
            onKeyUp={debouncedHandleKeyUp}
            placeholder="Search"
            className={'bg-inherit grow shrink w-[200px] mr-4 placeholder-stale-400 focus:outline-none hover:placeholder-slate-700 md:inline'}
          />
        </motion.div>

        {/* close button */}
        <motion.button
          onClick={handleClose}
          initial='start'
          animate='end'
          exit='start'
          variants={closeVariants}
          className='h-10 rounded-full bg-[#f5f5f5] hover:bg-[#e5e5e5]  flex justify-center items-center hover:cursor-pointer'
        >
          <MdClose
            className='h-6 w-6 mx-2'
          />
        </motion.button>
      </div>
      <div className='w-full mt-6 lg:max-w-5xl'>
        {
          query.length > 2
            ? (
              // display search results / can be refactored!!
              <motion.section
                exit={{ opacity: 0 }}
                className="overflow-auto grid grid-cols-2 auto-cols-max lg:grid-cols-6 grow gap-2 justify-between"
              >
                {
                  results && results.length > 0
                    ? results.map(p => (
                      p.pic
                        ? (
                          <Link
                            to={`/shop/product/${p.id}`}
                            key={p.id}
                            onClick={handleClose}
                          >
                            <ProductCard width={'lg:w-[150px]'} {...p} />
                          </Link>
                        )
                        : <ProductCard width={'lg:w-[150px]'} key={p.id} {...p} />
                    ))
                    : (
                      <div className='col-span-2 lg:col-span-6 flex flex-row justify-center'>
                        <p className='text-xl'>Could not find products</p>
                      </div>
                    )
                }
              </motion.section>
            )
            : (
              // display popular search terms
              <Fragment>
                <motion.p
                  custom={1}
                  initial='start'
                  animate='end'
                  exit='exit'
                  variants={smallFallVariants}
                  className='text-[#757575] px-5'
                >
                  Popular Search Terms
                </motion.p>
                <motion.ul className='px-5'>
                  {
                    popularSearchTerms.map((term, index) => (
                      <Link
                        key={index}
                        to={`/shop?search=${term}`}
                        onClick={handleClose}
                      >
                        <motion.li
                          className='text-xl my-3'
                          custom={2 + index}
                          initial='start'
                          animate='end'
                          exit='exit'
                          variants={smallFallVariants}
                        >{term}
                        </motion.li>
                      </Link>
                    ))
                  }
                </motion.ul>
              </Fragment>
            )
        }

      </div>
    </motion.div>,
    document.getElementById('search-modal')
  )
})

export default SearchModal