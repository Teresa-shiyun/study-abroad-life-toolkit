import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { formatDateRange, getChecklistProgress } from "../utils/format";
import { colors, spacing } from "../utils/theme";

export function TravelScreen() {
  const { t } = useLanguage();
  const { deleteTrip, trips } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteTrip(pendingDeleteId);
    setPendingDeleteId(undefined);
    setNotice(t("tripDeleted"));
  }

  return (
    <Screen title={t("travel")}>
      <Pressable style={styles.addCard} onPress={() => router.push(routes.travelEdit)}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addTrip")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.list}>
        {trips.map((trip) => {
          const done = trip.checklist.filter((item) => item.isDone).length;

          return (
            <Card key={trip.id}>
              <View style={styles.cardTop}>
                <Pressable
                  accessibilityLabel={t("openPage")}
                  onPress={() => router.push(routes.travelDetail(trip.id))}
                  style={styles.titleBlock}
                >
                  <Text style={styles.title}>{t(`mock.${trip.id}`, trip.name)}</Text>
                  <Text style={styles.meta}>{trip.destination}</Text>
                </Pressable>
                <View style={styles.rowActions}>
                  <ActionIconButton
                    label={t("edit")}
                    icon="edit"
                    tone="primary"
                    onPress={() =>
                      router.push({
                        pathname: "/travel/edit",
                        params: { id: trip.id }
                      })
                    }
                  />
                  <ActionIconButton
                    label={t("delete")}
                    icon="trash"
                    tone="danger"
                    onPress={() => setPendingDeleteId(trip.id)}
                  />
                </View>
              </View>
              <Text style={styles.text}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
              <View style={styles.statusRow}>
                <Pill label={`${trip.files.length} ${t("files")}`} />
                <View style={styles.progressBox}>
                  <Text style={styles.progressLabel}>{t("checklist")}</Text>
                  <Text style={styles.progressValue}>{getChecklistProgress(done, trip.checklist.length)}</Text>
                </View>
              </View>
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
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: colors.primarySoft
  },
  addSymbol: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "900"
  },
  addText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  },
  list: {
    gap: spacing.md
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  rowActions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  meta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700"
  },
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.sm
  },
  progressBox: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted
  },
  progressLabel: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: "800"
  },
  progressValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  }
});
