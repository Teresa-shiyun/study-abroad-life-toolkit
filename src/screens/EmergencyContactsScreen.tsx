import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { InfoRow } from "../components/InfoRow";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import type { EmergencyContact, EmergencyContactCategory } from "../types";
import { copyText } from "../utils/clipboard";
import { colors, spacing } from "../utils/theme";

const contactCategories: EmergencyContactCategory[] = [
  "university",
  "accommodation",
  "gp",
  "bankLostCard",
  "embassy",
  "localPoliceNonEmergency",
  "friendOrFamily",
  "other"
];

export function EmergencyContactsScreen() {
  const { t } = useLanguage();
  const {
    deleteEmergencyContact,
    emergencyContacts,
    saveEmergencyContact
  } = useAppData();
  const [selectedId, setSelectedId] = useState<string | undefined>(emergencyContacts[0]?.id);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState<EmergencyContactCategory>("university");
  const [draftPhone, setDraftPhone] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftAddress, setDraftAddress] = useState("");
  const [draftNotes, setDraftNotes] = useState("");
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();
  function beginEdit(contact?: EmergencyContact) {
    setEditingId(contact?.id ?? "new");
    setDraftName(contact ? t(`mock.${contact.id}`, contact.name) : "");
    setDraftCategory(contact?.category ?? "university");
    setDraftPhone(contact?.phone ?? "");
    setDraftEmail(contact?.email ?? "");
    setDraftAddress(contact?.address ?? "");
    setDraftNotes(contact?.notes ?? "");
  }

  function cycleCategory() {
    const index = contactCategories.indexOf(draftCategory);
    setDraftCategory(contactCategories[(index + 1) % contactCategories.length]);
  }

  function handleSaveContact() {
    const savedId = saveEmergencyContact({
      id: editingId === "new" ? undefined : editingId,
      name: draftName || t("newContactName"),
      category: draftCategory,
      phone: draftPhone,
      email: draftEmail,
      address: draftAddress,
      notes: draftNotes
    });

    setSelectedId(savedId);
    setEditingId(undefined);
    setNotice(t("contactSaved"));
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteEmergencyContact(pendingDeleteId);
    setPendingDeleteId(undefined);
    setSelectedId(undefined);
    setEditingId(undefined);
    setNotice(t("contactDeleted"));
  }

  async function handleCopy(value?: string) {
    const copied = await copyText(value);
    setNotice(copied ? t("copyDone") : t("copyUnavailable"));
  }

  return (
    <Screen title={t("emergencyContacts")}>
      <Pressable style={styles.addCard} onPress={() => beginEdit()}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addContact")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      {editingId ? (
        <Card>
          <Text style={styles.label}>{t("title")}</Text>
          <TextInput
            value={draftName}
            onChangeText={setDraftName}
            placeholder={t("newContactName")}
            style={styles.input}
          />
          <Text style={styles.label}>{t("category")}</Text>
          <Pressable style={styles.picker} onPress={cycleCategory}>
            <Text style={styles.pickerText}>{t(`contactCategory.${draftCategory}`)}</Text>
            <Text style={styles.helper}>{t("tapToChange")}</Text>
          </Pressable>
          <Text style={styles.label}>{t("phone")}</Text>
          <TextInput value={draftPhone} onChangeText={setDraftPhone} style={styles.input} />
          <Text style={styles.label}>{t("email")}</Text>
          <TextInput value={draftEmail} onChangeText={setDraftEmail} style={styles.input} />
          <Text style={styles.label}>{t("address")}</Text>
          <TextInput value={draftAddress} onChangeText={setDraftAddress} style={styles.input} />
          <Text style={styles.label}>{t("notes")}</Text>
          <TextInput
            value={draftNotes}
            onChangeText={setDraftNotes}
            multiline
            style={[styles.input, styles.textArea]}
          />
          <View style={styles.actions}>
            <AppButton onPress={handleSaveContact}>{t("saveContact")}</AppButton>
            <AppButton onPress={() => setEditingId(undefined)} variant="ghost">{t("cancel")}</AppButton>
          </View>
        </Card>
      ) : null}

      <Section title={t("contacts")}>
        {emergencyContacts.map((contact) => (
          <Card
            key={contact.id}
            onPress={() => setSelectedId(contact.id)}
            style={contact.id === selectedId ? styles.selectedCard : undefined}
          >
            <View style={styles.row}>
              <Text style={styles.title}>{t(`mock.${contact.id}`, contact.name)}</Text>
              <View style={styles.rowActions}>
                <ActionIconButton
                  label={t("edit")}
                  icon="edit"
                  tone="primary"
                  onPress={() => beginEdit(contact)}
                />
                <ActionIconButton
                  label={t("delete")}
                  icon="trash"
                  tone="danger"
                  onPress={() => setPendingDeleteId(contact.id)}
                />
              </View>
            </View>
            <Pill label={t(`contactCategory.${contact.category}`)} />
            <InfoRow label={t("phone")} value={contact.phone} />
            <InfoRow label={t("email")} value={contact.email} />
            <InfoRow label={t("notes")} value={contact.notes} />
            {contact.id === selectedId ? <Text style={styles.selectedText}>{t("selected")}</Text> : null}
            <View style={styles.actions}>
              <AppButton onPress={() => handleCopy(contact.phone)} variant="ghost">{t("copyPhone")}</AppButton>
              <AppButton onPress={() => handleCopy(contact.email)} variant="ghost">{t("copyEmail")}</AppButton>
            </View>
          </Card>
        ))}
      </Section>
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
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  rowActions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  selectedText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  selectedCard: {
    borderColor: colors.primary
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
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
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
