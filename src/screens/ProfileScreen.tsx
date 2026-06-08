import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { CloudPuppyBadge } from "../components/CloudPuppyBadge";
import { Screen } from "../components/Screen";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { colors, radii, shadows, spacing } from "../utils/theme";

export function ProfileScreen() {
  const { language, t } = useLanguage();

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <CloudPuppyBadge size={86} />
        <Text style={styles.name}>{pick("小明", "Xiaoming")}</Text>
        <Text style={styles.subtitle}>{pick("留学生 · 巴黎", "Student · Paris")}</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoLine label={pick("学校", "School")} value={pick("巴黎国际大学", "Paris International University")} />
        <InfoLine label={pick("城市", "City")} value={pick("巴黎，法国", "Paris, France")} />
        <InfoLine label={pick("本学期", "Term")} value={pick("2026 春夏", "Spring/Summer 2026")} />
      </Card>

      <View style={styles.settingsArea}>
        <Pressable style={styles.settingsButton} onPress={() => router.push(routes.settings)}>
          <Text style={styles.settingsGlyph}>⚙</Text>
        </Pressable>
        <View style={styles.settingsTextBlock}>
          <Text style={styles.settingsTitle}>{t("settings")}</Text>
          <Text style={styles.settingsHint}>{pick("语言和显示偏好", "Language and display")}</Text>
        </View>
      </View>

      <Card style={styles.quickCard} onPress={() => router.push(routes.documents)}>
        <View style={styles.quickIcon}>
          <AppIcon name="file" color={colors.accent} size={26} />
        </View>
        <View style={styles.quickTextBlock}>
          <Text style={styles.quickTitle}>{t("documents")}</Text>
          <Text style={styles.quickHint}>{pick("查看护照、签证和证明预览", "View passport, visa, and proof previews")}</Text>
        </View>
      </Card>
    </Screen>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.xl
  },
  name: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "700"
  },
  infoCard: {
    gap: spacing.md
  },
  infoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  infoLabel: {
    color: colors.mutedText,
    fontSize: 15,
    fontWeight: "700"
  },
  infoValue: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right"
  },
  settingsArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  settingsButton: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  settingsGlyph: {
    color: colors.mutedText,
    fontSize: 30,
    fontWeight: "700"
  },
  settingsTextBlock: {
    flex: 1,
    gap: spacing.xs
  },
  settingsTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700"
  },
  settingsHint: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: "700"
  },
  quickCard: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  quickIcon: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.accentSoft
  },
  quickTextBlock: {
    flex: 1,
    gap: spacing.xs
  },
  quickTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  quickHint: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  }
});
