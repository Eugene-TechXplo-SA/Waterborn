import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/utils/theme';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import CustomHeader from '@/components/ui/CustomHeader';
import { User, Settings, LogOut, Shield } from 'lucide-react-native';

export default function ProfileScreen() {
  const admin = isAdmin();

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    router.replace('/auth');
  };

  const handleAdminPress = () => {
    router.push('/admin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Profile" />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={48} color={colors.primary.main} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={24} color={colors.text.primary} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          {admin && (
            <TouchableOpacity style={styles.menuItem} onPress={handleAdminPress}>
              <Shield size={24} color={colors.text.primary} />
              <Text style={styles.menuText}>Admin Panel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <LogOut size={24} color={colors.error} />
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lighter,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  menuSection: {
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  menuText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  logoutText: {
    color: colors.error,
  },
});