import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { trainingLocations } from '@/utils/mockData';
import { TrainingLocation } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import CustomHeader from '@/components/ui/CustomHeader';
import DocumentItem from '@/components/ui/DocumentItem';
import { MapPin, Clock, Users, Calendar } from 'lucide-react-native';

export default function TrainingLocationsScreen() {
  const admin = isAdmin();

  const handleViewDocument = (location: TrainingLocation) => {
    router.push({
      pathname: '/training',
      params: { id: location.id },
    });
  };

  const handleEditDocument = (location: TrainingLocation) => {
    alert(`Edit document for ${location.name}`);
  };

  const handleDeleteDocument = (location: TrainingLocation) => {
    alert(`Delete document for ${location.name}`);
  };

  const handleAddNew = () => {
    alert('Add new training location');
  };

  const stats = [
    {
      icon: <MapPin size={20} color="white" />,
      label: 'Locations',
      value: trainingLocations.length.toString(),
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      icon: <Users size={20} color="white" />,
      label: 'Swimmers',
      value: '156',
      gradient: ['#34d399', '#14b8a6']
    },
    {
      icon: <Clock size={20} color="white" />,
      label: 'Sessions',
      value: '24',
      gradient: ['#fbbf24', '#f97316']
    }
  ];

  const renderItem = ({ item }: { item: TrainingLocation }) => (
    <DocumentItem
      document={{
        id: item.id,
        name: `Training Schedule - ${item.name}`,
        documentUrl: item.documentUrl,
        category: 'Schedule',
        lastUpdated: item.lastUpdated,
      }}
      onView={() => handleViewDocument(item)}
      onEdit={admin ? () => handleEditDocument(item) : undefined}
      onDelete={admin ? () => handleDeleteDocument(item) : undefined}
      onShare={() => {}}
      onDownload={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Training Schedules" showBack={true} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#22d3ee', '#3b82f6', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Training Schedules</Text>
              <Text style={styles.heroSubtitle}>
                Access training schedules for all our pool locations
              </Text>
              
              <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statCard}>
                    <LinearGradient
                      colors={stat.gradient}
                      style={styles.statIcon}
                    >
                      {stat.icon}
                    </LinearGradient>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Calendar size={24} color={colors.primary.main} />
              <Text style={styles.infoTitle}>Weekly Schedule</Text>
            </View>
            <Text style={styles.infoText}>
              Training sessions run Monday to Friday with special weekend programs available.
            </Text>
          </View>
        </View>
        
        <View style={styles.locationsSection}>
          <Text style={styles.sectionTitle}>Training Locations</Text>
          
          <FlatList
            data={trainingLocations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MapPin size={48} color={colors.neutral.medium} />
                <Text style={styles.emptyTitle}>No training schedules available</Text>
                <Text style={styles.emptyText}>
                  Check back later for updated training schedules
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
      
      {admin && <AdminFab onPress={handleAddNew} />}
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
  },
  heroSubtitle: {
    fontSize: typography.fontSizes.md,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 80,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: 'white',
    opacity: 0.8,
  },
  infoSection: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  infoText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  locationsSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
    lineHeight: 22,
  },
});