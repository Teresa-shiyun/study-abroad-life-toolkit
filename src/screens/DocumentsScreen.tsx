import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { DocumentStatus } from "../types";
import { getDocumentStatusTone } from "../utils/statusTone";
import { colors, spacing } from "../utils/theme";

const statusFilters: Array<DocumentStatus | "all"> = [
  "all",
  "missing",
  "needsUpdate",
  "expired",
  "prepared"
];

export function DocumentsScreen() {
  const { t } = useLanguage();
  const { deleteDocument, documents } = useAppData();
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | "all">("all");
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();
  const visibleDocuments = useMemo(
    () =>
      statusFilter === "all"
        ? documents
        : documents.filter((document) => document.status === statusFilter),
    [documents, statusFilter]
  );

  function filterLabel(filter: DocumentStatus | "all") {
    return filter === "all" ? t("all") : t(`documentStatus.${filter}`);
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteDocument(pendingDeleteId);
    setPendingDeleteId(undefined);
    setNotice(t("documentDeleted"));
  }

  return (
    <Screen title={t("documents")}>
      <View style={styles.filters}>
        {statusFilters.map((filter) => (
          <Pill
            key={filter}
            label={filterLabel(filter)}
            selected={filter === statusFilter}
            onPress={() => {
              setStatusFilter(filter);
              setNotice(t("filterChanged"));
            }}
          />
        ))}
      </View>

      <Pressable style={styles.addCard} onPress={() => router.push(routes.documentEdit)}>
        <Text style={styles.addSymbol}>+</Text>
        <Text style={styles.addText}>{t("addDocument")}</Text>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.list}>
        {visibleDocuments.map((document) => (
          <Card key={document.id}>
            <View style={styles.cardTop}>
              <Pressable
                accessibilityLabel={t("openPage")}
                onPress={() => router.push(routes.documentDetail(document.id))}
                style={styles.titleBlock}
              >
                <Text style={styles.title}>{t(`mock.${document.id}`, document.title)}</Text>
                <Text style={styles.meta}>{t(`documentCategory.${document.category}`)}</Text>
              </Pressable>
              <View style={styles.rowActions}>
                <ActionIconButton
                  label={t("edit")}
                  icon="edit"
                  tone="primary"
                  onPress={() =>
                    router.push({
                      pathname: "/documents/edit",
                      params: { id: document.id }
                    })
                  }
                />
                <ActionIconButton
                  label={t("delete")}
                  icon="trash"
                  tone="danger"
                  onPress={() => setPendingDeleteId(document.id)}
                />
              </View>
            </View>
            <View style={[styles.statusBox, styles[`${getDocumentStatusTone(document.status)}StatusBox`]]}>
              <Text style={styles.statusLabel}>{t("status")}</Text>
              <Text style={styles.statusValue}>{t(`documentStatus.${document.status}`)}</Text>
            </View>
            <Text style={styles.text}>
              {t("expiryDate")}: {document.expiryDate ?? t("notSet")}
            </Text>
            <Text style={styles.text}>
              {t("fileName")}: {document.fileName ?? t("noFileSelected")}
            </Text>
          </Card>
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

const styles = StyleSheet.create({
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
  },
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
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  }
});
