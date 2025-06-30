import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ViewStyle, TextStyle, ImageStyle, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, typography, shadows } from '@/utils/theme';
import { Product } from '@/types';
import { CreditCard as Edit, Trash, Plus } from 'lucide-react-native';
import { isAdmin } from '@/utils/auth';
import { useCartStore } from '@/utils/cartStore';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onPress, 
  onEdit, 
  onDelete
}: ProductCardProps) {
  const admin = isAdmin();
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    // Find the first available size
    const availableSize = product.sizes.find(size => size.inStock);
    
    if (!availableSize) {
      Alert.alert('Out of Stock', 'This item is currently out of stock.');
      return;
    }
    
    addItem(product, availableSize.name);
    Alert.alert('Added to Cart', `${product.name} (${availableSize.name}) has been added to your cart.`);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        
        <Text style={styles.price}>
          R{product.price.toFixed(2)}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.category}>
            {product.category}
          </Text>
          
          <View style={styles.actions}>
            {!admin && (
              <TouchableOpacity 
                onPress={handleAddToCart}
              >
                <LinearGradient
                  colors={["#2563eb", "#06b6d4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addButton}
                >
                  <Plus size={18} color={colors.neutral.white} />
                </LinearGradient>
              </TouchableOpacity>
            )}
            
            {admin && onEdit && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => onEdit(product)}
              >
                <Edit size={18} color={colors.accent.dark} />
              </TouchableOpacity>
            )}
            
            {admin && onDelete && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => onDelete(product)}
              >
                <Trash size={18} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    width: '48%',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,
  image: {
    width: '100%',
    height: 150,
  } as ImageStyle,
  content: {
    padding: spacing.sm,
  } as ViewStyle,
  name: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
  } as TextStyle,
  price: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: '#2563eb', // Using the primary gradient color
    marginVertical: spacing.xs,
  } as TextStyle,
  category: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  } as TextStyle,
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  } as ViewStyle,
  actions: {
    flexDirection: 'row',
  } as ViewStyle,
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  } as ViewStyle,
  addButton: {
    borderRadius: borderRadius.round,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  } as ViewStyle,
});