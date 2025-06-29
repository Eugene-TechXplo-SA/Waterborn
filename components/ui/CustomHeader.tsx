import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '@/utils/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
}

export default function CustomHeader({ title, showBack = true, rightComponent }: CustomHeaderProps) {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#2563eb", "#06b6d4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft color={colors.neutral.white} size={24} />
          </TouchableOpacity>
        )}
        
        <Text style={styles.title}>{title}</Text>
        
        {rightComponent && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 14,
    marginTop: -50,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  } as ViewStyle,
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  } as ViewStyle,
  title: {
    flex: 1,
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    color: colors.neutral.white,
    textAlign: 'center',
    marginRight: showBack ? 0 : spacing.sm, // Balance the title when back button is present
  } as TextStyle,
  rightComponent: {
    marginLeft: spacing.sm,
  } as ViewStyle,
});