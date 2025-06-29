import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, typography } from '@/utils/theme';
import { FileText, Download, Share2, Trash, CreditCard as Edit } from 'lucide-react-native';
import { Document } from '@/types';
import { isAdmin } from '@/utils/auth';

interface DocumentItemProps {
  document: Document;
  onView: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onShare?: (document: Document) => void;
  onDownload?: (document: Document) => void;
}

export default function DocumentItem({ 
  document, 
  onView, 
  onEdit, 
  onDelete,
  onShare,
  onDownload
}: DocumentItemProps) {
  const admin = isAdmin();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onView(document)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#34d399', '#14b8a6', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconContainer}
      >
        <FileText size={24} color="white" />
      </LinearGradient>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {document.name}
        </Text>
        <Text style={styles.date} numberOfLines={1}>
          Updated: {document.lastUpdated}
        </Text>
      </View>
      
      <View style={styles.actions}>
        {onDownload && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onDownload(document)}
          >
            <Download size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
        
        {onShare && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onShare(document)}
          >
            <Share2 size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
        
        {admin && onEdit && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onEdit(document)}
          >
            <Edit size={20} color={colors.accent.dark} />
          </TouchableOpacity>
        )}
        
        {admin && onDelete && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onDelete(document)}
          >
            <Trash size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.primary,
  },
  date: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});