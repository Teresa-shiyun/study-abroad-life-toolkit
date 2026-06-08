import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing } from "../utils/theme";

interface FormSheetProps {
  visible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function FormSheet({ children, onClose, title, visible }: FormSheetProps) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.close} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          {children}
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
    backgroundColor: "rgba(44, 69, 78, 0.28)"
  },
  sheet: {
    width: "100%",
    maxWidth: 430,
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  handle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  close: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  closeText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 24
  }
});
