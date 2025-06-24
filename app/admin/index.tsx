import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Switch, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { router } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import Button from '@/components/ui/Button';
import { Users, Settings, Shield, ExternalLink } from 'lucide-react-native';

export default function AdminSettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Admin Settings" showBack={true} />
      
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>User Management</Text>
            </View>
            
            <Button
              title="Invite New User"
              onPress={() => alert('Invite user functionality')}
              style={styles.button}
            />
            
            <Button
              title="Manage User Roles"
              variant="outline"
              onPress={() => alert('Manage user roles')}
              style={styles.button}
            />
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>Permissions</Text>
            </View>
            
            <Button
              title="Edit Role Permissions"
              onPress={() => alert('Edit permissions')}
              style={styles.button}
            />
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Settings size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>App Settings</Text>
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.neutral.medium, true: colors.primary.main }}
                thumbColor={colors.neutral.white}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.neutral.medium, true: colors.primary.main }}
                thumbColor={colors.neutral.white}
              />
            </View>
            
            <Button
              title="Reset App Settings"
              variant="danger"
              onPress={() => alert('Reset settings')}
              style={styles.button}
            />
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ExternalLink size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>External Links</Text>
            </View>
            
            <Button
              title="Admin Documentation"
              variant="outline"
              onPress={() => alert('Open documentation')}
              style={styles.button}
            />
            
            <Button
              title="Support Portal"
              variant="outline"
              onPress={() => alert('Open support portal')}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </View>
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
    padding: spacing.md,
  },
  section: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
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
  button: {
    marginBottom: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  settingLabel: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
});