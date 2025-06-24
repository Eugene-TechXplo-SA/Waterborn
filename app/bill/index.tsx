import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { colors, spacing, typography } from '@/utils/theme';
import { router } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import { Construction } from 'lucide-react-native';
import Button from '@/components/ui/Button';

export default function BillScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Bill Management" showBack={true} />
      
      <View style={styles.content}>
        <View style={styles.placeholderContainer}>
          <Construction size={64} color={colors.neutral.dark} />
          
          <Text style={styles.placeholderTitle}>
            Coming Soon
          </Text>
          
          <Text style={styles.placeholderText}>
            The Bill Management feature is currently under development.
            Check back later for updates.
          </Text>
          
          <Button
            title="Return to Home"
            onPress={() => router.push('/')}
            style={styles.homeButton}
          />
        </View>
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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  placeholderTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  placeholderText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  homeButton: {
    marginTop: spacing.md,
  },
});