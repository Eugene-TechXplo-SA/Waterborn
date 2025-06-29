import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { Bell, User, Building, FileText, ShoppingBag, Trophy, Receipt, Clock, Chrome as Home, Calendar, Star, CircleUser as UserCircle, ChevronRight, Waves, Settings } from 'lucide-react-native'; // Correct import for React Native

import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { isAdmin } from '@/utils/auth';

interface FeatureCard {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  gradient: readonly [string, ...string[]];
  href: string;
}

export default function App() {
  const navigation = useNavigation();
  const [notificationCount] = useState(3);
  const admin = isAdmin();

  const features: FeatureCard[] = [
    {
      id: 'training',
      title: 'Training Schedule',
      icon: <Building size={28} color="white" />,
      gradient: ['#22d3ee', '#3b82f6', '#2563eb'] as const, // cyan-400, blue-500, blue-600
      href: '/training/index'
    },
    {
      id: 'documents',
      title: 'General Documents',
      icon: <FileText size={28} color="white" />,
      gradient: ['#34d399', '#14b8a6', '#0891b2'] as const, // emerald-400, teal-500, cyan-600
      href: '/documents/index'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      subtitle: '(Kit)',
      icon: <ShoppingBag size={28} color="white" />,
      gradient: ['#a78bfa', '#8b5cf6', '#6366f1'] as const, // violet-400, purple-500, indigo-600
      href: '/marketplace/index'
    },
    {
      id: 'gala',
      title: 'Gala Registration',
      icon: <Trophy size={28} color="white" />,
      gradient: ['#fbbf24', '#f97316', '#ef4444'] as const, // amber-400, orange-500, red-500
      href: '/gala/index'
    },
    {
      id: 'billing',
      title: 'Bill Management',
      subtitle: 'Coming Soon',
      icon: <Receipt size={28} color="white" />,
      gradient: ['#cbd5e1', '#e5e7eb'] as const, // slate-300, slate-200
      href: '/bill/index',
      isComingSoon: true
    },
    {
      id: 'volunteer',
      title: 'Volunteer Registration',
      icon: <Clock size={28} color="white" />,
      gradient: ['#f472b6', '#f43f5e', '#ef4444'] as const, // pink-400, rose-500, red-500
      href: '/volunteer/index'
    }
  ];

  if (admin) {
    features.push({
      id: 'admin',
      title: 'Admin Settings',
      icon: <Settings size={28} color="white" />,
      gradient: ['#374151', '#111827'] as const, // gray-700, gray-900
      href: '/admin/index'
    });
  }

  const handleFeaturePress = (href: string) => {
    router.push(href);
  };

  const quickStats: {
    icon: React.ReactNode;
    label: string;
    value: string;
    gradient: readonly [string, ...string[]];
  }[] = [
    {
      icon: <Calendar size={24} color="white" />,
      label: 'Sessions',
      value: '12',
      gradient: ['#3b82f6', '#06b6d4'] as const // blue-500, cyan-500
    },
    {
      icon: <FileText size={24} color="white" />,
      label: 'Documents',
      value: '47',
      gradient: ['#10b981', '#14b8a6'] as const // emerald-500, teal-500
    },
    {
      icon: <Trophy size={24} color="white" />,
      label: 'Events',
      value: '8',
      gradient: ['#f59e42', '#f97316'] as const // amber-500, orange-500
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden" edges={['left', 'right']}>
      <StatusBar style="light" />

      {/* Animated Background Elements */}
      <View className="absolute inset-0 overflow-hidden pointer-events-none">
        <View className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse"></View>
        <View className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></View>
      </View>

      {/* Header */}
      <LinearGradient
        colors={["#2563eb", "#06b6d4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingTop: 25, paddingBottom: 14, marginTop: -10 }}
        className="shadow-2xl relative"
      >
        <View className="absolute inset-0 bg-black/5"></View>
        <View className="relative px-6 py-6">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center space-x-3">
              {/* <View className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Waves size={24} color="white" />
              </View> */}
              <Text className="text-3xl font-bold text-white tracking-tight ">
                Waterborn
              </Text>
            </View>
            
            <View className="flex flex-row items-center space-x-3">
              <TouchableOpacity className="relative p-3 text-white active:bg-white/10 rounded-2xl transition-all duration-300 group active:scale-95">
                <Bell size={24} color="white" />
                {notificationCount > 0 && (
                  <Text className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 text-center leading-6 font-bold shadow-lg animate-bounce">
                    {notificationCount}
                  </Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity className="p-3 text-white active:bg-white/10 rounded-2xl transition-all duration-300 group active:scale-95">
                <User size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView className="px-6 py-6 relative z-10" contentContainerStyle={{ paddingBottom: 10 }}>
        <View className="mb-2">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</Text>
          <Text className="text-gray-600 text-lg">Dive into your aquatic journey</Text>
        </View>

        {/* Feature Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 32 }}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              className={`mb-4 bg-white/90 rounded-3xl p-6 shadow-xl border border-white/50 ${feature.isComingSoon ? 'opacity-60' : 'active:scale-95'}`}
              onPress={() => !feature.isComingSoon && handleFeaturePress(feature.href)}
              disabled={feature.isComingSoon}
              style={{ minHeight: 140, width: '48%' }}
            >
              <LinearGradient
                colors={[...feature.gradient] as [ColorValue, ColorValue, ...ColorValue[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 64, height: 64, borderRadius: 16, marginBottom: 16, alignItems: 'center', justifyContent: 'center', marginLeft: 28 }}
              >
                {feature.icon}
              </LinearGradient>
              <Text className="text-lg font-bold text-gray-900 mb-1 text-center">
                {feature.title}
              </Text>
              {feature.subtitle && (
                <Text className={`text-sm ${feature.isComingSoon ? 'text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full' : 'text-gray-600'} mb-2 text-center`}>
                  {feature.subtitle}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
          {quickStats.map((stat, idx) => (
            <View key={stat.label} style={{ width: '32%' }} className="bg-white/90 rounded-2xl p-4 shadow-lg border border-white/50 text-center">
              <LinearGradient
                colors={[...stat.gradient] as [ColorValue, ColorValue, ...ColorValue[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
              >
                {stat.icon}
              </LinearGradient>
              <Text className="text-2xl font-bold text-gray-900">{stat.value}</Text>
              <Text className="text-gray-600 text-sm font-medium">{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 