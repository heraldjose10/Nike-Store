import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useQueryParams from "../../hooks/useQueryParams"

const TxnResult = () => {

  // useEffect(()=>{

  // })
  // const location = useLocation()
  // const (location.search);
  const status = useQueryParams('status')
  const txnId = useQueryParams('txnId')
  console.log(status);
  console.log(txnId);

  return (
    <div>Results are ..</div>
  )
}

export default TxnResult