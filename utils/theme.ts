// Theme configuration with swimming-inspired colors

export const colors = {
  // Primary colors
  primary: {
    main: '#0077B6', // Deep blue
    light: '#90E0EF', // Light blue
    dark: '#03045E', // Dark blue
    contrast: '#FFFFFF', // White text on primary
  },
  // Secondary colors
  secondary: {
    main: '#48CAE4', // Bright blue
    light: '#ADE8F4', // Very light blue
    dark: '#0096C7', // Medium blue
    contrast: '#000000', // Black text on secondary
  },
  // Accent colors
  accent: {
    main: '#FFB703', // Gold
    light: '#FFD166', // Light gold
    dark: '#FB8500', // Orange
    contrast: '#000000', // Black text on accent
  },
  // Status colors
  success: '#2CB67D', // Green
  warning: '#FF9F1C', // Amber
  error: '#EF476F', // Red
  info: '#4CC9F0', // Info blue
  purple: '#A78BFA', // A shade of purple for marketplace
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    lightest: '#F8F9FA',
    lighter: '#E9ECEF',
    light: '#DEE2E6',
    medium: '#CED4DA',
    dark: '#6C757D',
    darker: '#495057',
    darkest: '#212529',
    black: '#000000',
  },
  // Background colors
  background: {
    default: '#F0F9FF', // Very light blue background
    paper: '#FFFFFF', // White paper background
    card: '#FFFFFF', // Card background
  },
  // Text colors
  text: {
    primary: '#212529', // Near black
    secondary: '#6C757D', // Dark gray
    disabled: '#ADB5BD', // Medium gray
    hint: '#868E96', // Light gray
    header: '#0077B6', // Deep blue
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  xxxxl: 80,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 0,
  m: 12,
  // mm: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    comfortable: 1.65,
    loose: 1.8,
  },
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
};