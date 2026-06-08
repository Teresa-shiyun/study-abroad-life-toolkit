import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { InfoRow } from "../components/InfoRow";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { TravelFile } from "../types";
import { isImageFile, openPickedFile, pickFile } from "../utils/filePicker";
import { formatDateRange } from "../utils/format";
import { colors, spacing } from "../utils/theme";

type PendingDelete =
  | { kind: "trip" }
  | { kind: "file"; id: string }
  | { kind: "checklist"; id: string };

export function TravelDetailScreen() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const {
    addTravelChecklistItem,
    addTravelFile,
    deleteTravelChecklistItem,
    deleteTravelFile,
    deleteTrip,
    toggleTravelChecklistItem,
    trips
  } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | undefined>();
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>();
  const trip = trips.find((item) => item.id === id) ?? trips[0];

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
  const itineraryItems = [
    {
      step: "1",
      label: t("dayOne"),
      title: t("arrivalPlan"),
      detail: `${trip.startDate} · ${trip.destination}`
    },
    {
      step: "2",
      label: t("dayTwo"),
      title: t("localPlan"),
      detail: `${trip.files.length} ${t("files")} · ${trip.checklist.length} ${t("items")}`
    },
    {
      step: "3",
      label: t("lastDay"),
      title: t("returnPlan"),
      detail: trip.endDate
    }
  ];

  async function handleAddFile() {
    const selectedFileInfo = await pickFile();
    if (!selectedFileInfo) {
      setNotice(t("filePickerUnavailable"));
      return;
    }

    const file = addTravelFile(
      trip.id,
      selectedFileInfo.name,
      "other",
      selectedFileInfo.uri,
      selectedFileInfo.type
    );
    setSelectedFileId(file.id);
    setNotice(`${t("travelFileAdded")}: ${selectedFileInfo.name}`);
  }

  function handleOpenFile(file?: TravelFile) {
    if (!file) {
      return;
    }

    setSelectedFileId(file.id);
    const opened = openPickedFile(file.fileUri);
    setNotice(opened ? t("openFileStarted") : t("openFileUnavailable"));
  }

  function handleAddChecklistItem() {
    addTravelChecklistItem(trip.id, t("newChecklistItemTitle"));
    setNotice(t("travelChecklistAdded"));
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
      setNotice(t("documentDeleted"));
    }

    if (pendingDelete.kind === "checklist") {
      deleteTravelChecklistItem(trip.id, pendingDelete.id);
      setNotice(t("checklistItemDeleted"));
    }

    setPendingDelete(undefined);
  }

  return (
    <Screen title={t("travelDetail")}>
      <Section title={t("itinerary")}>
        <View style={styles.timeline}>
          {itineraryItems.map((item) => (
            <View key={item.label} style={styles.timelineItem}>
              <View style={styles.timelineDot}>
                <Text style={styles.timelineDotText}>{item.step}</Text>
              </View>
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineText}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section title={t("aboutTrip")}>
        <Card>
          <View style={styles.cardTop}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{t(`mock.${trip.id}`, trip.name)}</Text>
              <Text style={styles.meta}>{trip.destination}</Text>
            </View>
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
                onPress={() => setPendingDelete({ kind: "trip" })}
              />
            </View>
          </View>
          <InfoRow label={t("dateRange")} value={formatDateRange(trip.startDate, trip.endDate)} />
          <InfoRow label={t("notes")} value={trip.notes} />
        </Card>
      </Section>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <Section title={t("uploadedFiles")}>
        <Pressable style={styles.addCard} onPress={handleAddFile}>
          <Text style={styles.addSymbol}>+</Text>
          <Text style={styles.addText}>{t("addFile")}</Text>
        </Pressable>

        <View style={styles.preview}>
          {selectedFile ? (
            <>
              {selectedFileIsImage ? (
                <Image
                  source={{ uri: selectedFile.fileUri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              ) : null}
              <Text style={styles.previewTitle}>{selectedFile.fileName ?? selectedFile.title}</Text>
              <Text style={styles.previewText}>{t(`travelFileCategory.${selectedFile.category}`)}</Text>
              <Text style={styles.previewText}>{t("fileUploadHint")}</Text>
              <Pressable style={styles.openFileBox} onPress={() => handleOpenFile(selectedFile)}>
                <Text style={styles.openFileText}>{t("openFile")}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.previewTitle}>{t("mockFilePreview")}</Text>
              <Text style={styles.previewText}>{t("tapFileToPreview")}</Text>
            </>
          )}
        </View>

        <View style={styles.itemList}>
          {trip.files.map((file) => (
            <Card key={file.id} style={file.id === selectedFile?.id ? styles.selectedCard : undefined}>
              <View style={styles.cardTop}>
                <Pressable
                  accessibilityLabel={t("openFile")}
                  onPress={() => {
                    setSelectedFileId(file.id);
                    setNotice(undefined);
                  }}
                  style={styles.titleBlock}
                >
                  <Text style={styles.itemTitle}>{file.title}</Text>
                  <Text style={styles.text}>{file.fileName}</Text>
                </Pressable>
                <View style={styles.rowActions}>
                  <ActionIconButton
                    label={t("delete")}
                    icon="trash"
                    tone="danger"
                    onPress={() => setPendingDelete({ kind: "file", id: file.id })}
                  />
                </View>
              </View>
              <Pill label={t(`travelFileCategory.${file.category}`)} />
            </Card>
          ))}
        </View>
      </Section>

      <Section title={t("tripChecklist")}>
        <Pressable style={styles.addCard} onPress={handleAddChecklistItem}>
          <Text style={styles.addSymbol}>+</Text>
          <Text style={styles.addText}>{t("addChecklistItem")}</Text>
        </Pressable>

        <View style={styles.itemList}>
          {trip.checklist.map((item) => (
            <Card key={item.id}>
              <View style={styles.cardTop}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <ActionIconButton
                  label={t("delete")}
                  icon="trash"
                  tone="danger"
                  onPress={() => setPendingDelete({ kind: "checklist", id: item.id })}
                />
              </View>
              <Pressable
                accessibilityLabel={t("status")}
                onPress={() => {
                  toggleTravelChecklistItem(trip.id, item.id);
                  setNotice(t("travelChecklistUpdated"));
                }}
                style={[styles.statusBox, item.isDone ? styles.successStatusBox : styles.neutralStatusBox]}
              >
                <Text style={styles.statusLabel}>{t("status")}</Text>
                <Text style={styles.statusValue}>{item.isDone ? t("done") : t("open")}</Text>
              </Pressable>
              {item.notes ? <Text style={styles.text}>{item.notes}</Text> : null}
            </Card>
          ))}
        </View>
      </Section>

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
  timeline: {
    gap: spacing.md
  },
  timelineItem: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface
  },
  timelineDot: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primary
  },
  timelineDotText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900"
  },
  timelineBody: {
    flex: 1,
    gap: spacing.xs
  },
  timelineTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  timelineText: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800"
  },
  itemTitle: {
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
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  },
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
  preview: {
    minHeight: 130,
    justifyContent: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    backgroundColor: colors.surface
  },
  previewTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  previewText: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  openFileBox: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primary
  },
  openFileText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900"
  },
  itemList: {
    gap: spacing.md
  },
  selectedCard: {
    borderColor: colors.primary
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
    fontSize: 17,
    fontWeight: "900"
  }
});
