import request from '../utils/request'

export async function register (params) {
  return request({
    url: '/user/register',
    method: 'post',
    data: { ...params },
    ifHandleOk: true,
    ifHandleError: true

  })
}
export async function msg (params) {
  return request({
    url: '/user/msg',
    method: 'post',
    data: { ...params },
    ifHandleOk: false,
    ifHandleError: true

  })
}
export async function login (params) {
  return request({
    url: '/user/login',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function pwdPay (params) {
  return request({
    url: '/user/pwd/pay',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function pwdLogin (params) {
  return request({
    url: '/user/pwd/login',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}

export async function payAli (params) {
  return request({
    url: '/user/pay/ali',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function payWx (params) {
  return request({
    url: '/user/pay/wx',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function payBank (params) {
  return request({
    url: '/user/pay/bank',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function veri (params) {
  return request({
    url: '/user/veri',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function assets (params) {
  return request({
    url: '/user/assets',
    method: 'post',
    ifHandleOk: false,
    data: { ...params }
  })
}

export async function coinUnit (params) {
  return request({
    url: '/coin/unit',
    method: 'post',
    ifHandleOk: false,
    data: { ...params }
  })
}
export async function otcBuy (params) {
  return request({
    url: '/user/otc/buy',
    method: 'post',
    ifHandleOk: false,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function otcSell (params) {
  return request({
    url: '/user/otc/sell',
    method: 'post',
    ifHandleOk: false,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function otcConfirm (params) {
  return request({
    url: '/user/otc/confirm',
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: { ...params }
  })
}
export async function transactions (params) {
  return request({
    url: '/user/otc/transactions',
    method: 'post',
    ifHandleOk: false,
    data: { ...params }
  })
}
export async function orderList (params) {
  return request({
    url: `/user/order/list/${params.type}`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}

export async function order (params) {
  return request({
    url: `/user/order`,
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: {...params}
  })
}

export async function coinhistory (params) {
  return request({
    url: `/coin/quotation/history`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}
export async function balancedivert (params) {
  return request({
    url: `/user/balance/divert`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function otccancel (params) {
  return request({
    url: `/user/otc/cancel`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function announcement (params) {
  return request({
    url: `/coin/announcement`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}
export async function limitHight (params) {
  return request({
    url: `/user/order/delegate`,
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: {...params}
  })
}
export async function limitLow (params) {
  return request({
    url: `/user/order/delegate`,
    method: 'post',
    ifHandleOk: true,
    ifHandleError: true,
    data: {...params}
  })
}
export async function coinFee (params) {
  return request({
    url: `/coin/fee`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}

export async function otcDetail (params) {
  return request({
    url: `/user/otc/detail`,
    method: 'post',
    ifHandleOk: false,
    ifHandleError: true,
    data: {...params}
  })
}
export async function coinnews (params) {
  return request({
    url: `/coin/news`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}
export async function banner (params) {
  return request({
    url: `/coin/banner`,
    method: 'post',
    ifHandleOk: false,
    data: {...params}
  })
}
export async function withdraw (params) {
  return request({
    url: `/user/withdraw`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function refound (params) {
  return request({
    url: `/user/refound`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function contract (params) {
  return request({
    url: `/coin/contract/value`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function infoveri (params) {
  return request({
    url: `/user/info/veri`,
    method: 'post',
    ifHandleError: false,
    ifHandleOk: false,
    data: {...params}
  })
}
export async function payConfirm (params) {
  return request({
    url: `/user/pay/confirm`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: false,
    data: {...params}
  })
}
export async function orderSell (params) {
  return request({
    url: `/user/order/sell`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function orderCancel (params) {
  return request({
    url: `/user/order/cancel`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function bill (params) {
  return request({
    url: `/user/bill`,
    method: 'post',
    ifHandleError: false,
    ifHandleOk: false,
    data: {...params}
  })
}
export async function billDetail (params) {
  return request({
    url: `/user/bill/detail`,
    method: 'post',
    ifHandleError: false,
    ifHandleOk: false,
    data: {...params}
  })
}
export async function coins (params) {
  return request({
    url: `/coin/coins`,
    method: 'post',
    ifHandleError: false,
    ifHandleOk: false,
    data: {...params}
  })
}
export async function paycancel (params) {
  return request({
    url: `/user/pay/cancel`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: true,
    data: {...params}
  })
}
export async function userstate (params) {
  return request({
    url: `/user/state`,
    method: 'post',
    ifHandleError: true,
    ifHandleOk: false,
    data: {...params}
  })
}
