import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import DocumentItem from '@/components/ui/DocumentItem';
import { clubDocuments } from '@/utils/mockData';
import { Document } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import CustomHeader from '@/components/ui/CustomHeader';
import { FileText, Folder, Download, Clock } from 'lucide-react-native';

export default function DocumentsScreen() {
  const admin = isAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    alert(`Edit document: ${document.name}`);
  };

  const handleDeleteDocument = (document: Document) => {
    alert(`Delete document: ${document.name}`);
  };

  const handleAddNew = () => {
    alert('Add new document');
  };

  const stats = [
    {
      icon: <FileText size={20} color="white" />,
      label: 'Documents',
      value: clubDocuments.length.toString(),
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      icon: <Folder size={20} color="white" />,
      label: 'Categories',
      value: (categories.length - 1).toString(),
      gradient: ['#34d399', '#14b8a6']
    },
    {
      icon: <Download size={20} color="white" />,
      label: 'Downloads',
      value: '247',
      gradient: ['#fbbf24', '#f97316']
    }
  ];

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
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#34d399', '#14b8a6', '#0891b2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Document Library</Text>
              <Text style={styles.heroSubtitle}>
                Access all club documents, rules, and important information
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

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
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
                <View style={styles.categoryContent}>
                  <Folder 
                    size={16} 
                    color={selectedCategory === category ? 'white' : colors.primary.main} 
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.documentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'All Documents'}
            </Text>
            <View style={styles.documentCount}>
              <Text style={styles.documentCountText}>
                {filteredDocuments.length} items
              </Text>
            </View>
          </View>
          
          <FlatList
            data={filteredDocuments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <FileText size={48} color={colors.neutral.medium} />
                <Text style={styles.emptyTitle}>No documents found</Text>
                <Text style={styles.emptyText}>
                  Try selecting a different category or check back later
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
  } as ViewStyle,
  content: {
    flex: 1,
  } as ViewStyle,
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
  } as ViewStyle,
  heroGradient: {
    padding: spacing.lg,
  } as ViewStyle,
  heroContent: {
    alignItems: 'center',
  } as ViewStyle,
  heroTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: spacing.sm,
  } as TextStyle,
  heroSubtitle: {
    fontSize: typography.fontSizes.md,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
    lineHeight: 22,
  } as TextStyle,
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  } as ViewStyle,
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 80,
  } as ViewStyle,
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  } as ViewStyle,
  statValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
  } as TextStyle,
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: 'white',
    opacity: 0.8,
  } as TextStyle,
  categoriesSection: {
    padding: spacing.md,
    marginBottom: spacing.md,
  } as ViewStyle,
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  } as TextStyle,
  categoryButton: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginRight: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  categoryButtonActive: {
    backgroundColor: colors.primary.main,
  } as ViewStyle,
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  } as ViewStyle,
  categoryText: {
    color: colors.text.primary,
    fontWeight: '500',
    fontSize: typography.fontSizes.sm,
    marginLeft: spacing.xs,
  } as TextStyle,
  categoryTextActive: {
    color: 'white',
  } as TextStyle,
  documentsSection: {
    padding: spacing.md,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  } as ViewStyle,
  documentCount: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  } as ViewStyle,
  documentCountText: {
    color: colors.primary.main,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  } as TextStyle,
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  } as ViewStyle,
  emptyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  } as TextStyle,
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
    lineHeight: 22,
  } as TextStyle,
});