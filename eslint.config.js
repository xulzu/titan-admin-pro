import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/no-mutating-props': 0,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 1,
    },
  },
])
