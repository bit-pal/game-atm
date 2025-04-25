module.exports = {  
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser  
    extends: [  
      'eslint:recommended', // Uses the recommended rules from ESLint  
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin  
      'plugin:prettier/recommended' // Uses eslint-config-prettier and plugin-prettier  
    ],  
    parserOptions: {  
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features  
      sourceType: 'module' // Allows for the use of imports  
    },  
    rules: {  
      // Place to specify additional ESLint rules - for example:  
      // '@typescript-eslint/explicit-function-return-type': 'off',  
    }  
  };  