import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppIcon } from "../components/AppIcon";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { FormSheet } from "../components/FormSheet";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import type { EmergencyContact, EmergencyContactCategory } from "../types";
import { copyText } from "../utils/clipboard";
import { colors, radii, shadows, spacing } from "../utils/theme";

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
  const { language, t } = useLanguage();
  const {
    deleteEmergencyContact,
    emergencyContacts,
    saveEmergencyContact
  } = useAppData();
  const [editingId, setEditingId] = useState<string | undefined>();
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState<EmergencyContactCategory>("university");
  const [draftPhone, setDraftPhone] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftAddress, setDraftAddress] = useState("");
  const [draftNotes, setDraftNotes] = useState("");
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  function beginEdit(contact?: EmergencyContact) {
    setEditingId(contact?.id ?? "new");
    setDraftName(contact ? t(`seed.${contact.id}`, contact.name) : "");
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
    saveEmergencyContact({
      id: editingId === "new" ? undefined : editingId,
      name: draftName || t("newContactName"),
      category: draftCategory,
      phone: draftPhone,
      email: draftEmail,
      address: draftAddress,
      notes: draftNotes
    });

    setEditingId(undefined);
    setNotice(t("contactSaved"));
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteEmergencyContact(pendingDeleteId);
    setPendingDeleteId(undefined);
    setNotice(t("contactDeleted"));
  }

  async function handleCopy(value?: string) {
    const copied = await copyText(value);
    setNotice(copied ? t("copyDone") : t("copyUnavailable"));
  }

  return (
    <Screen title={t("emergencyContacts")} subtitle={pick("保持联系很重要", "Keep important contacts close")}>
      <View style={styles.topActions}>
        <Pressable style={styles.addCircle} onPress={() => beginEdit()}>
          <Text style={styles.addCircleText}>+</Text>
        </Pressable>
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.list}>
        {emergencyContacts.map((contact) => (
          <Card key={contact.id} style={styles.contactCard}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <AppIcon name={contact.category === "embassy" ? "file" : "emergency"} color={colors.lavender} size={28} />
              </View>
              <View style={styles.titleBlock}>
                <Text style={styles.title}>{t(`seed.${contact.id}`, contact.name)}</Text>
                <Text style={styles.category}>{t(`contactCategory.${contact.category}`)}</Text>
              </View>
              <Pressable style={styles.editButton} onPress={() => beginEdit(contact)}>
                <Text style={styles.editButtonText}>{t("edit")}</Text>
              </Pressable>
            </View>

            {contact.phone ? (
              <InfoPill
                icon="phone"
                value={contact.phone}
                onCopy={() => handleCopy(contact.phone)}
              />
            ) : null}
            {contact.email ? (
              <InfoPill
                icon="mail"
                value={contact.email}
                onCopy={() => handleCopy(contact.email)}
              />
            ) : null}

            <Pressable style={styles.deleteContact} onPress={() => setPendingDeleteId(contact.id)}>
              <Text style={styles.deleteContactText}>{t("delete")}</Text>
            </Pressable>
          </Card>
        ))}
      </View>

      <FormSheet
        visible={Boolean(editingId)}
        title={editingId === "new" ? t("addContact") : t("editContact")}
        onClose={() => setEditingId(undefined)}
      >
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
        <AppButton onPress={handleSaveContact}>{t("saveContact")}</AppButton>
      </FormSheet>

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

function InfoPill({
  icon,
  onCopy,
  value
}: {
  icon: "phone" | "mail";
  onCopy: () => void;
  value: string;
}) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.infoIcon}>{icon === "phone" ? "☎" : "✉"}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
      <Pressable style={styles.copyButton} onPress={onCopy}>
        <Text style={styles.copyText}>□</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topActions: {
    alignItems: "flex-end",
    marginTop: -spacing.lg
  },
  addCircle: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  addCircleText: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "300",
    lineHeight: 38
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  list: {
    gap: spacing.md
  },
  contactCard: {
    gap: spacing.lg
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  avatar: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: colors.accentSoft
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28
  },
  category: {
    color: colors.mutedText,
    fontSize: 15,
    fontWeight: "700"
  },
  editButton: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700"
  },
  infoPill: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted
  },
  infoIcon: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700"
  },
  infoValue: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: "600"
  },
  copyButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  copyText: {
    color: colors.mutedText,
    fontSize: 18,
    fontWeight: "700"
  },
  deleteContact: {
    alignSelf: "flex-end",
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.dangerSoft
  },
  deleteContactText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "700"
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600"
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
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
    borderRadius: radii.md,
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
  }
});
