import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii, spacing } from "../utils/theme";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface AppButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
}

export function AppButton({ children, onPress, variant = "primary" }: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress ?? (() => {})}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant === "primary" ? styles.primaryLabel : styles.secondaryLabel]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.primarySoft
  },
  ghost: {
    backgroundColor: colors.surfaceMuted
  },
  danger: {
    backgroundColor: colors.dangerSoft
  },
  pressed: {
    opacity: 0.78
  },
  label: {
    fontSize: 14,
    fontWeight: "700"
  },
  primaryLabel: {
    color: "#ffffff"
  },
  secondaryLabel: {
    color: colors.text
  }
});
