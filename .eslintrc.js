module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['airbnb', 'prettier'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'comma-dangle': 'warn',
    'comma-spacing': 'warn',
    'curly': 'warn',
    'dot-notation': 'warn',
    'import/extensions': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'indent': 'off',
    'linebreak-style': 'warn',
    'lines-between-class-members': 'warn',
    'no-else-return': 'warn',
    'no-extra-semi': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-param-reassign': 'warn',
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': 'warn',
    'padded-blocks': 'warn',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'quote-props': 'warn',
    'quotes': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-filename-extension': 'warn',
    'react/jsx-indent': 'warn',
    'react/jsx-tag-spacing': 'warn',
    'react/self-closing-comp': 'warn',
    'semi': 'warn',
    'react/no-array-index-key': 'warn',
    'no-underscore-dangle': ['warn', { 'allow': ['_id']}],
    'no-unused-vars': 'warn',

    'operator-linebreak': 'off',
    'no-debugger': 'off',
    'max-len': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/order': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': 'off',

    'object-curly-newline': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'nonblock-statement-body-position': 'off',
    'react/button-has-type': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'space-before-function-paren': 'off',

    'react/jsx-one-expression-per-line': 'off',

    'react/prop-types': 'off',
  }
};
