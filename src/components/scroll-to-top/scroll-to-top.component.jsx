import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";


const ScrollToTop = ({ children }) => {

  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if(navType!=='POP'){
      document.documentElement.scrollTo(0, 0)
    }
  }, [location.pathname, navType])

  return children
}

export default ScrollToTop