import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useLanguage } from "../i18n";
import type { AppLanguage } from "../types";
import { colors, spacing } from "../utils/theme";

const languages: Array<{ code: AppLanguage; label: string; caption: string }> = [
  { code: "zh", label: "中文", caption: "海外留学生活助手" },
  { code: "en", label: "English", caption: "Study Abroad Life Toolkit" }
];

export function SettingsLanguageScreen() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Screen title={t("language")}>
      <View style={styles.languageList}>
        {languages.map((item) => {
          const selected = item.code === language;

          return (
            <Pressable
              key={item.code}
              onPress={() => setLanguage(item.code)}
              style={[styles.languageCard, selected && styles.selectedCard]}
            >
              <AppIcon name="language" color={selected ? colors.primary : colors.mutedText} size={36} />
              <View style={styles.languageText}>
                <Text style={styles.languageTitle}>{item.label}</Text>
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
              <View style={[styles.statusBox, selected ? styles.successStatusBox : styles.neutralStatusBox]}>
                <Text style={styles.statusLabel}>{t("status")}</Text>
                <Text style={styles.statusValue}>{selected ? t("selected") : t("tapToChange")}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Card>
        <Text style={styles.infoTitle}>{t("appDisplayName")}</Text>
        <Text style={styles.infoText}>{t("projectTypeValue")}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  languageList: {
    gap: spacing.md
  },
  languageCard: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft
  },
  languageText: {
    gap: spacing.xs
  },
  languageTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  caption: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  statusBox: {
    minHeight: 54,
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1
  },
  successStatusBox: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft
  },
  neutralStatusBox: {
    borderColor: colors.border,
    backgroundColor: colors.neutralSoft
  },
  statusLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "800"
  },
  statusValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  infoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  infoText: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  }
});
