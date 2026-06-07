import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../utils/theme";

interface InfoRowProps {
  label: string;
  value?: string;
}

export function InfoRow({ label, value = "-" }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xs
  },
  label: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  value: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21
  }
});
