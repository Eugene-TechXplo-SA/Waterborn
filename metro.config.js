const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for .mjs files to resolve import.meta syntax errors
config.resolver.sourceExts.push("mjs");
config.resolver.unstable_enablePackageExports = true;

// Ensure proper Babel transformation for import.meta syntax
config.transformer.babelTransformerPath = require.resolve("metro-react-native-babel-transformer");

module.exports = withNativeWind(config, { input: "./global.css" });