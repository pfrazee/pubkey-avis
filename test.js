var pubkeyAvis = require('./index')

// generate public key
var pubkeyBuf = new ArrayBuffer(32)
var pubkeyUints = new Uint8Array(pubkeyBuf)
for (var i=0; i < 32; i++)
  pubkeyUints[i] = (Math.random() * 256)|0
console.log(pubkeyUints)

// render public key
var pubkeyBase64 = btoa(String.fromCharCode.apply(null, pubkeyUints))

document.title = 'pubkey avis'
append(document.body, createElement('h1', pubkeyBase64))

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
    el[key] = props[key]
  }
  return el
}
