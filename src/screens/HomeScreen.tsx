import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon, type AppIconName } from "../components/AppIcon";
import { Card } from "../components/Card";
import { CloudPuppyBadge } from "../components/CloudPuppyBadge";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { bannerCampusImage, bannerLondonImage, bannerParisImage } from "../data/bannerImages";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { deriveDocumentStatus } from "../utils/documentStatus";
import { formatCurrency, formatDateRange, getChecklistProgress, getProgressPercent } from "../utils/format";
import { colors, radii, shadows, spacing } from "../utils/theme";

const bannerSlides = [
  {
    image: bannerParisImage,
    zh: "巴黎周末旅行",
    en: "Paris weekend"
  },
  {
    image: bannerLondonImage,
    zh: "伦敦生活",
    en: "London life"
  },
  {
    image: bannerCampusImage,
    zh: "校园日常",
    en: "Campus days"
  }
] as const;

const quickModules: Array<{
  fallbackZh: string;
  fallbackEn: string;
  icon: AppIconName;
  route: string;
  tone: "accent" | "blue" | "lavender" | "danger";
}> = [
  { fallbackZh: "文件", fallbackEn: "Files", icon: "file", route: routes.documents, tone: "accent" },
  { fallbackZh: "旅行", fallbackEn: "Travel", icon: "transport", route: routes.travel, tone: "blue" },
  { fallbackZh: "清单", fallbackEn: "Checklist", icon: "list", route: routes.checklist, tone: "lavender" },
  { fallbackZh: "紧急", fallbackEn: "Emergency", icon: "emergency", route: routes.emergency, tone: "danger" }
];

const toneStyles = {
  accent: {
    backgroundColor: colors.accentSoft,
    color: colors.accent
  },
  blue: {
    backgroundColor: colors.blueSoft,
    color: colors.blue
  },
  lavender: {
    backgroundColor: colors.lavenderSoft,
    color: colors.lavender
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    color: colors.danger
  }
};

export function HomeScreen() {
  const { language, t } = useLanguage();
  const { budgetItems, checklistItems, documents, monthlyBudget, trips } = useAppData();
  const completedChecklist = checklistItems.filter((item) => item.status === "done").length;
  const documentNeedsAttention = documents.filter((item) => deriveDocumentStatus(item) !== "prepared").length;
  const spent = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remaining = monthlyBudget.amount - spent;
  const upcomingTrip = trips[0];
  const [activeBanner, setActiveBanner] = useState(0);
  const itineraryTotal = upcomingTrip?.itinerary.length ?? 0;
  const itineraryDone = upcomingTrip?.itinerary.filter((item) => item.isDone).length ?? 0;
  const tripPercent = getProgressPercent(itineraryDone, itineraryTotal);

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  function moveBanner(direction: -1 | 1) {
    setActiveBanner((current) => (current + direction + bannerSlides.length) % bannerSlides.length);
  }

  const currentBanner = bannerSlides[activeBanner];

  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.topLogoRow}>
          <Pressable style={styles.profileButton} onPress={() => router.push(routes.profile)}>
            <CloudPuppyBadge size={48} />
          </Pressable>
        </View>

        <View style={styles.bannerWrap}>
          <ImageBackground
            key={activeBanner}
            source={currentBanner.image}
            imageStyle={styles.bannerImage}
            style={styles.banner}
          >
            <Pressable style={[styles.bannerButton, styles.bannerButtonLeft]} onPress={() => moveBanner(-1)}>
              <Text style={styles.bannerButtonText}>‹</Text>
            </Pressable>
            <Pressable style={[styles.bannerButton, styles.bannerButtonRight]} onPress={() => moveBanner(1)}>
              <Text style={styles.bannerButtonText}>›</Text>
            </Pressable>
          </ImageBackground>
          <View style={styles.dots}>
            {bannerSlides.map((slide, index) => (
              <Pressable
                key={slide.en}
                style={[styles.dot, index === activeBanner && styles.dotActive]}
                onPress={() => setActiveBanner(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.quickGrid}>
          {quickModules.map((module) => {
            const tone = toneStyles[module.tone];

            return (
              <Pressable
                key={module.fallbackEn}
                style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}
                onPress={() => router.push(module.route)}
              >
                <View style={[styles.quickIcon, { backgroundColor: tone.backgroundColor }]}>
                  <AppIcon name={module.icon} color={tone.color} size={29} />
                </View>
                <Text style={styles.quickLabel}>{pick(module.fallbackZh, module.fallbackEn)}</Text>
              </Pressable>
            );
          })}
        </View>

        {upcomingTrip ? (
          <Pressable
            style={({ pressed }) => [styles.tripCard, pressed && styles.pressed]}
            onPress={() => router.push(routes.travelDetail(upcomingTrip.id))}
          >
            <View style={styles.tripTop}>
              <View>
                <Text style={styles.tripKicker}>{pick("即将到来", "Upcoming")}</Text>
                <Text style={styles.tripTitle}>{t(`seed.${upcomingTrip.id}`, upcomingTrip.name)}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
            <Text style={styles.tripMeta}>
              {upcomingTrip.destination} · {formatDateRange(upcomingTrip.startDate, upcomingTrip.endDate)}
            </Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${tripPercent}%` }]} />
              </View>
              <Text style={styles.progressText}>{tripPercent}%</Text>
            </View>
          </Pressable>
        ) : null}

        <View style={styles.statGrid}>
          <Card style={styles.statCard} onPress={() => router.push(routes.documents)}>
            <View style={[styles.smallIcon, { backgroundColor: colors.accentSoft }]}>
              <AppIcon name="file" color={colors.accent} size={20} />
            </View>
            <Text style={styles.statTitle}>{pick("文件状态", "File status")}</Text>
            <Text style={styles.statValue}>{documentNeedsAttention}</Text>
            <Text style={styles.statHint}>{pick("个待处理文件", "documents to check")}</Text>
          </Card>
          <Card style={styles.statCard} onPress={() => router.push(routes.checklist)}>
            <View style={[styles.smallIcon, { backgroundColor: colors.blueSoft }]}>
              <AppIcon name="list" color={colors.blue} size={20} />
            </View>
            <Text style={styles.statTitle}>{pick("清单进度", "Checklist")}</Text>
            <Text style={styles.statValue}>{getChecklistProgress(completedChecklist, checklistItems.length)}</Text>
            <Text style={styles.statHint}>{pick("已完成任务", "completed tasks")}</Text>
          </Card>
        </View>

        <Card style={styles.budgetCard} onPress={() => router.push(routes.budget)}>
          <View style={[styles.smallIcon, { backgroundColor: colors.warningSoft }]}>
            <AppIcon name="wallet" color={colors.warning} size={20} />
          </View>
          <Text style={styles.statTitle}>{pick("本月预算", "Monthly budget")}</Text>
          <Text style={styles.budgetValue}>
            {formatCurrency(remaining, monthlyBudget.currency)}
            <Text style={styles.budgetTotal}> / {formatCurrency(monthlyBudget.amount, monthlyBudget.currency)}</Text>
          </Text>
          <View style={styles.budgetTrack}>
            <View
              style={[
                styles.budgetFill,
                { width: `${Math.min(100, getProgressPercent(spent, monthlyBudget.amount))}%` }
              ]}
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.lg,
    backgroundColor: colors.background
  },
  topLogoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52
  },
  profileButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: colors.surface
  },
  bannerWrap: {
    gap: spacing.sm
  },
  banner: {
    width: "100%",
    height: 178,
    overflow: "hidden",
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  bannerImage: {
    borderRadius: radii.md
  },
  bannerButton: {
    position: "absolute",
    top: 65,
    width: 42,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.72)"
  },
  bannerButtonLeft: {
    left: spacing.md
  },
  bannerButtonRight: {
    right: spacing.md
  },
  bannerButtonText: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 36
  },
  dots: {
    flexDirection: "row",
    alignSelf: "center",
    gap: spacing.xs
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.primary
  },
  quickGrid: {
    flexDirection: "row",
    gap: spacing.md
  },
  quickCard: {
    flex: 1,
    minHeight: 108,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  quickIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28
  },
  quickLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500"
  },
  tripCard: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  tripTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  tripKicker: {
    color: "#edf5ff",
    fontSize: 14,
    fontWeight: "500"
  },
  tripTitle: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 32
  },
  arrow: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "300"
  },
  tripMeta: {
    color: "#f7fbff",
    fontSize: 15,
    lineHeight: 22
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  progressTrack: {
    flex: 1,
    height: 10,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.32)"
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#ffffff"
  },
  progressText: {
    minWidth: 42,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right"
  },
  statGrid: {
    flexDirection: "row",
    gap: spacing.md
  },
  statCard: {
    flex: 1,
    minHeight: 126
  },
  smallIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  statTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500"
  },
  statValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "500",
    lineHeight: 38
  },
  statHint: {
    color: colors.mutedText,
    fontSize: 14
  },
  budgetCard: {
    minHeight: 146
  },
  budgetValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 36
  },
  budgetTotal: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "400"
  },
  budgetTrack: {
    height: 12,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: colors.surfaceMuted
  },
  budgetFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: colors.accent
  },
  pressed: {
    opacity: 0.84
  }
});
