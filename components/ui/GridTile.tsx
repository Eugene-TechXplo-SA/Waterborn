import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, borderRadius, spacing, shadows, typography } from '@/utils/theme';
import { router } from 'expo-router';

interface GridTileProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  route?: string;
  subtitle?: string;
}

export default function GridTile({ title, icon, onPress, route, subtitle }: GridTileProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      router.push(route as any);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    margin: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 160,
    width: '45%',
  },
  iconContainer: {
    marginBottom: spacing.sm,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.light,
    borderRadius: borderRadius.lg,
  },
  title: {
    fontWeight: typography.fontWeights.medium as '500',
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});