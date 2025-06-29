import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ViewStyle, TextStyle, Image, ImageStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (activeTab === 'login') {
      // Handle login logic here
      console.log('Login:', { email, password });
      router.replace('/(tabs)');
    } else {
      // Handle signup logic here
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Signup:', { email, password });
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={["#2563eb", "#06b6d4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <Image source={require('@/assets/images/Waterborn (1).png')} style={styles.logo} />
          <Text style={styles.title}>Waterborn</Text>
          <Text style={styles.subtitle}>Welcome to your swimming community</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'login' && styles.activeTab]} 
          onPress={() => setActiveTab('login')}
        >
          <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'signup' && styles.activeTab]} 
          onPress={() => setActiveTab('signup')}
        >
          <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.neutral.dark}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.neutral.dark}
          />
        </View>

        {activeTab === 'signup' && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={colors.neutral.dark}
            />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {activeTab === 'login' && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  } as ViewStyle,
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  } as ViewStyle,
  headerContent: {
    alignItems: 'center',
    zIndex: 1,
  } as ViewStyle,
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: '700',
    color: colors.neutral.white,
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  } as TextStyle,
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.neutral.white,
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.white,
    marginHorizontal: spacing.xl,
    marginTop: -spacing.xl,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  } as ViewStyle,
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  } as ViewStyle,
  activeTab: {
    backgroundColor: colors.primary.main,
  } as ViewStyle,
  tabText: {
    textAlign: 'center',
    color: colors.primary.main,
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  } as TextStyle,
  activeTabText: {
    color: colors.neutral.white,
  } as TextStyle,
  form: {
    padding: spacing.xl,
    marginTop: spacing.xl,
  } as ViewStyle,
  inputContainer: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  inputLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral.dark,
    marginBottom: spacing.xs,
    fontWeight: '500',
  } as TextStyle,
  input: {
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    borderRadius: borderRadius.m,
    fontSize: typography.fontSizes.md,
    borderWidth: 1,
    borderColor: colors.neutral.light,
  } as TextStyle,
  button: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  } as ViewStyle,
  buttonText: {
    color: colors.neutral.white,
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  } as TextStyle,
  forgotPassword: {
    alignItems: 'center',
    marginTop: spacing.lg,
  } as ViewStyle,
  forgotPasswordText: {
    color: colors.primary.main,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  } as TextStyle,
  logo: {
    width: 230,
    height: 230,
    marginBottom: spacing.md,
  } as ImageStyle,
}); 