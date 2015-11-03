var pubkeyAvis = require('./index')

if (window.location.hash) {
  var pubkeyBase64 = window.location.hash.replace(/^#/, '')
  var str = atob(pubkeyBase64)

  var pubkeyBuf = new ArrayBuffer(32)
  var pubkeyUints = new Uint8Array(pubkeyBuf)
  for (var i=0; i < 32; i++)
    pubkeyUints[i] = str.charCodeAt(i)
} else {
  // generate public key
  var pubkeyBuf = new ArrayBuffer(32)
  var pubkeyUints = new Uint8Array(pubkeyBuf)
  for (var i=0; i < 32; i++)
    pubkeyUints[i] = (Math.random() * 256)|0
  console.log(pubkeyUints)

  // render public key
  var pubkeyBase64 = btoa(String.fromCharCode.apply(null, pubkeyUints))
}


document.title = 'pubkey avis'
// append(document.body, createElement('h1', pubkeyBase64))
var tfield = createElement('input')
attr(tfield, {
  value: pubkeyBase64,
  style: {width: '90%', fontSize: '200%'}})
tfield.addEventListener('change', function () {
  var pubKeyStr = tfield.value.replace(/^@/, '')
  window.location.hash = pubKeyStr.split('.')[0]
})
append(document.body, tfield)

Object.keys(pubkeyAvis).forEach(function (algo) {
  var canvas = attr(createElement('canvas'), {
    width: 256, height: 256
  })

  var renderBox = createElement('div')
  renderBox.style.float = 'left'
  renderBox.style.padding = '20px'

  append(document.body, renderBox)
  append(renderBox, createElement('h3', algo))
  append(renderBox, canvas)

  pubkeyAvis[algo](canvas, pubkeyBuf)
})

function createElement (tag, innerHTML) {
  var el = document.createElement(tag)
  if (innerHTML) el.innerHTML = innerHTML
  return el
}

function append (parent, child) {
  parent.appendChild(child)
  return child
}

function attr (el, props) {
  for (key in props) {
    if (key === 'style') {
      for (sk in props.style) {
        el.style[sk] = props.style[sk]
      }
    } else {
      el[key] = props[key]
    }
  }
  return el
}

window.addEventListener('hashchange', window.location.reload.bind(window.location))
