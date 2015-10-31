var pubkeyAvis = require('./index')

// generate public key
var pubkeyBuf = new ArrayBuffer(32)
var pubkeyUints = new Uint8Array(pubkeyBuf)
for (var i=0; i < 32; i++)
  pubkeyUints[i] = (Math.random() * 256)|0
console.log(pubkeyUints)

// render public key
var pubkeyBase64 = btoa(String.fromCharCode.apply(null, pubkeyUints))
pubkeyOutput.textContent = pubkeyBase64

// render algorithms
pubkeyAvis.blockwork(blockworkCanvas, pubkeyBuf)
pubkeyAvis.blockwild(blockwildCanvas, pubkeyBuf)
pubkeyAvis.wildegraph(wildegraphCanvas, pubkeyBuf)