import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing } from "../utils/theme";

interface PillProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  selected?: boolean;
  onPress?: () => void;
}

export function Pill({ label, tone = "neutral", selected = false, onPress }: PillProps) {
  const content = <Text style={styles.label}>{label}</Text>;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pill,
          styles[tone],
          selected && styles.selected,
          pressed && styles.pressed
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.pill, styles[tone], selected && styles.selected]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  neutral: {
    backgroundColor: colors.neutralSoft
  },
  success: {
    backgroundColor: colors.successSoft
  },
  warning: {
    backgroundColor: colors.warningSoft
  },
  danger: {
    backgroundColor: colors.dangerSoft
  },
  selected: {
    borderColor: colors.primary
  },
  pressed: {
    opacity: 0.75
  },
  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700"
  }
});
