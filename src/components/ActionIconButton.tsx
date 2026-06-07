import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "../utils/theme";

type ActionIconName = "edit" | "trash" | "add";

interface ActionIconButtonProps {
  label: string;
  icon: ActionIconName;
  tone?: "primary" | "danger" | "neutral";
  onPress: () => void;
}

export function ActionIconButton({
  icon,
  label,
  tone = "neutral",
  onPress
}: ActionIconButtonProps) {
  const iconColor = tone === "danger" ? colors.danger : colors.primary;

  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[tone], pressed && styles.pressed]}
    >
      {icon === "edit" ? <EditIcon color={iconColor} /> : null}
      {icon === "trash" ? <TrashIcon color={iconColor} /> : null}
      {icon === "add" ? <Text style={[styles.addText, { color: iconColor }]}>+</Text> : null}
    </Pressable>
  );
}

function TrashIcon({ color }: { color: string }) {
  return (
    <View style={styles.trashWrap}>
      <View style={[styles.trashLid, { backgroundColor: color }]} />
      <View style={[styles.trashHandle, { backgroundColor: color }]} />
      <View style={[styles.trashBody, { borderColor: color }]}>
        <View style={[styles.trashLine, { backgroundColor: color }]} />
        <View style={[styles.trashLine, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

function EditIcon({ color }: { color: string }) {
  return (
    <View style={styles.editWrap}>
      <View style={[styles.pencilBody, { backgroundColor: color }]} />
      <View style={[styles.pencilTip, { borderLeftColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    borderWidth: 1
  },
  primary: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft
  },
  danger: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft
  },
  neutral: {
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted
  },
  pressed: {
    opacity: 0.75
  },
  addText: {
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 24
  },
  trashWrap: {
    width: 20,
    height: 22,
    alignItems: "center"
  },
  trashHandle: {
    width: 8,
    height: 3,
    borderRadius: 2
  },
  trashLid: {
    width: 18,
    height: 3,
    marginTop: 2,
    borderRadius: 2
  },
  trashBody: {
    width: 15,
    height: 14,
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  trashLine: {
    width: 2,
    height: 9,
    marginTop: 2,
    borderRadius: 1
  },
  editWrap: {
    width: 22,
    height: 22,
    justifyContent: "center"
  },
  pencilBody: {
    position: "absolute",
    left: 3,
    width: 15,
    height: 5,
    borderRadius: 2,
    transform: [{ rotate: "-38deg" }]
  },
  pencilTip: {
    position: "absolute",
    right: 1,
    top: 6,
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 6,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "-38deg" }]
  }
});
