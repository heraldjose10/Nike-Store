import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";


const ScrollToTop = ({ children }) => {

  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname, navType])

  return children
}

export default ScrollToTop