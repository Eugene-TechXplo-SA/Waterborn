module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      ["babel-plugin-transform-import-meta", { "module": "ES6" }],
      "@babel/plugin-syntax-import-meta"
    ],
    env: {
      web: {
        plugins: [
          ["babel-plugin-transform-import-meta", { "module": "ES6" }],
          "@babel/plugin-syntax-import-meta"
        ]
      }
    }
  };
};