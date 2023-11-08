import { definePreset } from '../dist/index.mjs'
import data from './data/tokens.json' assert { type: 'json' }

const define = definePreset({ tokens: data })
console.log(define)
