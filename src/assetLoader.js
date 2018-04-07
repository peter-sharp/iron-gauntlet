const partial = require('lodash/fp/partial')
const map = require('lodash/fp/map')
const reduce = require('lodash/fp/reduce')
const curry = require('lodash/fp/curry')

function loadImage(src) {
  var img = new Image()

  var d = new Promise(function handlePromise(res, rej) {
    img.onload = partial(res, [{src, img}])

    img.onerror = partial(rej, [`Could not load image: ${src}`])
  })

  img.src = src

  return d
}



loadImage.loadImages = function(srcs) {
  return Promise.all(map(loadImage, srcs)).then(reduceBySrc)
}


var indexBy = curry(function (key, val, acc, obj) {
  acc[obj[key]] = val ? obj[val] : obj
  return acc
})

var reduceBySrc = partial(reduce, [indexBy('src', 'img'), {}])

module.exports = loadImage
