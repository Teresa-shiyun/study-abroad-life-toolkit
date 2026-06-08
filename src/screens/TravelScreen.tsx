import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { formatDateRange, getProgressPercent } from "../utils/format";
import { colors, radii, spacing } from "../utils/theme";

export function TravelScreen() {
  const { language, t } = useLanguage();
  const { deleteTrip, trips } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteTrip(pendingDeleteId);
    setPendingDeleteId(undefined);
    setNotice(t("tripDeleted"));
  }

  return (
    <Screen title={t("travel")} subtitle={pick("行程和票据放在一起", "Trips and tickets together")}>
      <Pressable style={styles.addCard} onPress={() => router.push(routes.travelEdit)}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addTrip")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.list}>
        {trips.map((trip) => {
          const total = trip.itinerary.length || trip.checklist.length;
          const done = trip.itinerary.length
            ? trip.itinerary.filter((item) => item.isDone).length
            : trip.checklist.filter((item) => item.isDone).length;
          const percent = getProgressPercent(done, total);

          return (
            <Card key={trip.id} style={styles.tripCard} onPress={() => router.push(routes.travelDetail(trip.id))}>
              <View style={styles.tripTop}>
                <View style={styles.tripIcon}>
                  <AppIcon name="transport" color={colors.blue} size={30} />
                </View>
                <View style={styles.tripTitleBlock}>
                  <Text style={styles.title}>{t(`seed.${trip.id}`, trip.name)}</Text>
                  <Text style={styles.meta}>{trip.destination}</Text>
                </View>
                <Pressable style={styles.deleteButton} onPress={() => setPendingDeleteId(trip.id)}>
                  <Text style={styles.deleteText}>×</Text>
                </Pressable>
              </View>
              <Text style={styles.text}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
              <View style={styles.progressRow}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${percent}%` }]} />
                </View>
                <Text style={styles.progressText}>{percent}%</Text>
              </View>
              <Text style={styles.progressCaption}>
                {done}/{total} {pick("个行程已完成", "itinerary items done")}
              </Text>
            </Card>
          );
        })}
      </View>
      <ConfirmDialog
        visible={Boolean(pendingDeleteId)}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        confirmLabel={t("confirmDelete")}
        cancelLabel={t("cancel")}
        onCancel={() => setPendingDeleteId(undefined)}
        onConfirm={handleConfirmDelete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  addCard: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  addSymbol: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "700"
  },
  addText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  list: {
    gap: spacing.md
  },
  tripCard: {
    gap: spacing.md
  },
  tripTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  tripIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: colors.blueSoft
  },
  tripTitleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28
  },
  meta: {
    color: colors.mutedText,
    fontSize: 14
  },
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  deleteButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: colors.dangerSoft
  },
  deleteText: {
    color: colors.danger,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26
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
    backgroundColor: colors.surfaceMuted
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  progressText: {
    minWidth: 42,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right"
  },
  progressCaption: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "700"
  }
});
