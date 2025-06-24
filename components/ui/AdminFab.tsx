import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, borderRadius, spacing } from '@/utils/theme';
import { Plus } from 'lucide-react-native';

interface AdminFabProps {
  onPress: () => void;
}

export default function AdminFab({ onPress }: AdminFabProps) {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Plus size={24} color={colors.neutral.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    backgroundColor: colors.accent.main,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});