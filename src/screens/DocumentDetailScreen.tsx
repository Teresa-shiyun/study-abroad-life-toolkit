import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { InfoRow } from "../components/InfoRow";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { isImageFile, openPickedFile, pickFile } from "../utils/filePicker";
import { getDocumentStatusTone } from "../utils/statusTone";
import { colors, spacing } from "../utils/theme";

export function DocumentDetailScreen() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { deleteDocument, documents, saveDocument } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const document = documents.find((item) => item.id === id) ?? documents[0];
  const documentIsImage =
    document &&
    document.fileUri &&
    !document.fileUri.startsWith("local://") &&
    isImageFile(document.fileName, document.fileType);

  if (!document) {
    return (
      <Screen title={t("documentDetail")}>
        <Card>
          <Text style={styles.previewText}>{t("noResults")}</Text>
        </Card>
      </Screen>
    );
  }

  async function handleChooseFile() {
    const selectedFile = await pickFile();
    if (!selectedFile) {
      setNotice(t("filePickerUnavailable"));
      return;
    }

    saveDocument({
      ...document,
      status: "prepared",
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      fileUri: selectedFile.uri
    });
    setNotice(`${t("fileSelected")}: ${selectedFile.name}`);
  }

  function handleOpenFile() {
    const opened = openPickedFile(document.fileUri);
    setNotice(opened ? t("openFileStarted") : t("openFileUnavailable"));
  }

  function handleDelete() {
    deleteDocument(document.id);
    setConfirmDeleteVisible(false);
    router.replace(routes.documents);
  }

  return (
    <Screen title={t("documentDetail")} subtitle={t(`mock.${document.id}`, document.title)}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.title}>{t(`mock.${document.id}`, document.title)}</Text>
          <Pill
            label={t(`documentStatus.${document.status}`)}
            tone={getDocumentStatusTone(document.status)}
          />
        </View>
        <InfoRow label={t("category")} value={t(`documentCategory.${document.category}`)} />
        <InfoRow label={t("expiryDate")} value={document.expiryDate} />
        <InfoRow label={t("fileName")} value={document.fileName} />
        <InfoRow label={t("notes")} value={document.notes} />
      </Card>

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>{t("mockFilePreview")}</Text>
        {documentIsImage ? (
          <Image
            source={{ uri: document.fileUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : null}
        <Text style={styles.previewText}>{document.fileName ?? t("noFileSelected")}</Text>
        <Text style={styles.previewText}>{t("fileUploadHint")}</Text>
        <AppButton onPress={handleOpenFile} variant="secondary">{t("openFile")}</AppButton>
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.actions}>
        <AppButton
          onPress={() =>
            router.push({
              pathname: "/documents/edit",
              params: { id: document.id }
            })
          }
          variant="secondary"
        >
          {t("edit")}
        </AppButton>
        <AppButton onPress={handleChooseFile} variant="ghost">{t("filePlaceholderButton")}</AppButton>
        <AppButton onPress={() => setConfirmDeleteVisible(true)} variant="danger">{t("delete")}</AppButton>
      </View>
      <ConfirmDialog
        visible={confirmDeleteVisible}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        confirmLabel={t("confirmDelete")}
        cancelLabel={t("cancel")}
        onCancel={() => setConfirmDeleteVisible(false)}
        onConfirm={handleDelete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  preview: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.lg
  },
  previewTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    backgroundColor: colors.surface
  },
  previewText: {
    color: colors.mutedText,
    textAlign: "center"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
