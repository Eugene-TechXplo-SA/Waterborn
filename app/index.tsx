import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth screen immediately
    router.replace('/auth');
  }, []);

  // Return empty view while redirecting
  return <View style={{ flex: 1 }} />;
}