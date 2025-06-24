import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/utils/mockData';
import { Product } from '@/types';
import { router } from 'expo-router';
import { isAdmin } from '@/utils/auth';
import AdminFab from '@/components/ui/AdminFab';
import { Search, ShoppingCart } from 'lucide-react-native';
import CustomHeader from '@/components/ui/CustomHeader';

export default function MarketplaceScreen() {
  const admin = isAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products based on search and category
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
    // In a real app, this would add the product to a cart state
    alert(`${product.name} added to cart`);
  };

  const handleEditProduct = (product: Product) => {
    // In a real app, this would navigate to an edit screen
    alert(`Edit product: ${product.name}`);
  };

  const handleDeleteProduct = (product: Product) => {
    // In a real app, this would show a confirmation and then delete
    alert(`Delete product: ${product.name}`);
  };

  const handleAddNewProduct = () => {
    // In a real app, this would navigate to a form to add a new product
    alert('Add new product');
  };

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
            <ShoppingCart size={24} color={colors.primary.main} />
          </TouchableOpacity>
        )}
      />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
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
        
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found</Text>
          }
        />
      </View>
      
      {admin && <AdminFab onPress={handleAddNewProduct} />}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  } as ViewStyle,
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700',
    color: colors.text.primary,
    flex: 1,
  } as TextStyle,
  cartButton: {
    padding: spacing.xs,
  } as ViewStyle,
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    marginTop: -spacing.xl,
    shadowColor: colors.neutral.black,
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
    marginBottom: spacing.md,
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
  productRow: {
    justifyContent: 'space-between',
  } as ViewStyle,
  list: {
    paddingBottom: spacing.xxl,
    
  } as ViewStyle,
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: spacing.xl,
  } as TextStyle,
});