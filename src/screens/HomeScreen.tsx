import { router } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { formatCurrency, formatDateRange, getChecklistProgress } from "../utils/format";
import { getDocumentStatusTone } from "../utils/statusTone";
import { colors, radii, shadows, spacing } from "../utils/theme";

const bannerSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    titleKey: "bannerCampusTitle",
    subtitleKey: "bannerCampusSubtitle"
  },
  {
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    titleKey: "bannerTravelTitle",
    subtitleKey: "bannerTravelSubtitle"
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    titleKey: "bannerCityTitle",
    subtitleKey: "bannerCitySubtitle"
  }
] as const;

const quickModules = [
  { labelKey: "checklist", hintKey: "moduleChecklistHint", icon: "list", route: routes.checklist, tone: "blue" },
  { labelKey: "documents", hintKey: "moduleDocumentsHint", icon: "file", route: routes.documents, tone: "accent" },
  { labelKey: "travel", hintKey: "moduleTravelHint", icon: "transport", route: routes.travel, tone: "success" },
  { labelKey: "budget", hintKey: "moduleBudgetHint", icon: "wallet", route: routes.budget, tone: "warning" },
  { labelKey: "emergencyContacts", hintKey: "moduleEmergencyHint", icon: "emergency", route: routes.emergency, tone: "danger" },
  { labelKey: "language", hintKey: "moduleLanguageHint", icon: "language", route: routes.settings, tone: "primary" }
] as const;

const moduleIconColors = {
  primary: colors.primary,
  blue: colors.blue,
  accent: colors.accent,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger
} as const;

export function HomeScreen() {
  const { language, t } = useLanguage();
  const { budgetItems, checklistItems, documents, emergencyContacts, monthlyBudget, trips } = useAppData();
  const completedChecklist = checklistItems.filter((item) => item.status === "done").length;
  const documentNeedsAttention = documents.filter((item) => item.status !== "prepared");
  const spent = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remaining = monthlyBudget.amount - spent;
  const upcomingTrip = trips[0];
  const recentFile = documents[1] ?? documents[0];
  const emergencyContact = emergencyContacts[0];

  return (
    <Screen>
      <View style={styles.topBar}>
        <View style={styles.topText}>
          <Text style={styles.eyebrow}>{t("homeGreeting")}</Text>
          <Text style={styles.appName}>{t("appDisplayName")}</Text>
          <Text style={styles.prompt}>{t("homePrompt")}</Text>
        </View>
        <Pressable style={styles.languageChip} onPress={() => router.push(routes.settings)}>
          <Text style={styles.languageText}>{language === "zh" ? "中文" : "EN"}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.searchBar} onPress={() => router.push(routes.search)}>
        <AppIcon name="search" color={colors.primary} size={22} />
        <Text style={styles.searchText}>{t("searchPlaceholder")}</Text>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bannerRail}
        contentContainerStyle={styles.bannerContent}
      >
        {bannerSlides.map((slide) => (
          <ImageBackground
            key={slide.titleKey}
            source={{ uri: slide.image }}
            imageStyle={styles.bannerImage}
            style={styles.banner}
          >
            <View style={styles.bannerShade}>
              <Text style={styles.bannerTitle}>{t(slide.titleKey)}</Text>
              <Text style={styles.bannerSubtitle}>{t(slide.subtitleKey)}</Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <Section title={t("quickActions")}>
        <View style={styles.moduleGrid}>
          {quickModules.map((module) => (
            <Pressable
              key={module.labelKey}
              style={({ pressed }) => [styles.moduleCard, pressed && styles.pressed]}
              onPress={() => router.push(module.route)}
            >
              <View style={[styles.moduleBadge, styles[`${module.tone}Badge`]]}>
                <AppIcon
                  name={module.icon}
                  color={moduleIconColors[module.tone]}
                  size={28}
                />
              </View>
              <View style={styles.moduleTextWrap}>
                <Text style={styles.moduleTitle}>{t(module.labelKey)}</Text>
                <Text style={styles.moduleHint}>{t(module.hintKey)}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title={t("todayOverview")}>
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <Text style={styles.statValue}>
              {getChecklistProgress(completedChecklist, checklistItems.length)}
            </Text>
            <Text style={styles.statLabel}>{t("checklistProgress")}</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.statValue}>{documentNeedsAttention.length}</Text>
            <Text style={styles.statLabel}>{t("documentsNeedAttention")}</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.statValue}>{formatCurrency(remaining)}</Text>
            <Text style={styles.statLabel}>{t("remainingThisMonth")}</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.statValue}>{trips.length}</Text>
            <Text style={styles.statLabel}>{t("plannedTrips")}</Text>
          </Card>
        </View>
      </Section>

      {upcomingTrip ? (
        <Section title={t("upcomingTrip")}>
          <Card onPress={() => router.push(routes.travelDetail(upcomingTrip.id))}>
            <Text style={styles.cardTitle}>{t(`mock.${upcomingTrip.id}`, upcomingTrip.name)}</Text>
            <Text style={styles.cardText}>{upcomingTrip.destination}</Text>
            <Text style={styles.cardText}>
              {formatDateRange(upcomingTrip.startDate, upcomingTrip.endDate)}
            </Text>
          </Card>
        </Section>
      ) : null}

      {recentFile ? (
        <Section title={t("recentFile")}>
          <Card onPress={() => router.push(routes.documentDetail(recentFile.id))}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{t(`mock.${recentFile.id}`, recentFile.title)}</Text>
              <Pill
                label={t(`documentStatus.${recentFile.status}`)}
                tone={getDocumentStatusTone(recentFile.status)}
              />
            </View>
            <Text style={styles.cardText}>{recentFile.fileName ?? t("noFileSelected")}</Text>
          </Card>
        </Section>
      ) : null}

      {emergencyContact ? (
        <Section title={t("emergencyShortcut")}>
          <Card onPress={() => router.push(routes.emergency)}>
            <Text style={styles.cardTitle}>{t(`mock.${emergencyContact.id}`, emergencyContact.name)}</Text>
            <Text style={styles.cardText}>{emergencyContact.phone}</Text>
            <Text style={styles.cardText}>{emergencyContact.email}</Text>
          </Card>
        </Section>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  topText: {
    flex: 1,
    gap: spacing.xs
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800"
  },
  appName: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 32
  },
  prompt: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  languageChip: {
    minWidth: 50,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  languageText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  },
  searchBar: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  searchText: {
    flex: 1,
    color: colors.mutedText,
    fontSize: 14
  },
  bannerRail: {
    marginHorizontal: -spacing.lg
  },
  bannerContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg
  },
  banner: {
    width: 320,
    height: 148,
    overflow: "hidden",
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  bannerImage: {
    borderRadius: radii.md
  },
  bannerShade: {
    flex: 1,
    justifyContent: "flex-end",
    gap: spacing.xs,
    padding: spacing.lg,
    backgroundColor: "rgba(10, 20, 30, 0.36)"
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26
  },
  bannerSubtitle: {
    color: "#eef4f7",
    fontSize: 13,
    lineHeight: 18
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  moduleCard: {
    width: "47%",
    minHeight: 104,
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  pressed: {
    opacity: 0.82
  },
  moduleBadge: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md
  },
  moduleTextWrap: {
    gap: 2
  },
  moduleTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800"
  },
  moduleHint: {
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 16
  },
  primaryBadge: {
    backgroundColor: colors.primarySoft
  },
  blueBadge: {
    backgroundColor: colors.blueSoft
  },
  accentBadge: {
    backgroundColor: colors.accentSoft
  },
  successBadge: {
    backgroundColor: colors.successSoft
  },
  warningBadge: {
    backgroundColor: colors.warningSoft
  },
  dangerBadge: {
    backgroundColor: colors.dangerSoft
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  summaryCard: {
    width: "47%",
    minHeight: 90
  },
  statValue: {
    color: colors.primary,
    fontSize: 23,
    fontWeight: "800"
  },
  statLabel: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  cardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  cardText: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  }
});
