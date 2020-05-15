var pako = require('pako')

export default function test (cion = 'bchusdt', time = '1min', fn) {
// K 线相关
  let haurl = 'wss://api.hadax.com/ws'
  let requestK = { // 请求对应信息的数据
    req: `market.${cion}.kline.${time}`,
    id: cion,
    from: Math.round(new Date().getTime() / 1000) - 60,
    to: Math.round(new Date().getTime() / 1000)
  }
  let requestD = { // 请求对应信息的数据
    req: `market.${cion}.depth.step0`,
    id: cion
  }
  let subK = { // 订阅数据
    sub: `market.${cion}.kline.${time}`,
    id: cion
  }
  let subD = { // 订阅数据
    sub: `market.${cion}.depth.step1`,
    id: cion
  }
  let socketK = new WebSocket(haurl)
  socketK.onopen = function () {
    console.log('onopen')
    socketK.send(JSON.stringify(subK))
    socketK.send(JSON.stringify(subD))
    socketK.send(JSON.stringify(requestK))
    socketK.send(JSON.stringify(requestD))
  }
  socketK.onmessage = function (event) {
    let blob = event.data
    let reader = new FileReader()
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result)
      let msg = pako.inflate(ploydata, {to: 'string'})
      handleData(msg)
    }
    reader.readAsArrayBuffer(blob, 'utf-8')
  }
  socketK.onclose = function () {
    console.log('connection closed')
  }
  function unsub (cion, time) {
    let unsubK = { // 订阅数据
      sub: `market.${cion}.kline.${time}`,
      id: cion
    }
    socketK.send(JSON.stringify(unsubK))
  }
  // 处理接收到的信息
  function handleData (msg) {
    let data = JSON.parse(msg)
    if (data.ping) {
    // 如果是 ping 消息
      sendHeartMessage(data.ping)
    } else if (data.status === 'ok') {
    // 响应数据
      handleReponseData(data)
    } else {
    // 数据体
      let obj = {
        [data.ch]: data
      }
      fn(obj, cion, time)
    }
  }

  // 发送响应信息
  function sendHeartMessage (ping) {
    socketK.send(JSON.stringify({'pong': ping}))
  }

  function handleReponseData (data) {
  }
}
