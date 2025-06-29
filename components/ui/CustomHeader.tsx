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
    <View>
           <LinearGradient
        colors={["#2563eb", "#06b6d4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingTop: 25, paddingBottom: 14, marginTop: -40 }}
        className="shadow-2xl relative"
      >
       
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
           
      
      </LinearGradient>
      {/* <View style={styles.headerContent}>
     
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: colors.primary.main,
    paddingTop: 50,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lighter,
    bottom:spacing.xxl,
  } as ViewStyle,
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
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
  } as TextStyle,
  rightComponent: {
    marginLeft: spacing.sm,
  } as ViewStyle,
}); 