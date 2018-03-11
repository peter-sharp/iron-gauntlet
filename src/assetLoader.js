import partial from 'lodash/fp/partial'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import curry from 'lodash/fp/curry'

export function loadImage(src) {
  var img = new Image()

  var d = new Promise(function handlePromise(res, rej) {
    img.onload = partial(res, [{src, img}])

    img.onerror = partial(rej, [`Could not load image: ${src}`])
  })

  img.src = src

  return d
}

export default {loadImage}

export function loadImages(srcs) {
  return Promise.all(map(loadImage, srcs)).then(reduceBySrc)
}


var indexBy = curry(function (key, val, acc, obj) {
  acc[obj[key]] = val ? obj[val] : obj
  return acc
})

var reduceBySrc = partial(reduce, [indexBy('src', 'img'), {}])
