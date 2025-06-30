import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/utils/theme';
import { router } from 'expo-router';
import CustomHeader from '@/components/ui/CustomHeader';
import Button from '@/components/ui/Button';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

// Mock cart data - in a real app this would come from state management
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Club Hoodie',
    price: 45.99,
    image: 'https://publicpool.co/cdn/shop/files/FS_HoodieBlueBack.jpg?v=16929079250',
    size: 'M',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Racing Goggles',
    price: 29.99,
    image: 'https://zone3.com/cdn/shop/files/Volare_Streamline_Racing_Swim_Goggles_-_ZONE3_UK-597804_1000x@2x.jpg?v=1717521870',
    size: 'One Size',
    quantity: 2,
  },
  {
    id: '3',
    name: 'Swim Cap',
    price: 12.99,
    image: 'https://static.dezeen.com/uploads/2022/09/soul-cap-adidas-sportswear-fashion-swimming-cap_dezeen_2364_col_hero2.jpg',
    size: 'Adult',
    quantity: 1,
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(items => items.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.15; // 15% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Proceed to payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            // In a real app, this would navigate to payment processing
            Alert.alert('Success', 'Order placed successfully!');
            setCartItems([]);
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Trash2 size={18} color={colors.error} />
        </TouchableOpacity>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={16} color={colors.text.primary} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={16} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemTotal}>
          R{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['#f0f9ff', '#e0f2fe']}
        style={styles.emptyGradient}
      >
        <ShoppingBag size={64} color={colors.text.secondary} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Add some items from our store to get started
        </Text>
        <Button
          title="Continue Shopping"
          onPress={() => router.back()}
          style={styles.continueButton}
        />
      </LinearGradient>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Shopping Cart" showBack={true} />
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Shopping Cart" showBack={true} />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.itemCount}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </Text>
        </View>
        
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.summarySection}>
          <LinearGradient
            colors={['#ffffff', '#f8fafc']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>R{calculateSubtotal().toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>VAT (15%)</Text>
              <Text style={styles.summaryValue}>R{calculateTax().toFixed(2)}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R{calculateTotal().toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#2563eb", "#06b6d4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkoutGradient}
              >
                <CreditCard size={20} color="white" />
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lighter,
  },
  itemCount: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  cartList: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  itemSize: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  itemPrice: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: '#2563eb',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 80,
  },
  removeButton: {
    padding: spacing.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.lighter,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.xs,
  },
  quantityButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.round,
  },
  quantityText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginHorizontal: spacing.sm,
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lighter,
  },
  summaryGradient: {
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.lighter,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  checkoutButton: {
    marginTop: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  checkoutText: {
    color: 'white',
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  emptyGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  continueButton: {
    width: '80%',
  },
});