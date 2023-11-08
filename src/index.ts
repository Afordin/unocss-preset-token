import { type Preset, mergeDeep } from '@unocss/core'
import { definePreset } from './core'

export * from './core'

export interface PresetTokenOptions {
  /**
   * Separation character for classes
   */
  divider?: '-' | '_' | '.'

  /**
   * Design Tokens Information
   */
  tokens: Record<string, any>
}

export function presetToken<T extends Record<string, any>> (
  options: PresetTokenOptions
): Preset<T> {
  return {
    name: 'afordin/unocss-preset-token',
    extendTheme: util => {
      return mergeDeep(
        util,
        definePreset({ divider: options.divider, tokens: options.tokens })
      )
    }
  }
}

export default presetToken
