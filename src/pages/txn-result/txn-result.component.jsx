import { Fragment } from "react"
import useQueryParams from "../../hooks/useQueryParams"

import { ReactComponent as NikeIcon } from './../../icons/nike-4-logo-svg-vector.svg'

const TxnResult = () => {
  // http://localhost:3000/txnresult?status=success&amp;txnId=20220522111212800110168982503723351&amp;orderId=ORDERID_05222022_231840
  const status = useQueryParams('status')
  const txnId = useQueryParams('amp;txnId')
  const orderId = useQueryParams('amp;orderId')
  console.log(status);
  console.log(txnId);
  console.log(orderId);

  return (
    <div className="flex flex-col items-center my-10 mx-5">
      {
        status === 'success'
          ? (
            <Fragment>
              <h1 className="text-2xl font-semibold">Your order has been placed</h1>
              <h1 className="text-gray-500">Thank you for shopping with Nike.com</h1>
              <div className="my-10 flex-col flex items-start md:items-center">
                <div className="w-[90%] border-t border-[#e5e5e5] h-[1px] my-5"></div>
                <h2 className="text-2xl mb-4">Order Details</h2>
                <p>{`Transanction ID: ${txnId}`}</p>
                <p>{`Order ID: ${orderId}`}</p>
                <div className="w-[90%] border-t border-[#e5e5e5] h-[1px] my-5"></div>
              </div>
              <NikeIcon className='w-20 h-20' />
            </Fragment>
          )
          : (
            <Fragment>
              <div className="my-[30vh] flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center">We could not place your order</h1>
                <h1 className="text-gray-500">Please try again later</h1>
                {txnId && <p className="text-center">{`Transanction ID: ${txnId}`}</p>}
              </div>
            </Fragment>
          )
      }
    </div>
  )
}

export default TxnResult