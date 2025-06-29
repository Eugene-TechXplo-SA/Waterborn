import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { router } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import { Construction, Clock, Bell, ArrowRight } from 'lucide-react-native';
import Button from '@/components/ui/Button';

export default function BillScreen() {
  const features = [
    {
      title: 'Monthly Billing',
      description: 'Automated monthly billing for training fees',
      icon: <Clock size={20} color="white" />,
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      title: 'Payment Tracking',
      description: 'Track all your payments and outstanding balances',
      icon: <Bell size={20} color="white" />,
      gradient: ['#34d399', '#14b8a6']
    },
    {
      title: 'Digital Receipts',
      description: 'Download and manage all your payment receipts',
      icon: <ArrowRight size={20} color="white" />,
      gradient: ['#fbbf24', '#f97316']
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Bill Management" showBack={true} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#cbd5e1', '#94a3b8', '#64748b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.iconContainer}>
                <Construction size={48} color="white" />
              </View>
              <Text style={styles.heroTitle}>Coming Soon</Text>
              <Text style={styles.heroSubtitle}>
                We're working hard to bring you a comprehensive bill management system
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What's Coming</Text>
          <Text style={styles.sectionSubtitle}>
            Here's what you can expect from our upcoming bill management feature:
          </Text>
          
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureIcon}
                >
                  {feature.icon}
                </LinearGradient>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.notificationSection}>
          <LinearGradient
            colors={['#f0f9ff', '#e0f2fe']}
            style={styles.notificationGradient}
          >
            <View style={styles.notificationContent}>
              <Bell size={24} color={colors.primary.main} />
              <Text style={styles.notificationTitle}>Get Notified</Text>
              <Text style={styles.notificationText}>
                We'll notify you as soon as the bill management feature is available.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Return to Home"
            onPress={() => router.push('/')}
            style={styles.homeButton}
          />
          
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => alert('Contact support for billing inquiries')}
          >
            <Text style={styles.contactButtonText}>
              Need help with billing? Contact Support
            </Text>
          </TouchableOpacity>
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
    padding: spacing.xl,
  },
  heroContent: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.lg,
    borderRadius: borderRadius.round,
    marginBottom: spacing.lg,
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
    opacity: 0.9,
    lineHeight: 22,
  },
  featuresSection: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  featuresContainer: {
    gap: spacing.md,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  notificationSection: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  notificationGradient: {
    padding: spacing.lg,
  },
  notificationContent: {
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  notificationText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionSection: {
    padding: spacing.md,
    alignItems: 'center',
  },
  homeButton: {
    marginBottom: spacing.md,
    width: '100%',
  },
  contactButton: {
    padding: spacing.md,
  },
  contactButtonText: {
    color: colors.primary.main,
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    textAlign: 'center',
  },
});