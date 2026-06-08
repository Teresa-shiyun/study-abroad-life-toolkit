import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { TravelFile } from "../types";
import { isImageFile, openPickedFile, pickFile } from "../utils/filePicker";
import { formatDateRange } from "../utils/format";
import { colors, radii, shadows, spacing } from "../utils/theme";

type PendingDelete =
  | { kind: "trip" }
  | { kind: "file"; id: string }
  | { kind: "checklist"; id: string };

export function TravelDetailScreen() {
  const { language, t } = useLanguage();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const {
    addTravelChecklistItem,
    addTravelFile,
    deleteTravelChecklistItem,
    deleteTravelFile,
    deleteTrip,
    toggleTravelChecklistItem,
    toggleTravelItineraryItem,
    trips
  } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | undefined>();
  const trip = trips.find((item) => item.id === id) ?? trips[0];
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>(trip?.files[0]?.id);

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  if (!trip) {
    return (
      <Screen title={t("travelDetail")}>
        <Card>
          <Text style={styles.text}>{t("noResults")}</Text>
        </Card>
      </Screen>
    );
  }

  const selectedFile = trip.files.find((file) => file.id === selectedFileId) ?? trip.files[0];
  const selectedFileIsImage =
    selectedFile &&
    selectedFile.fileUri &&
    !selectedFile.fileUri.startsWith("local://") &&
    isImageFile(selectedFile.fileName ?? selectedFile.title, selectedFile.fileType);

  async function handleAddFile() {
    const selected = await pickFile();
    if (!selected) {
      setNotice(t("filePickerUnavailable"));
      return;
    }

    const file = addTravelFile(trip.id, selected.name, "other", selected.uri, selected.type);
    setSelectedFileId(file.id);
    setNotice(`${t("travelFileAdded")}: ${selected.name}`);
  }

  function handleOpenFile(file?: TravelFile) {
    if (!file) {
      return;
    }

    setSelectedFileId(file.id);
    const opened = openPickedFile(file.fileUri);
    setNotice(opened ? t("openFileStarted") : t("openFileUnavailable"));
  }

  function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    if (pendingDelete.kind === "trip") {
      deleteTrip(trip.id);
      setPendingDelete(undefined);
      router.replace(routes.travel);
      return;
    }

    if (pendingDelete.kind === "file") {
      deleteTravelFile(trip.id, pendingDelete.id);
      setSelectedFileId(undefined);
      setNotice(pick("票据已删除", "Ticket removed"));
    }

    if (pendingDelete.kind === "checklist") {
      deleteTravelChecklistItem(trip.id, pendingDelete.id);
      setNotice(t("checklistItemDeleted"));
    }

    setPendingDelete(undefined);
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroCloudOne} />
        <View style={styles.heroCloudTwo} />
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.heroTitle}>{t(`seed.${trip.id}`, trip.name)}</Text>
        <Text style={styles.heroMeta}>
          {trip.destination} · {formatDateRange(trip.startDate, trip.endDate)}
        </Text>
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("itinerary")}</Text>
        <View style={styles.memoList}>
          {trip.itinerary.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [styles.memoRow, pressed && styles.pressed]}
              onPress={() => toggleTravelItineraryItem(trip.id, item.id)}
            >
              <View style={[styles.square, item.isDone && styles.squareDone]}>
                {item.isDone ? <Text style={styles.squareCheck}>✓</Text> : null}
              </View>
              <View style={styles.memoTextBlock}>
                <Text style={[styles.memoTitle, item.isDone && styles.memoDone]}>
                  {t(`seed.${item.id}`, item.title)}
                </Text>
                <Text style={styles.memoMeta}>
                  {[item.date, item.time].filter(Boolean).join(" · ")}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{pick("已保存票据", "Saved tickets")}</Text>
          <Pressable style={styles.circleButton} onPress={handleAddFile}>
            <Text style={styles.circleButtonText}>+</Text>
          </Pressable>
        </View>

        <Card style={styles.ticketCard}>
          {selectedFile ? (
            <>
              {selectedFileIsImage ? (
                <Image source={{ uri: selectedFile.fileUri }} style={styles.ticketImage} resizeMode="cover" />
              ) : (
                <View style={styles.fileFallback}>
                  <AppIcon name="file" color={colors.blue} size={46} />
                  <Text style={styles.fileFallbackText}>{selectedFile.fileName ?? selectedFile.title}</Text>
                </View>
              )}
              <View style={styles.ticketActions}>
                <Pressable style={styles.openButton} onPress={() => handleOpenFile(selectedFile)}>
                  <Text style={styles.openButtonText}>{t("openFile")}</Text>
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => setPendingDelete({ kind: "file", id: selectedFile.id })}
                >
                  <Text style={styles.deleteButtonText}>{t("deleteFile")}</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <Pressable style={styles.emptyTicket} onPress={handleAddFile}>
              <Text style={styles.addTicketText}>+ {t("addFile")}</Text>
            </Pressable>
          )}
        </Card>

        {trip.files.length > 1 ? (
          <View style={styles.fileChips}>
            {trip.files.map((file) => (
              <Pressable
                key={file.id}
                style={[styles.fileChip, file.id === selectedFile?.id && styles.fileChipSelected]}
                onPress={() => setSelectedFileId(file.id)}
              >
                <Text
                  style={[styles.fileChipText, file.id === selectedFile?.id && styles.fileChipTextSelected]}
                  numberOfLines={1}
                >
                  {file.title}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("tripChecklist")}</Text>
        <Card style={styles.tripChecklistCard}>
          {trip.checklist.map((item) => (
            <View key={item.id} style={styles.tripChecklistRow}>
              <Pressable
                style={[styles.square, item.isDone && styles.squareDone]}
                onPress={() => toggleTravelChecklistItem(trip.id, item.id)}
              >
                {item.isDone ? <Text style={styles.squareCheck}>✓</Text> : null}
              </Pressable>
              <Text style={[styles.tripChecklistTitle, item.isDone && styles.memoDone]}>{item.title}</Text>
              <Pressable
                style={styles.smallDelete}
                onPress={() => setPendingDelete({ kind: "checklist", id: item.id })}
              >
                <Text style={styles.smallDeleteText}>×</Text>
              </Pressable>
            </View>
          ))}
          <Pressable
            style={styles.addChecklistRow}
            onPress={() => addTravelChecklistItem(trip.id, pick("新的旅行清单", "New trip checklist item"))}
          >
            <Text style={styles.addChecklistText}>+ {t("addChecklistItem")}</Text>
          </Pressable>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("aboutTrip")}</Text>
        <Card>
          <Text style={styles.aboutTitle}>{t(`seed.${trip.id}`, trip.name)}</Text>
          <Text style={styles.text}>{trip.notes}</Text>
          <View style={styles.aboutActions}>
            <Pressable
              style={styles.editTripButton}
              onPress={() =>
                router.push({
                  pathname: "/travel/edit",
                  params: { id: trip.id }
                })
              }
            >
              <Text style={styles.editTripText}>{t("edit")}</Text>
            </Pressable>
            <Pressable style={styles.deleteTripButton} onPress={() => setPendingDelete({ kind: "trip" })}>
              <Text style={styles.deleteTripText}>{t("delete")}</Text>
            </Pressable>
          </View>
        </Card>
      </View>

      <ConfirmDialog
        visible={Boolean(pendingDelete)}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        confirmLabel={t("confirmDelete")}
        cancelLabel={t("cancel")}
        onCancel={() => setPendingDelete(undefined)}
        onConfirm={handleConfirmDelete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 210,
    justifyContent: "flex-end",
    gap: spacing.sm,
    marginHorizontal: -spacing.lg,
    marginTop: -spacing.lg,
    padding: spacing.xl,
    overflow: "hidden",
    backgroundColor: colors.primary
  },
  heroCloudOne: {
    position: "absolute",
    top: 36,
    right: 58,
    width: 36,
    height: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  heroCloudTwo: {
    position: "absolute",
    top: 66,
    right: 126,
    width: 42,
    height: 18,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.22)"
  },
  backButton: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21
  },
  backText: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "300",
    lineHeight: 42
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38
  },
  heroMeta: {
    color: "#f4f8ff",
    fontSize: 17,
    lineHeight: 24
  },
  section: {
    gap: spacing.md
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700"
  },
  memoList: {
    gap: spacing.sm
  },
  memoRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card
  },
  square: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surface
  },
  squareDone: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  squareCheck: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700"
  },
  memoTextBlock: {
    flex: 1,
    gap: 2
  },
  memoTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 23
  },
  memoMeta: {
    color: colors.mutedText,
    fontSize: 13
  },
  memoDone: {
    color: colors.mutedText,
    textDecorationLine: "line-through"
  },
  circleButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  circleButtonText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "300",
    lineHeight: 34
  },
  ticketCard: {
    padding: spacing.md
  },
  ticketImage: {
    width: "100%",
    height: 214,
    borderRadius: radii.md,
    backgroundColor: colors.blue
  },
  fileFallback: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  fileFallbackText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  ticketActions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  openButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.primary
  },
  openButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  deleteButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.dangerSoft
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700"
  },
  emptyTicket: {
    minHeight: 156,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  addTicketText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700"
  },
  fileChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  fileChip: {
    maxWidth: "48%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface
  },
  fileChipSelected: {
    backgroundColor: colors.primary
  },
  fileChipText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "600"
  },
  fileChipTextSelected: {
    color: "#ffffff"
  },
  tripChecklistCard: {
    gap: spacing.md
  },
  tripChecklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  tripChecklistTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: "600"
  },
  smallDelete: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: colors.dangerSoft
  },
  smallDeleteText: {
    color: colors.danger,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26
  },
  addChecklistRow: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft
  },
  addChecklistText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700"
  },
  aboutTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  },
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21
  },
  aboutActions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  editTripButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft
  },
  editTripText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700"
  },
  deleteTripButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.dangerSoft
  },
  deleteTripText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  pressed: {
    opacity: 0.84
  }
});
