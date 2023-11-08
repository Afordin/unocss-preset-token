import type { PresetTokenOptions } from '.'

const EXCLUDE_PROPERTY = ['extensions', 'description']
const TYPES_THEME = {
  color: 'colors',
  dimension: 'size',
  'custom-spacing': 'spacing',
  'custom-stroke': 'border',
  radius: 'radius',
  'custom-transition': 'transition',
  'custom-opacity': 'opacity',
  'custom-gradient': 'gradient',
  'custom-grid': 'grid',
  'custom-fontStyle': 'font',
  'custom-shadow': 'shadow'
}

const isObjectEmpty = (objectName: Record<string, any>) => {
  return Object.keys(objectName).length === 0
}

const isObject = (o: any) => {
  return o instanceof Object && o.constructor === Object
}

export const definePreset = ({ divider, tokens }: PresetTokenOptions) => {
  if (!tokens) {
    console.warn('Tokens property is requried')
    return {}
  }

  if (isObjectEmpty(tokens)) return {}

  function isTokenRef (token: string) {
    if (!token) return false
    if (typeof token !== 'string') return false

    return token.startsWith('{') && token.endsWith('}')
  }

  function getDivider () {
    return divider && ['-', '_', '.'].includes(divider) ? divider : '-'
  }

  function processTokenRef (token: string, tokensType: Record<string, any>) {
    const cleaning = token
      .slice(1, -1)
      .replaceAll(' ', getDivider())
      .replaceAll('.', getDivider())
    return tokensType[cleaning] || token
  }

  function recursiveReduce (
    data: Record<string, any>,
    parentKey?: string,
    defaultAcc = {}
  ): Record<string, any> {
    return Object.entries(data).reduce(
      (acc, [key, property]: [key: string, property: Record<string, any>]) => {
        let newKey = parentKey ? [parentKey, key].join(getDivider()) : key
        newKey = newKey.replaceAll(' ', getDivider())

        if (EXCLUDE_PROPERTY.includes(key)) return acc
        if (!isObject(property)) return acc

        if (property.hasOwnProperty('value') && property.type) {
          const type =
            TYPES_THEME[property.type as keyof typeof TYPES_THEME] || null

          if (type) {
            acc[type] ||= {}
            acc[type][newKey] = isTokenRef(property.value)
              ? processTokenRef(property.value, acc[type])
              : property.value
          }

          return acc
        }

        if (property.description || property.extensions) return acc

        return recursiveReduce(property, newKey, acc)
      },
      defaultAcc as Record<string, any>
    )
  }

  function recursive (
    data: Record<string, any>,
    parentKey?: string,
    acc: Record<string, any> = {}
  ): Record<string, any> {
    const arr = Object.entries(data)

    for (let [key, property] of arr) {
      if (EXCLUDE_PROPERTY.includes(key)) continue
      if (!isObject(property)) continue

      let newKey = parentKey ? [parentKey, key].join(getDivider()) : key
      newKey = newKey.replaceAll(' ', getDivider())

      if (property.hasOwnProperty('value') && property.type) {
        const type =
          TYPES_THEME[property.type as keyof typeof TYPES_THEME] || null

        if (type) {
          acc[type] ||= {}
          acc[type][newKey] = isTokenRef(property.value)
            ? processTokenRef(property.value, acc[type])
            : property.value
        }

        continue
      }

      if (property.description || property.extensions) continue

      recursive(property, newKey, acc)
    }

    return acc
  }

  return recursive(tokens)
}

export default definePreset
