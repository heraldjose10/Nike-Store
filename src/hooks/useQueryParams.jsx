import { useLocation } from "react-router-dom";

const useQueryParams = (queryParam) => {

  const search = useLocation().search
  const params = new URLSearchParams(search).get(queryParam)

  return params
}

export default useQueryParams