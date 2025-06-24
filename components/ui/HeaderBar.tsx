import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '@/utils/theme';
import { Bell, User } from 'lucide-react-native';
import { usePathname, useRouter } from 'expo-router';

interface HeaderBarProps {
  title?: string;
  showProfile?: boolean;
  showNotifications?: boolean;
  showBack?: boolean;
}

export default function HeaderBar({ 
  title = 'Waterborn', 
  showProfile = true, 
  showNotifications = true,
  showBack = false
}: HeaderBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerActions}>
          {showNotifications && (
            <TouchableOpacity style={styles.iconButton}>
              <Bell color={colors.neutral.white} size={24} />
            </TouchableOpacity>
          )}
          {showProfile && (
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/profile')}>
              <User color={colors.neutral.white} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary.main,
    paddingTop: 50, 
    paddingBottom: spacing.md,
    bottom: 45,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    color: colors.neutral.white,
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});