import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { colors, spacing, typography } from '@/utils/theme';
import DocumentItem from '@/components/ui/DocumentItem';
import { trainingLocations } from '@/utils/mockData';
import { TrainingLocation } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import CustomHeader from '@/components/ui/CustomHeader';

export default function EventsScreen() {
  const admin = isAdmin();

  const handleViewDocument = (location: TrainingLocation) => {
    router.push({
      pathname: '/training',
      params: { id: location.id },
    });
  };

  const handleEditDocument = (location: TrainingLocation) => {
    // In a real app, this would navigate to an edit screen
    alert(`Edit document for ${location.name}`);
  };

  const handleDeleteDocument = (location: TrainingLocation) => {
    // In a real app, this would show a confirmation and then delete
    alert(`Delete document for ${location.name}`);
  };

  const handleAddNew = () => {
    // In a real app, this would navigate to a form to add a new location
    alert('Add new training location');
  };

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
      <CustomHeader title="Events" />
      
      <View style={styles.content}>
        <FlatList
          data={trainingLocations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No events available</Text>
          }
        />
      </View>
      
      {admin && <AdminFab onPress={handleAddNew} />}
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
  list: {
    paddingBottom: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: spacing.xl,
  },
});