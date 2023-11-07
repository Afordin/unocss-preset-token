import { type Preset, mergeDeep } from '@unocss/core'
import CorePreset from './core'

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
  const instance = new CorePreset(options)

  return {
    name: 'afordin/unocss-preset-token',
    extendTheme: util => {
      return mergeDeep(util, instance.definePreset())
    }
  }
}

export default presetToken
