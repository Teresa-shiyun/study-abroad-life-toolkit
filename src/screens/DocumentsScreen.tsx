import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { DocumentItem, DocumentStatus } from "../types";
import { deriveDocumentStatus } from "../utils/documentStatus";
import { isImageFile, pickFile } from "../utils/filePicker";
import { colors, radii, spacing } from "../utils/theme";

const statusMeta: Record<DocumentStatus, { color: string; backgroundColor: string; zh: string; en: string }> = {
  missing: {
    color: colors.mutedText,
    backgroundColor: colors.neutralSoft,
    zh: "未准备",
    en: "Missing"
  },
  prepared: {
    color: colors.success,
    backgroundColor: colors.successSoft,
    zh: "已准备",
    en: "Prepared"
  },
  expired: {
    color: colors.danger,
    backgroundColor: colors.dangerSoft,
    zh: "已过期",
    en: "Expired"
  },
  needsUpdate: {
    color: colors.warning,
    backgroundColor: colors.warningSoft,
    zh: "需要更新",
    en: "Needs Update"
  }
};

export function DocumentsScreen() {
  const { language, t } = useLanguage();
  const { documents, removeDocumentFile, saveDocument } = useAppData();
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingFileDeleteId, setPendingFileDeleteId] = useState<string | undefined>();

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  async function handleUpload(document: DocumentItem) {
    const selected = await pickFile();
    if (!selected) {
      setNotice(t("filePickerUnavailable"));
      return;
    }

    saveDocument({
      id: document.id,
      title: document.title,
      category: document.category,
      fileName: selected.name,
      fileType: selected.type,
      fileUri: selected.uri,
      expiryDate: document.expiryDate,
      notes: document.notes
    });
    setNotice(pick("文件已更新", "File updated"));
  }

  function handleConfirmDelete() {
    if (!pendingFileDeleteId) {
      return;
    }

    removeDocumentFile(pendingFileDeleteId);
    setPendingFileDeleteId(undefined);
    setNotice(pick("文件预览已删除", "File preview removed"));
  }

  return (
    <Screen title={t("documents")} subtitle={pick("整理你的重要文件", "Organize important files")}>
      <Pressable style={styles.addCard} onPress={() => router.push(routes.documentEdit)}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addDocument")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.list}>
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            language={language}
            t={t}
            onOpen={() => router.push(routes.documentDetail(document.id))}
            onUpload={() => handleUpload(document)}
            onDeleteFile={() => setPendingFileDeleteId(document.id)}
          />
        ))}
      </View>

      <ConfirmDialog
        visible={Boolean(pendingFileDeleteId)}
        title={t("confirmDeleteTitle")}
        message={t("confirmDeleteMessage")}
        confirmLabel={t("confirmDelete")}
        cancelLabel={t("cancel")}
        onCancel={() => setPendingFileDeleteId(undefined)}
        onConfirm={handleConfirmDelete}
      />
    </Screen>
  );
}

function DocumentCard({
  document,
  language,
  onDeleteFile,
  onOpen,
  onUpload,
  t
}: {
  document: DocumentItem;
  language: "en" | "zh";
  onDeleteFile: () => void;
  onOpen: () => void;
  onUpload: () => void;
  t: (key: string, fallback?: string) => string;
}) {
  const derivedStatus = deriveDocumentStatus(document);
  const meta = statusMeta[derivedStatus];
  const hasPreview = Boolean(document.fileUri && document.fileName);
  const canShowImage = hasPreview && isImageFile(document.fileName, document.fileType);
  const statusLabel = language === "zh" ? meta.zh : meta.en;
  const uploadLabel = language === "zh" ? "上传文件" : "Upload file";

  return (
    <Card style={styles.documentCard}>
      <Pressable style={styles.documentHeader} onPress={onOpen}>
        <View style={styles.documentIcon}>
          <AppIcon name="file" color={colors.accent} size={28} />
        </View>
        <View style={styles.documentTitleBlock}>
          <Text style={styles.documentTitle}>{t(`seed.${document.id}`, document.title)}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: meta.color }]} />
            <Text style={[styles.statusText, { color: meta.color }]}>{statusLabel}</Text>
          </View>
        </View>
      </Pressable>

      {hasPreview ? (
        <Pressable style={styles.filePreviewRow} onPress={onOpen}>
          <View style={styles.thumbnail}>
            {canShowImage ? (
              <Image source={{ uri: document.fileUri }} style={styles.thumbnailImage} resizeMode="cover" />
            ) : (
              <AppIcon name="file" color={colors.blue} size={24} />
            )}
          </View>
          <Text style={styles.fileName} numberOfLines={1}>
            {document.fileName}
          </Text>
          <Pressable style={styles.deleteFileButton} onPress={onDeleteFile}>
            <Text style={styles.deleteFileText}>×</Text>
          </Pressable>
        </Pressable>
      ) : (
        <Pressable style={styles.uploadRow} onPress={onUpload}>
          <Text style={styles.uploadPlus}>+</Text>
          <Text style={styles.uploadText}>{uploadLabel}</Text>
        </Pressable>
      )}
    </Card>
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
  documentCard: {
    gap: spacing.lg
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  documentIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: colors.accentSoft
  },
  documentTitleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  documentTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600"
  },
  filePreviewRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  thumbnail: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radii.sm,
    backgroundColor: colors.surface
  },
  thumbnailImage: {
    width: "100%",
    height: "100%"
  },
  fileName: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "700"
  },
  deleteFileButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: colors.dangerSoft
  },
  deleteFileText: {
    color: colors.danger,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26
  },
  uploadRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  uploadPlus: {
    color: colors.mutedText,
    fontSize: 25,
    fontWeight: "500"
  },
  uploadText: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "600"
  }
});
