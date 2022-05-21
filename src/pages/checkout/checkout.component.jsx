import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"

const Checkout = () => {
  const location = useLocation()
  const txnToken = location.state.txnToken
  const orderId = location.state.orderId

  // useEffect(() => {
  //   const getTransanctionMethods = async () => {
  //     const mid = "VMatdt96102160974984"
  //     const response = await axios({
  //       data: {
  //         head: {
  //           "mid": mid,
  //           "orderId": orderId,
  //           "returnToken": "true"
  //         },
  //         body: {
  //           "tokenType": "TXN_TOKEN",
  //           "token": txnToken,
  //         }
  //       },
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       url: `https://securegw-stage.paytm.in/theia/api/v2/fetchPaymentOptions?mid=${mid}&orderId=${orderId}`,
  //       method: 'post'
  //     })
  //     console.log(response.data);
  //   }
  //   getTransanctionMethods()
  // }, [txnToken, orderId])

  useEffect(() => {

    const mid = "VMatdt96102160974984"

    const onScriptLoad = () => {
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: orderId, /* update order id */
          token: txnToken, /* update token value */
          tokenType: "TXN_TOKEN",
          amount: "10.00" /* update amount */
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
          // initialze configuration using init method 
          window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
            console.log("error => ", error);
          });
        });
      }
    }


    const script = document.createElement('script');

    script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${mid}.js`;
    script.async = true;
    script.onload = onScriptLoad

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }

  })

  return (
    <h1>{txnToken}</h1>
  )
}

export default Checkout