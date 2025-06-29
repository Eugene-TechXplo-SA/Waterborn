import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/mockData';
import { Product } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import { Search, ShoppingCart, TrendingUp, Package, Star } from 'lucide-react-native';
import CustomHeader from '@/components/ui/CustomHeader';

export default function MarketplaceScreen() {
  const admin = isAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                           product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/marketplace',
      params: { productId: product.id },
    });
  };

  const handleAddToCart = (product: Product) => {
    alert(`${product.name} added to cart`);
  };

  const handleEditProduct = (product: Product) => {
    alert(`Edit product: ${product.name}`);
  };

  const handleDeleteProduct = (product: Product) => {
    alert(`Delete product: ${product.name}`);
  };

  const handleAddNewProduct = () => {
    alert('Add new product');
  };

  const stats = [
    {
      icon: <Package size={20} color="white" />,
      label: 'Products',
      value: products.length.toString(),
      gradient: ['#22d3ee', '#3b82f6']
    },
    {
      icon: <TrendingUp size={20} color="white" />,
      label: 'Popular',
      value: '12',
      gradient: ['#34d399', '#14b8a6']
    },
    {
      icon: <Star size={20} color="white" />,
      label: 'Rating',
      value: '4.8',
      gradient: ['#fbbf24', '#f97316']
    }
  ];

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onAddToCart={handleAddToCart}
      onEdit={admin ? handleEditProduct : undefined}
      onDelete={admin ? handleDeleteProduct : undefined}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader 
        title="Club Merchandise"
        showBack={true}
        rightComponent={!admin && (
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push({ pathname: '/marketplace', params: { showCart: 'true' } })}
          >
            <ShoppingCart size={24} color="white" />
          </TouchableOpacity>
        )}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#a78bfa', '#8b5cf6', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Club Store</Text>
              <Text style={styles.heroSubtitle}>
                Get your official Waterborn gear and equipment
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

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.text.secondary}
            />
          </View>
          
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
        </View>
        
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'All Products'}
          </Text>
          
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
      
      {admin && <AdminFab onPress={handleAddNewProduct} />}
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
  searchSection: {
    padding: spacing.md,
    marginBottom: spacing.md,
  } as ViewStyle,
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  searchIcon: {
    marginRight: spacing.sm,
  } as ViewStyle,
  searchInput: {
    flex: 1,
    padding: spacing.sm,
    fontFamily: 'Inter-Regular',
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  } as TextStyle,
  categories: {
    marginBottom: spacing.sm,
  } as ViewStyle,
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    backgroundColor: 'white',
    marginRight: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  categoryButtonActive: {
    backgroundColor: colors.primary.main,
  } as ViewStyle,
  categoryText: {
    color: colors.text.primary,
    fontWeight: '500',
    fontSize: typography.fontSizes.sm,
  } as TextStyle,
  categoryTextActive: {
    color: 'white',
  } as TextStyle,
  productsSection: {
    padding: spacing.md,
  } as ViewStyle,
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  } as TextStyle,
  productRow: {
    justifyContent: 'space-between',
  } as ViewStyle,
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  } as ViewStyle,
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.fontSizes.md,
  } as TextStyle,
  cartButton: {
    padding: spacing.xs,
  } as ViewStyle,
});