import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useLanguage } from "../i18n";
import type { AppLanguage } from "../types";
import { colors, radii, spacing } from "../utils/theme";

const languages: Array<{ code: AppLanguage; label: string; caption: string }> = [
  { code: "zh", label: "简体中文", caption: "简体中文" },
  { code: "en", label: "English", caption: "English" }
];

export function SettingsLanguageScreen() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Screen>
      <View style={styles.topRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title}>{t("language")}</Text>
      </View>

      <View style={styles.languageList}>
        {languages.map((item) => {
          const selected = item.code === language;

          return (
            <Pressable
              key={item.code}
              onPress={() => setLanguage(item.code)}
              style={[styles.languageCard, selected && styles.selectedCard]}
            >
              <View style={styles.languageText}>
                <Text style={styles.languageTitle}>{item.label}</Text>
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
              {selected ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.helper}>{language === "zh" ? "更改语言后将立即生效" : "Language changes apply immediately"}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingTop: spacing.xl
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  backText: {
    color: colors.text,
    fontSize: 40,
    fontWeight: "300",
    lineHeight: 40
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "700"
  },
  languageList: {
    gap: spacing.md
  },
  languageCard: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary
  },
  languageText: {
    flex: 1,
    gap: spacing.xs
  },
  languageTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700"
  },
  caption: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "700"
  },
  checkCircle: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: colors.primary
  },
  checkText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700"
  },
  helper: {
    marginTop: spacing.xl,
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
