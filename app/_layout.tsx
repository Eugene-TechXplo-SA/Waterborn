import "../global.css";
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '@/utils/theme';

// Keep the splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="auth" 
          options={{ 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background.default }
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background.default }
          }} 
        />
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen name="training/[location]" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="training/index" options={{ headerShown: false }} />
        <Stack.Screen name="documents/[document]" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="marketplace/index" options={{ headerShown: false }} />
        <Stack.Screen name="marketplace/[product]" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="marketplace/cart" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="gala/[gala]" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="gala/index" options={{ headerShown: false }} />
        <Stack.Screen name="admin/index" options={{ headerShown: false }} />
        <Stack.Screen name="bill/index" options={{ headerShown: false }} />
        <Stack.Screen name="documents/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
        <Stack.Screen name="volunteer/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/events" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}