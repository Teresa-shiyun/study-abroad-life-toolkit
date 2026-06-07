import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing } from "../utils/theme";
import { AppButton } from "./AppButton";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  cancelLabel,
  confirmLabel,
  message,
  onCancel,
  onConfirm,
  title,
  visible
}: ConfirmDialogProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <Pressable style={styles.scrim} onPress={onCancel}>
        <Pressable style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <AppButton onPress={onCancel} variant="ghost">{cancelLabel}</AppButton>
            <AppButton onPress={onConfirm} variant="danger">{confirmLabel}</AppButton>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: spacing.lg,
    backgroundColor: "rgba(10, 20, 30, 0.36)"
  },
  dialog: {
    width: "100%",
    maxWidth: 430,
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  message: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm
  }
});
