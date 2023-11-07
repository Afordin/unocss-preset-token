import type { PresetTokenOptions } from '.'

const themeProps: Record<string, any> = { colors: { map: 'color.colors' } }
const DEFAULT_SETTINGS = { divider: '-' }

class CorePreset {
  EXCLUDED_NESTED_PROPERTY = ['description', 'extensions']
  settings: Omit<PresetTokenOptions, 'tokens'> = {}
  tokens

  constructor ({ tokens, ...settings }: PresetTokenOptions) {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, settings)
    this.tokens = tokens
  }

  getDivider () {
    return this.settings?.divider || '-'
  }

  resolvePath (object: Record<string, any>, path: string, defaultValue?: any) {
    return path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)
  }

  isTokenRef (token: string) {
    if (!token) return false
    return token.startsWith('{') && token.endsWith('}')
  }

  processTokenRef (token: string) {
    const cleaning = token.slice(1, -1)
    const path = this.resolvePath(this.tokens, cleaning)
    return path ? path.value : undefined
  }

  nestedProperty (parentKey: string, properties: Record<string, any>) {
    return Object.entries(properties).reduce((acc, [keyNested, property]) => {
      if (!this.EXCLUDED_NESTED_PROPERTY.includes(keyNested)) {
        const _class = [parentKey, keyNested].join(this.getDivider())

        if (property.value) {
          let value = property.value

          if (this.isTokenRef(value)) value = this.processTokenRef(value)

          if (value) acc[_class] = value
        }
      }

      return acc
    }, {} as Record<string, any>)
  }

  definePreset () {
    if (!this.tokens) return {}

    return Object.entries(themeProps).reduce((acc, [keyOption, themeProp]) => {
      const option = this.resolvePath(this.tokens, themeProp.map)
      if (!option) return acc

      const properties = Object.entries(option).reduce(
        (
          acc,
          [keyProperty, property]: [keyProperty: string, property: any]
        ) => {
          const _class = keyProperty.replaceAll(' ', this.getDivider())

          if (property.value) {
            let value = property.value

            if (this.isTokenRef(value)) value = this.processTokenRef(value)

            if (value) acc[_class] = value
            return acc
          }

          const nested = this.nestedProperty(_class, property)
          return Object.assign({}, acc, nested)
        },
        {} as Record<string, any>
      )
      acc[keyOption] = properties

      return acc
    }, {} as Record<string, any>)
  }
}

export default CorePreset
