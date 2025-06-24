import React, { useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Linking, ScrollView, Animated } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { volunteerRoles } from '@/utils/mockData';
import Button from '@/components/ui/Button';
import { ExternalLink } from 'lucide-react-native';
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
    // In a real app, this would navigate to a form to edit the link
    alert(`Edit link for role ${roleId}`);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

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
        <Text style={styles.subtitle}>
          Join our team of volunteers and help make our swimming events a success.
        </Text>
        
        <View style={styles.rolesContainer}>
          {volunteerRoles.map((role, index) => {
            const translateY = scrollY.interpolate({
              inputRange: [(index - 1) * 400, index * 400],
              outputRange: [0, -20],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View 
                key={role.id} 
                style={[
                  styles.roleCard,
                  { transform: [{ translateY }] }
                ]}
              >
                <View style={styles.roleHeader}>
                  <Text style={styles.roleName}>{role.name}</Text>
                  {admin && (
                    <Button
                      title="Edit Link"
                      variant="outline"
                      size="sm"
                      onPress={() => handleEditLink(role.id)}
                    />
                  )}
                </View>
                
                <View style={styles.roleImageContainer}>
                  <Image
                    source={{
                      uri: role.name === 'Judge'
                        ? 'https://resources.fina.org/photo-resources/2020/11/25/b4670587-56b7-4ed9-89a9-a348885ce88b/PTIb7eHQ.jpg?width=1200&height=630https://resources.fina.org/photo-resources/2020/11/25/b4670587-56b7-4ed9-89a9-a348885ce88b/PTIb7eHQ.jpg?width=1200&height=630'
                        : 'https://www.chorleymarlins.org.uk/uploads/9/8/2/9/9829061/timekeeper-blog_orig.jpg'
                    }}
                    style={styles.roleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.roleImageOverlay} />
                </View>
                
                <Text style={styles.roleDescription}>
                  {role.name === 'Judge'
                    ? 'Volunteer as a judge to oversee races and ensure fair competition at our swimming events. Your expertise will help maintain the integrity of our competitions.'
                    : 'Help keep track of race times and record results accurately as a volunteer timekeeper. Your precision is crucial for maintaining accurate records of swimmer performances.'}
                </Text>
                
                <Button
                  title="Register Now"
                  onPress={() => handleVolunteerPress(role.formLink)}
                  icon={<ExternalLink size={16} color={colors.primary.contrast} />}
                  style={styles.registerButton}
                />
              </Animated.View>
            );
          })}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for your interest in volunteering!
          </Text>
          <Text style={styles.footerSubtext}>
            Your contribution makes a difference in our swimming community.
          </Text>
        </View>
      </Animated.ScrollView>
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
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    // marginTop: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xxl,
    // lineHeight: typography.lineHeights.normal,
  },
  rolesContainer: {
    paddingHorizontal: spacing.md,
  },
  roleCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roleName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  roleImageContainer: {
    height: 200,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    position: 'relative',
  },
  roleImage: {
    width: '100%',
    height: '100%',
  },
  roleImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary.main,
    opacity: 0.1,
  },
  roleDescription: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    // lineHeight: typography.lineHeights.normal,
  },
  registerButton: {
    marginTop: spacing.sm,
  },
  footer: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});