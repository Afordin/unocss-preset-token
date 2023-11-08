import { definePreset } from 'unocss-preset-token'

const transform = value => {
  const tokens = JSON.parse(value)

  if (!isObjectEmpty(tokens)) {
    return definePreset({ tokens })
  }

  return {}
}

const isObjectEmpty = objectName => {
  return Object.keys(objectName).length === 0
}

export default transform
