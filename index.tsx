import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  Bell,
  User,
  Building,
  FileText,
  ShoppingBag,
  Trophy,
  Receipt,
  Clock,
  Home,
  Calendar,
  Star,
  UserCircle,
  ChevronRight,
  Waves
} from 'lucide-react-native'; // Correct import for React Native

import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface FeatureCard {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  color: string;
  href: string;
}

export default function App() {
  const navigation = useNavigation();
  const [activeNav, setActiveNav] = useState('home');
  const [notificationCount] = useState(3);

  const features: FeatureCard[] = [
    {
      id: 'training',
      title: 'Training Schedule',
      icon: <Building className="w-7 h-7 text-white" />,
      color: 'from-cyan-400 via-blue-500 to-blue-600',
      href: '/training'
    },
    {
      id: 'documents',
      title: 'General Documents',
      icon: <FileText className="w-7 h-7 text-white" />,
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      href: '/documents'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      subtitle: '(Kit)',
      icon: <ShoppingBag className="w-7 h-7 text-white" />,
      color: 'from-violet-400 via-purple-500 to-indigo-600',
      href: '/marketplace'
    },
    {
      id: 'gala',
      title: 'Gala Registration',
      icon: <Trophy className="w-7 h-7 text-white" />,
      color: 'from-amber-400 via-orange-500 to-red-500',
      href: '/gala'
    },
    {
      id: 'billing',
      title: 'Bill Management',
      subtitle: 'Coming Soon',
      icon: <Receipt className="w-7 h-7 text-white" />,
      color: 'from-slate-300 to-slate-400',
      href: '/bill',
      isComingSoon: true
    },
    {
      id: 'volunteer',
      title: 'Volunteer Registration',
      icon: <Clock className="w-7 h-7 text-white" />,
      color: 'from-pink-400 via-rose-500 to-red-500',
      href: '/volunteer'
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/schedule' },
    { id: 'events', label: 'Events', icon: Star, href: '/events' },
    { id: 'profile', label: 'Profile', icon: UserCircle, href: '/profile' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white relative overflow-hidden">
      <StatusBar style="light" />

      {/* Animated Background Elements */}
      <View className="absolute inset-0 overflow-hidden pointer-events-none">
        <MotiView
          from={{ translateY: -100, translateX: -100, opacity: 0.2, scale: 0.5 }}
          animate={{ translateY: -160, translateX: -160, opacity: 0.3, scale: 1.2 }}
          transition={{ type: 'timing', duration: 3000, easing: Easing.inOut(Easing.ease), loop: true, repeatReverse: true }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
        />
        <MotiView
          from={{ translateY: 100, translateX: 100, opacity: 0.2, scale: 0.5 }}
          animate={{ translateY: 160, translateX: 160, opacity: 0.3, scale: 1.2 }}
          transition={{ type: 'timing', duration: 3000, easing: Easing.inOut(Easing.ease), loop: true, repeatReverse: true, delay: 1000 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
        />
      </View>

      {/* Header */}
      <View className="bg-blue-600 shadow-2xl relative pt-4 pb-6">
        <View className="absolute inset-0 bg-black/5" />
        <View className="relative px-6 py-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center backdrop-blur-sm">
                <Waves className="w-6 h-6 text-white" />
              </View>
              <Text className="text-3xl font-bold text-white tracking-tight">
                Waterborn
              </Text>
            </View>
            
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="relative p-3 rounded-2xl active:scale-95">
                <Bell className="w-6 h-6 text-white" />
                {notificationCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-6 h-6 items-center justify-center shadow-lg animate-bounce">
                    <Text className="text-white text-xs font-bold">
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity className="p-3 rounded-2xl active:scale-95">
                <User className="w-6 h-6 text-white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-6 py-8 relative z-10">
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</Text>
          <Text className="text-gray-600 text-lg">Dive into your aquatic journey</Text>
        </View>

        {/* Feature Grid */}
        <View className="flex-row flex-wrap justify-between mb-8">
          {features.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              className={`w-[48%] relative bg-white/90 rounded-3xl p-6 shadow-xl border border-white/50 mb-4 ${feature.isComingSoon ? 'opacity-60' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onPress={() => !feature.isComingSoon && navigation.navigate(feature.href as never)}
              disabled={feature.isComingSoon}
            >
              <View className={`absolute inset-0 rounded-3xl opacity-0`} />
              
              <View className="relative z-10 flex flex-col items-center text-center">
                <View className={`w-16 h-16 rounded-2xl mb-4 items-center justify-center text-white shadow-lg ${feature.color}`}>
                  {feature.icon}
                </View>
                
                <Text className="text-lg font-bold text-gray-900 mb-1">
                  {feature.title}
                </Text>
                
                {feature.subtitle && (
                  <Text className={`text-sm ${feature.isComingSoon ? 'text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full' : 'text-gray-600'} mb-2`}>
                    {feature.subtitle}
                  </Text>
                )}
                
                {!feature.isComingSoon && (
                  <View className="flex-row items-center text-blue-600 text-sm font-semibold mt-2">
                    <Text>Explore</Text>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-8">
          <View className="w-[32%] bg-white/90 rounded-2xl p-4 shadow-lg border border-white/50 text-center">
            <View className={`w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-3 items-center justify-center shadow-lg`}>
              <Calendar className="w-6 h-6 text-white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">12</Text>
            <Text className="text-gray-600 text-sm font-medium">Sessions</Text>
          </View>
          
          <View className="w-[32%] bg-white/90 rounded-2xl p-4 shadow-lg border border-white/50 text-center">
            <View className={`w-12 h-12 bg-emerald-500 rounded-xl mx-auto mb-3 items-center justify-center shadow-lg`}>
              <FileText className="w-6 h-6 text-white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">47</Text>
            <Text className="text-gray-600 text-sm font-medium">Documents</Text>
          </View>
          
          <View className="w-[32%] bg-white/90 rounded-2xl p-4 shadow-lg border border-white/50 text-center">
            <View className={`w-12 h-12 bg-amber-500 rounded-xl mx-auto mb-3 items-center justify-center shadow-lg`}>
              <Trophy className="w-6 h-6 text-white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">8</Text>
            <Text className="text-gray-600 text-sm font-medium">Events</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200/50 shadow-2xl">
        <View className="px-4">
          <View className="flex-row items-center justify-around h-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setActiveNav(item.id);
                    navigation.navigate(item.href as never);
                  }}
                  className={`flex-col items-center justify-center space-y-1 px-4 py-2 rounded-2xl active:scale-95 ${isActive ? 'text-blue-600 bg-blue-50 shadow-lg scale-110' : 'text-gray-600'}`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110 text-blue-600' : 'text-gray-600'}`} />
                  <Text className={`text-xs font-semibold ${isActive ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                    {item.label}
                  </Text>
                  {isActive && (
                    <View className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Spacer for fixed navigation */}
      <View className="h-20" />
    </SafeAreaView>
  );
} 