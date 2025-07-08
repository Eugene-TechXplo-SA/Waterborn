const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for .mjs files to resolve import.meta syntax errors
config.resolver.sourceExts.push("mjs");

module.exports = withNativeWind(config, { input: "./global.css" });