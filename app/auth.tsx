import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ViewStyle, TextStyle, Image, ImageStyle} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { useRouter } from 'expo-router';

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

  const TabButton = ({ tabType, title }: { tabType: 'login' | 'signup', title: string }) => {
    const isActive = activeTab === tabType;
    
    if (isActive) {
      return (
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveTab(tabType)}
        >
          <LinearGradient
            colors={["#2563eb", "#06b6d4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.activeTabGradient}
          >
            <Text style={[styles.tabText, styles.activeTabText]}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    
    return (
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => setActiveTab(tabType)}
      >
        <Text style={styles.tabText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('@/assets/images/Waterborn (1).png')} style={styles.logo} />
        <Text style={styles.title}>Waterborn</Text>
        {/* <Text style={styles.subtitle}>Welcome to your swimming community</Text> */}
      </View>

      <View style={styles.tabContainer}>
        <TabButton tabType="login" title="Login" />
        <TabButton tabType="signup" title="Sign Up" />
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

        <LinearGradient
          colors={["#2563eb", "#06b6d4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 20, marginTop: -10, borderRadius: 10, width: '60%', alignItems: 'center', marginLeft: 60 }}
          className="shadow-2xl relative"
        >
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

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
    backgroundColor: colors.background.default,
  } as ViewStyle,
  header: {
    paddingTop: 10,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: '700',
    color: colors.text.header,
    marginBottom: spacing.sm,
    bottom: spacing.xxxl,
  } as TextStyle,
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    opacity: 0.8,
    bottom: spacing.xxxl,
    fontWeight: 'bold',
  } as TextStyle,
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.white,
    marginHorizontal: spacing.xl,
    marginTop: -spacing.xxxl,
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
    borderRadius: borderRadius.lg,
  } as ViewStyle,
  activeTabGradient: {
    paddingVertical: 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  tabText: {
    textAlign: 'center',
    color: colors.primary.main,
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  } as TextStyle,
  activeTabText: {
    color: colors.neutral.white,
    padding: 0, // Remove padding since it's handled by the gradient container
  } as TextStyle,
  form: {
    padding: spacing.xl,
    marginTop: spacing.xl,
    bottom: spacing.xl,
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
    marginTop: 10,
  } as ImageStyle,
});