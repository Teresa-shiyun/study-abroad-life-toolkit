import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import type { ChecklistCategory, ChecklistItem } from "../types";
import { getChecklistStatusTone } from "../utils/statusTone";
import { colors, spacing } from "../utils/theme";

const categoryFilters: Array<ChecklistCategory | "all"> = [
  "all",
  "banking",
  "health",
  "housing",
  "university",
  "travel",
  "other"
];

export function ChecklistScreen() {
  const { t } = useLanguage();
  const {
    addChecklistItem,
    checklistItems,
    cycleChecklistStatus,
    deleteChecklistItem,
    updateChecklistItem
  } = useAppData();
  const [categoryFilter, setCategoryFilter] = useState<ChecklistCategory | "all">("all");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();
  const [draftTitle, setDraftTitle] = useState("");
  const [notice, setNotice] = useState<string | undefined>();

  const visibleItems = useMemo(
    () =>
      categoryFilter === "all"
        ? checklistItems
        : checklistItems.filter((item) => item.category === categoryFilter),
    [categoryFilter, checklistItems]
  );
  const editingItem = checklistItems.find((item) => item.id === editingId);

  function handleAdd() {
    const item = addChecklistItem(t("newChecklistItemTitle"));
    setEditingId(item.id);
    setDraftTitle(item.title);
    setNotice(t("checklistItemSaved"));
  }

  function handleEdit(item: ChecklistItem) {
    setEditingId(item.id);
    setDraftTitle(t(`mock.${item.id}`, item.title));
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteChecklistItem(pendingDeleteId);
    setPendingDeleteId(undefined);
    setEditingId(undefined);
    setNotice(t("checklistItemDeleted"));
  }

  function handleSaveEdit() {
    if (!editingItem) {
      return;
    }

    updateChecklistItem(editingItem.id, { title: draftTitle });
    setNotice(t("checklistItemSaved"));
    setEditingId(undefined);
  }

  function filterLabel(filter: ChecklistCategory | "all") {
    return filter === "all" ? t("all") : t(`category.${filter}`);
  }

  return (
    <Screen title={t("checklist")}>
      <View style={styles.filters}>
        {categoryFilters.map((category) => (
          <Pill
            key={category}
            label={filterLabel(category)}
            selected={categoryFilter === category}
            onPress={() => setCategoryFilter(category)}
          />
        ))}
      </View>

      <Pressable style={styles.addCard} onPress={handleAdd}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addChecklistItem")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      {editingItem ? (
        <Card>
          <Text style={styles.label}>{t("title")}</Text>
          <TextInput
            value={draftTitle}
            onChangeText={setDraftTitle}
            placeholder={t("newChecklistItemTitle")}
            style={styles.input}
          />
          <View style={styles.editActions}>
            <AppButton onPress={handleSaveEdit}>{t("saveChanges")}</AppButton>
            <AppButton onPress={() => setEditingId(undefined)} variant="ghost">
              {t("cancel")}
            </AppButton>
          </View>
        </Card>
      ) : null}

      <View style={styles.itemList}>
        {visibleItems.map((item) => (
          <ChecklistCard
            key={item.id}
            item={item}
            t={t}
            onCycleStatus={() => {
              cycleChecklistStatus(item.id);
              setNotice(t("checklistStatusUpdated"));
            }}
            onDelete={() => setPendingDeleteId(item.id)}
            onEdit={() => handleEdit(item)}
          />
        ))}
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

function ChecklistCard({
  item,
  onCycleStatus,
  onDelete,
  onEdit,
  t
}: {
  item: ChecklistItem;
  onCycleStatus: () => void;
  onDelete: () => void;
  onEdit: () => void;
  t: (key: string, fallback?: string) => string;
}) {
  return (
    <Card>
      <View style={styles.cardTop}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{t(`mock.${item.id}`, item.title)}</Text>
          <Text style={styles.meta}>{t(`category.${item.category}`)}</Text>
        </View>
        <View style={styles.rowActions}>
          <ActionIconButton label={t("edit")} icon="edit" tone="primary" onPress={onEdit} />
          <ActionIconButton label={t("delete")} icon="trash" tone="danger" onPress={onDelete} />
        </View>
      </View>

      <Pressable
        accessibilityLabel={t("status")}
        onPress={onCycleStatus}
        style={[styles.statusBox, styles[`${getChecklistStatusTone(item.status)}StatusBox`]]}
      >
        <Text style={styles.statusLabel}>{t("status")}</Text>
        <Text style={styles.statusValue}>{t(`status.${item.status}`)}</Text>
      </Pressable>

      {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
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
  itemList: {
    gap: spacing.md
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
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
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23
  },
  meta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700"
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
  warningStatusBox: {
    borderColor: colors.warning,
    backgroundColor: colors.warningSoft
  },
  dangerStatusBox: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft
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
  },
  notes: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
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
  editActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
