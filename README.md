# unocss-preset-token [![npm](https://img.shields.io/npm/v/@afordin/unocss-preset-token)](https://npmjs.com/package/@afordin/unocss-preset-token)

Preset to convert data from [Design Token Plugin to Figma](https://www.figma.com/community/plugin/888356646278934516/design-tokens) in theme to UnoCSS

## 🚀 Usage

- **PNPM**

```shell
pnpm i -D @afordin/unocss-preset-token
```

- **NPM**

```shell
npm i -D @afordin/unocss-preset-token
```

- **Yarn**

```shell
yarn add -D @afordin/unocss-preset-token
```

---

```ts
// unocss.config.js
import { defineConfig } from 'unocss';
import presetToken from '@afordin/unocss-preset-token';

export default defineConfig({
  presets: [
    presetToken({
      divider: '-',
      tokens: {},
    }),
  ],
});
```

<details>
<summary>Options</summary><br>

```ts
export interface PresetTokenOptions {
  /**
   * Separation character for classes
   */
  divider?: '-' | '_' | '.';

  /**
   * Design Tokens Information
   */
  tokens: Record<string, any>;
}
```

### divider

The character to separate naming class, default is `-`

```json
// Tokens information
{
  "color": {
    "primary": {
      "description": "Primary color",
      "type": "color",
      "value": "#ff7a5cff",
      "blendMode": "normal"
    }
  }
}
```

The class naming in theme with divider default, `color-primary`

```html
<div class="bg-color-primary" />
```

### tokens

The token structure is based on the Figma [Design Token plugin](https://www.figma.com/community/plugin/888356646278934516/design-tokens).

Theme tokens are based on the [types of tokens](https://github.com/lukasoppermann/design-tokens#token-prefixes) handled by the plugin

```json
// Tokens information
{
  "color": {
    "primary": {
      "description": "Primary color",
      "type": "color",
      "value": "#ff7a5cff",
      "blendMode": "normal"
    }
  },
  "secondary": {
    "description": "Secondary color",
    "type": "color",
    "value": "#ffc9d9ff",
    "blendMode": "normal"
  }
}
```

The classes naming in theme with divider default, `color-primary` and `secondary`

```html
<div class="bg-color-primary" />
<div class="bg-secondary" />
```

<br></details>

## 🤹‍♂️ Playground

You can validate your token information in the [playground](https://transform-token.vercel.app/)

## License

[MIT](./LICENSE) License © 2023 [jp](https://github.com/juanpablo-is)
