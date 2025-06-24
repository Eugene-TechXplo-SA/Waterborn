import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import DocumentItem from '@/components/ui/DocumentItem';
import { clubDocuments } from '@/utils/mockData';
import { Document } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import CustomHeader from '@/components/ui/CustomHeader';

export default function DocumentsScreen() {
  const admin = isAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from documents
  const categories = ['All', ...new Set(clubDocuments.map(doc => doc.category))];

  const filteredDocuments = selectedCategory && selectedCategory !== 'All'
    ? clubDocuments.filter(doc => doc.category === selectedCategory)
    : clubDocuments;

  const handleViewDocument = (document: Document) => {
    router.push({
      pathname: '/documents',
      params: { id: document.id },
    });
  };

  const handleEditDocument = (document: Document) => {
    // In a real app, this would navigate to an edit screen
    alert(`Edit document: ${document.name}`);
  };

  const handleDeleteDocument = (document: Document) => {
    // In a real app, this would show a confirmation and then delete
    alert(`Delete document: ${document.name}`);
  };

  const handleAddNew = () => {
    // In a real app, this would navigate to a form to add a new document
    alert('Add new document');
  };

  const renderItem = ({ item }: { item: Document }) => (
    <DocumentItem
      document={item}
      onView={handleViewDocument}
      onEdit={admin ? handleEditDocument : undefined}
      onDelete={admin ? handleDeleteDocument : undefined}
      onShare={() => {}}
      onDownload={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Club Documents" showBack={true} />
      
      <View style={styles.content}>
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <FlatList
          data={filteredDocuments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No documents available</Text>
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
  } as ViewStyle,
  content: {
    flex: 1,
    padding: spacing.md,
  } as ViewStyle,
  categories: {
    marginBottom: spacing.md,
    marginTop: -spacing.xl,
  } as ViewStyle,
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.neutral.lighter,
    marginRight: spacing.sm,
  } as ViewStyle,
  categoryButtonActive: {
    backgroundColor: colors.primary.main,
  } as ViewStyle,
  categoryText: {
    color: colors.text.secondary,
    fontWeight: '500',
  } as TextStyle,
  categoryTextActive: {
    color: colors.neutral.white,
  } as TextStyle,
  list: {
    paddingBottom: spacing.xl,
  } as ViewStyle,
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: spacing.xl,
  } as TextStyle,
});