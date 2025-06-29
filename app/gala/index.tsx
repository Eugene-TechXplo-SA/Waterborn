import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { galas } from '@/utils/mockData';
import { Gala } from '@/types';
import { router } from 'expo-router';
import { Calendar, MapPin, FileText, Users, Clock, Star, Trophy } from 'lucide-react-native';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import CustomHeader from '@/components/ui/CustomHeader';

export default function GalaScreen() {
  const admin = isAdmin();

  const handleGalaPress = (gala: Gala) => {
    router.push({
      pathname: '/gala',
      params: { id: gala.id },
    });
  };

  const handleAddGala = () => {
    alert('Add new gala');
  };

  const renderItem = ({ item, index }: { item: Gala; index: number }) => (
    <TouchableOpacity
      style={[styles.galaCard, { marginTop: index === 0 ? 0 : spacing.md }]}
      onPress={() => handleGalaPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={index % 2 === 0 ? ['#fbbf24', '#f97316'] : ['#a78bfa', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.galaName}>{item.name}</Text>
            <View style={styles.statusBadge}>
              <Star size={12} color="#fff" />
              <Text style={styles.statusText}>Featured</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Trophy size={24} color="white" />
          </View>
        </View>
      </LinearGradient>
      
      <View style={styles.cardContent}>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Calendar size={16} color={colors.primary.main} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoText}>{item.date}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <MapPin size={16} color={colors.primary.main} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoText}>{item.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.docsInfo}>
            <FileText size={16} color={colors.accent.main} />
            <Text style={styles.docsText}>
              {item.documents.length} document{item.documents.length !== 1 ? 's' : ''}
            </Text>
          </View>
          
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>View Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Upcoming Galas" showBack={true} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.subtitle}>
            Register for upcoming swimming galas and competitions
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#22d3ee', '#3b82f6']}
                style={styles.statIcon}
              >
                <Users size={20} color="white" />
              </LinearGradient>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Registered</Text>
            </View>
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#34d399', '#14b8a6']}
                style={styles.statIcon}
              >
                <Clock size={20} color="white" />
              </LinearGradient>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Days Left</Text>
            </View>
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#fbbf24', '#f97316']}
                style={styles.statIcon}
              >
                <Star size={20} color="white" />
              </LinearGradient>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Available Galas</Text>
          <FlatList
            data={galas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No upcoming galas</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
      
      {admin && <AdminFab onPress={handleAddGala} />}
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
  headerSection: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  listContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  galaCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardGradient: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  galaName: {
    color: 'white',
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  cardContent: {
    padding: spacing.md,
  },
  infoGrid: {
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoIconContainer: {
    backgroundColor: colors.primary.light,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  infoText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lighter,
  },
  docsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docsText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.sm,
    color: colors.accent.main,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  actionText: {
    color: 'white',
    fontSize: typography.fontSizes.sm,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
  },
});