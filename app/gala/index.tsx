import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { galas } from '@/utils/mockData';
import { Gala } from '@/types';
import { router } from 'expo-router';
import { Calendar, MapPin, FileText } from 'lucide-react-native';
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
    // In a real app, this would navigate to a form to add a new gala
    alert('Add new gala');
  };

  const renderItem = ({ item }: { item: Gala }) => (
    <TouchableOpacity
      style={styles.galaCard}
      onPress={() => handleGalaPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.galaName}>{item.name}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Calendar size={16} color={colors.primary.main} />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color={colors.primary.main} />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        
        <View style={styles.docsRow}>
          <FileText size={16} color={colors.primary.main} />
          <Text style={styles.infoText}>
            {item.documents.length} document{item.documents.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Upcoming Galas" showBack={true} />
      
      <View style={styles.content}>
        <FlatList
          data={galas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No upcoming galas</Text>
          }
        />
      </View>
      
      {admin && <AdminFab onPress={handleAddGala} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  galaCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
  },
  galaName: {
    color: colors.neutral.white,
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  docsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lighter,
  },
  infoText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: spacing.xl,
  },
});