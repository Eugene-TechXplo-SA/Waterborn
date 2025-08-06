import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { router } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import Button from '@/components/ui/Button';
import { Users, Settings, Shield, ExternalLink, UserPlus, Key, Database } from 'lucide-react-native';

export default function AdminSettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const adminStats = [
    {
      icon: <Users size={20} color="white" />,
      label: 'Total Users',
      value: '156',
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      icon: <Database size={20} color="white" />,
      label: 'Documents',
      value: '47',
      gradient: ['#34d399', '#14b8a6']
    },
    {
      icon: <Shield size={20} color="white" />,
      label: 'Admins',
      value: '3',
      gradient: ['#f472b6', '#f43f5e']
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Admin Settings" showBack={true} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#374151', '#111827']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Admin Dashboard</Text>
              <Text style={styles.heroSubtitle}>
                Manage users, content, and system settings
              </Text>
              
              <View style={styles.statsContainer}>
                {adminStats.map((stat, index) => (
                  <View key={index} style={styles.statCard}>
                    <LinearGradient
                      colors={stat.gradient}
                      style={styles.statIcon}
                    >
                      {stat.icon}
                    </LinearGradient>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.sectionsContainer}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>User Management</Text>
            </View>
            
            <View style={styles.actionGrid}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => alert('Invite user functionality')}
              >
                <UserPlus size={24} color={colors.primary.main} />
                <Text style={styles.actionTitle}>Invite User</Text>
                <Text style={styles.actionDescription}>Add new members</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => alert('Manage user roles')}
              >
                <Key size={24} color={colors.accent.main} />
                <Text style={styles.actionTitle}>User Roles</Text>
                <Text style={styles.actionDescription}>Manage permissions</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>Security & Permissions</Text>
            </View>

            <TouchableOpacity 
              style={styles.permissionsButton}
              onPress={() => alert('Edit permissions')}
            >
              <LinearGradient
                colors={["#2563eb", "#06b6d4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.permissionsGradient}
              >
                <Text style={styles.permissionsButtonText}>Edit Role Permissions</Text>
              </LinearGradient>
            </TouchableOpacity>
            
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Settings size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>App Settings</Text>
            </View>
            
            <View style={styles.settingsContainer}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Enable dark theme</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: colors.neutral.medium, true: colors.primary.main }}
                  thumbColor={colors.neutral.white}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Enable app notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.neutral.medium, true: colors.primary.main }}
                  thumbColor={colors.neutral.white}
                />
              </View>
            </View>
            
            <Button
              title="Reset App Settings"
              
            
              onPress={() => alert('Reset settings')}
              style={{backgroundColor: "red", padding: "20"}}
            />
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ExternalLink size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>Resources</Text>
            </View>
            
            <View style={styles.resourceGrid}>
              <TouchableOpacity 
                style={styles.resourceCard}
                onPress={() => alert('Open documentation')}
              >
                <Text style={styles.resourceTitle}>Documentation</Text>
                <Text style={styles.resourceDescription}>Admin guides & tutorials</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.resourceCard}
                onPress={() => alert('Open support portal')}
              >
                <Text style={styles.resourceTitle}>Support</Text>
                <Text style={styles.resourceDescription}>Get help & assistance</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heroGradient: {
    padding: spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: typography.fontSizes.md,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 80,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  sectionsContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    color: colors.text.primary,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  button: {
    marginBottom: spacing.sm,
  },
  settingsContainer: {
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lighter,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  resourceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  resourceCard: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  resourceTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resourceDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  permissionsButton: {
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionsGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionsButtonText: {
    color: 'white',
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  },
});