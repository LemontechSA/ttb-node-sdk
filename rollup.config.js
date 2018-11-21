import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/ttb-node-sdk.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['axios', 'lodash', 'moxios'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
    resolve(),
    commonjs(),
    production && uglify(),
  ],
}
