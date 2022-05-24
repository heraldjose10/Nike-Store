from pprint import pprint
import requests
import json
from backend.checkout import checkout as _checkout
from flask import request, current_app, render_template
import os
import datetime

# import checksum generation utility
# You can get this utility from https://developer.paytm.com/docs/checksum/
import paytmchecksum


@_checkout.post('/checkout')
def checkout():
    """route to initiate payment with paytm payment gateway"""
    data = request.json
    order_id = "ORDERID_" + \
        str(datetime.datetime.now().strftime('%m%d%Y_%H%M%S'))
    mid = os.environ.get('PAYTM_MID')

    paytmParams = {}
    paytmParams["body"] = {
        "requestType": "Payment",
        "mid": mid,
        "websiteName": current_app.config['WEBSITE_NAME'],
        "orderId": order_id,
        "callbackUrl": "http://65.0.231.102:3000/api/txnresult",
        "txnAmount": {
            "value": str(format(float(data['amount']), '.2f')),
            "currency": "INR",
        },
        "userInfo": {
            "custId": "CUST_" + str(data['cust_id']),
        },
    }
    # generate a checksum
    checksum = paytmchecksum.generateSignature(json.dumps(
        paytmParams["body"]), os.environ.get('PAYTM_MERCHENT_KEY'))

    paytmParams["head"] = {
        "signature": checksum
    }

    post_data = json.dumps(paytmParams)

    # for Staging
    url = f'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid={mid}&orderId={order_id}'

    # for Production
    # url = "https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765"

    response = requests.post(
        url,
        data=post_data,
        headers={"Content-type": "application/json"}
    ).json()

    if response['body']['resultInfo']['resultMsg'] == 'Success':
        return {
            'order_id': order_id,
            'txnToken': response['body']['txnToken'],
            'message': 'success'
        }

    return {
        'order_id': None,
        'txnToken': None,
        'message': 'an error occurred'
    }


@_checkout.post('/txnresult')
def callback():
    """route that handle callback request from paytm payment api"""
    received_data = request.form

    paytmParams = {}
    for key, value in received_data.items():
        if key == 'CHECKSUMHASH':
            paytmChecksum = value
        else:
            paytmParams[key] = value
    pprint(paytmParams)
    # Verify checksum
    isValidChecksum = paytmchecksum.verifySignature(
        paytmParams,
        os.environ.get('PAYTM_MERCHENT_KEY'),
        paytmChecksum
    )
    if isValidChecksum:
        txnId = received_data['TXNID']
        orderId = received_data['ORDERID']
        if received_data['STATUS'] == 'TXN_SUCCESS':
            return render_template(
                'redirect.html',
                redirect=f'http://65.0.231.102:3000/txnresult?status=success&txnId={txnId}&orderId={orderId}'
            )
        else:
            return render_template(
                'redirect.html',
                redirect=f'http://65.0.231.102:3000/txnresult?status=failure&txnId={txnId}'
            )
    else:
        return render_template(
            'redirect.html',
            redirect=f'http://65.0.231.102:3000/txnresult?status=error'
        )
