import React, { useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Linking, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { volunteerRoles } from '@/utils/mockData';
import Button from '@/components/ui/Button';
import { ExternalLink, Users, Clock, Award, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import CustomHeader from '@/components/ui/CustomHeader';

export default function VolunteerScreen() {
  const admin = isAdmin();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleVolunteerPress = (formLink: string) => {
    Linking.openURL(formLink);
  };

  const handleEditLink = (roleId: string) => {
    alert(`Edit link for role ${roleId}`);
  };

  const benefits = [
    {
      icon: <Users size={20} color="white" />,
      title: "Community",
      description: "Join our amazing swimming community",
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      icon: <Award size={20} color="white" />,
      title: "Experience",
      description: "Gain valuable event management skills",
      gradient: ['#34d399', '#14b8a6']
    },
    {
      icon: <Heart size={20} color="white" />,
      title: "Impact",
      description: "Make a difference in swimmers' lives",
      gradient: ['#f472b6', '#f43f5e']
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Volunteer Registration" showBack={true} />
      
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#f472b6', '#f43f5e', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Make a Splash!</Text>
              <Text style={styles.heroSubtitle}>
                Join our team of volunteers and help make our swimming events a success
              </Text>
              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNumber}>50+</Text>
                  <Text style={styles.heroStatLabel}>Volunteers</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNumber}>12</Text>
                  <Text style={styles.heroStatLabel}>Events</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNumber}>100%</Text>
                  <Text style={styles.heroStatLabel}>Fun</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Volunteer?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <LinearGradient
                  colors={benefit.gradient}
                  style={styles.benefitIcon}
                >
                  {benefit.icon}
                </LinearGradient>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.rolesSection}>
          <Text style={styles.sectionTitle}>Available Roles</Text>
          <View style={styles.rolesContainer}>
            {volunteerRoles.map((role, index) => (
              <View key={role.id} style={styles.roleCard}>
                <View style={styles.roleImageContainer}>
                  <Image
                    source={{
                      uri: role.name === 'Judge'
                        ? 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800'
                        : 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=800'
                    }}
                    style={styles.roleImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.roleImageOverlay}
                  />
                  <View style={styles.roleImageContent}>
                    <Text style={styles.roleName}>{role.name}</Text>
                    <View style={styles.roleTag}>
                      <Clock size={12} color="white" />
                      <Text style={styles.roleTagText}>Flexible Hours</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.roleContent}>
                  <Text style={styles.roleDescription}>
                    {role.name === 'Judge'
                      ? 'Volunteer as a judge to oversee races and ensure fair competition at our swimming events. Your expertise will help maintain the integrity of our competitions.'
                      : 'Help keep track of race times and record results accurately as a volunteer timekeeper. Your precision is crucial for maintaining accurate records of swimmer performances.'}
                  </Text>
                  
                  <View style={styles.roleActions}>
                    {admin && (
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditLink(role.id)}
                      >
                        <Text style={styles.editButtonText}>Edit Link</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() => handleVolunteerPress(role.formLink)}
                    >
                      <LinearGradient
                        colors={['#2563eb', '#06b6d4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.registerGradient}
                      >
                        <ExternalLink size={16} color="white" />
                        <Text style={styles.registerText}>Register Now</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.footer}>
          <LinearGradient
            colors={['#f0f9ff', '#e0f2fe']}
            style={styles.footerGradient}
          >
            <Text style={styles.footerTitle}>
              Thank you for your interest in volunteering!
            </Text>
            <Text style={styles.footerSubtext}>
              Your contribution makes a difference in our swimming community.
            </Text>
          </LinearGradient>
        </View>
      </Animated.ScrollView>
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
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSizes.md,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
    lineHeight: 22,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
  },
  heroStatLabel: {
    fontSize: typography.fontSizes.sm,
    color: 'white',
    opacity: 0.8,
  },
  benefitsSection: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  benefitsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  benefitCard: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  benefitTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  rolesSection: {
    padding: spacing.md,
  },
  rolesContainer: {
    gap: spacing.md,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roleImageContainer: {
    height: 200,
    position: 'relative',
  },
  roleImage: {
    width: '100%',
    height: '100%',
  },
  roleImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  roleImageContent: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
  },
  roleName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: spacing.xs,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
  },
  roleTagText: {
    color: 'white',
    fontSize: typography.fontSizes.sm,
    marginLeft: spacing.xs,
  },
  roleContent: {
    padding: spacing.md,
  },
  roleDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  roleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.neutral.lighter,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  editButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  },
  registerButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    flex: 1,
    marginLeft: spacing.sm,
  },
  registerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  registerText: {
    color: 'white',
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  footer: {
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  footerGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});