import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { DocumentCategory } from "../types";
import { pickFile } from "../utils/filePicker";
import { colors, spacing } from "../utils/theme";

const documentCategories: DocumentCategory[] = [
  "passport",
  "visa",
  "bankLetter",
  "universityLetter",
  "casOrAdmission",
  "tenancyAgreement",
  "travelInsurance",
  "studentId",
  "other"
];

export function AddEditDocumentScreen() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { documents, saveDocument } = useAppData();
  const document = documents.find((item) => item.id === id);
  const [title, setTitle] = useState(document ? t(`seed.${document.id}`, document.title) : "");
  const [category, setCategory] = useState<DocumentCategory>(document?.category ?? "passport");
  const [expiryDate, setExpiryDate] = useState(document?.expiryDate ?? "");
  const [notes, setNotes] = useState(document?.notes ?? "");
  const [fileName, setFileName] = useState(document?.fileName ?? "");
  const [fileUri, setFileUri] = useState(document?.fileUri ?? "");
  const [fileType, setFileType] = useState(document?.fileType ?? "");
  const [notice, setNotice] = useState<string | undefined>();

  function cycleCategory() {
    const index = documentCategories.indexOf(category);
    setCategory(documentCategories[(index + 1) % documentCategories.length]);
  }

  async function handleChooseFile() {
    const selectedFile = await pickFile();
    if (!selectedFile) {
      setNotice(t("filePickerUnavailable"));
      return;
    }

    setFileName(selectedFile.name);
    setFileUri(selectedFile.uri ?? "");
    setFileType(selectedFile.type ?? "");
    setNotice(`${t("fileSelected")}: ${selectedFile.name}`);
  }

  function handleSave() {
    const savedId = saveDocument({
      id,
      title: title || t("newDocumentTitle"),
      category,
      expiryDate,
      notes,
      fileName: fileName || undefined,
      fileType: fileType || undefined,
      fileUri: fileUri || (fileName ? `local://selected/${fileName}` : undefined)
    });

    router.replace(routes.documentDetail(savedId));
  }

  return (
    <Screen title={t("addEditDocument")}>
      <Card>
        <Text style={styles.label}>{t("title")}</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t("newDocumentTitle")}
          style={styles.input}
        />

        <Text style={styles.label}>{t("category")}</Text>
        <Pressable style={styles.picker} onPress={cycleCategory}>
          <Text style={styles.pickerText}>{t(`documentCategory.${category}`)}</Text>
          <Text style={styles.helper}>{t("tapToChange")}</Text>
        </Pressable>

        <Text style={styles.label}>{t("expiryDate")}</Text>
        <TextInput
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <Text style={styles.label}>{t("notes")}</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder={t("addNotes")}
          style={[styles.input, styles.textArea]}
        />

        <AppButton onPress={handleChooseFile} variant="ghost">{t("filePlaceholderButton")}</AppButton>
        <Text style={styles.fileHint}>{fileName || t("fileUploadHint")}</Text>
      </Card>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.actions}>
        <AppButton onPress={handleSave}>{t("save")}</AppButton>
        <AppButton onPress={() => router.back()} variant="ghost">
          {t("cancel")}
        </AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600"
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    backgroundColor: colors.background
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: "top"
  },
  picker: {
    minHeight: 48,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background
  },
  pickerText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700"
  },
  helper: {
    color: colors.mutedText,
    fontSize: 12
  },
  fileHint: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
