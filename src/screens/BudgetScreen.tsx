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
import type { BudgetCategory } from "../types";
import { formatCurrency, getProgressPercent } from "../utils/format";
import { colors, radii, shadows, spacing } from "../utils/theme";

const budgetCategories: BudgetCategory[] = [
  "rent",
  "food",
  "transport",
  "shopping",
  "travel",
  "subscription",
  "other"
];

const categoryIcon: Record<BudgetCategory, "wallet" | "transport" | "file"> = {
  rent: "file",
  food: "wallet",
  transport: "transport",
  shopping: "wallet",
  travel: "transport",
  subscription: "file",
  other: "wallet"
};

export function BudgetScreen() {
  const { language, t } = useLanguage();
  const {
    addBudgetItem,
    budgetItems,
    deleteBudgetItem,
    monthlyBudget,
    setMonthlyBudgetAmount
  } = useAppData();
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(String(monthlyBudget.amount));
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState<BudgetCategory>("food");
  const [notice, setNotice] = useState<string | undefined>();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | undefined>();
  const spent = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remaining = monthlyBudget.amount - spent;
  const spentPercent = Math.min(100, getProgressPercent(spent, monthlyBudget.amount));

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  function cycleExpenseCategory() {
    const index = budgetCategories.indexOf(expenseCategory);
    setExpenseCategory(budgetCategories[(index + 1) % budgetCategories.length]);
  }

  function handleSaveBudget() {
    const amount = Number(budgetAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setMonthlyBudgetAmount(amount);
    setShowBudgetForm(false);
    setNotice(t("budgetSaved"));
  }

  function handleAddExpense() {
    const amount = Number(expenseAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    addBudgetItem(expenseTitle || t("newExpenseTitle"), amount, expenseCategory);
    setExpenseTitle("");
    setExpenseAmount("");
    setShowExpenseForm(false);
    setNotice(t("expenseAdded"));
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    deleteBudgetItem(pendingDeleteId);
    setPendingDeleteId(undefined);
    setNotice(t("expenseDeleted"));
  }

  return (
    <Screen title={t("budget")} subtitle={pick("管理你的每月开支", "Manage monthly spending")}>
      <Pressable style={styles.budgetHero} onPress={() => setShowBudgetForm(true)}>
        <Text style={styles.heroLabel}>{pick("本月剩余", "Remaining this month")}</Text>
        <Text style={styles.heroAmount}>{formatCurrency(remaining, monthlyBudget.currency)}</Text>
        <View style={styles.heroTrack}>
          <View style={[styles.heroFill, { width: `${spentPercent}%` }]} />
        </View>
        <View style={styles.heroMetaRow}>
          <Text style={styles.heroMeta}>
            {pick("已用", "Spent")} {formatCurrency(spent, monthlyBudget.currency)}
          </Text>
          <Text style={styles.heroMeta}>
            {pick("预算", "Budget")} {formatCurrency(monthlyBudget.amount, monthlyBudget.currency)}
          </Text>
        </View>
      </Pressable>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t("expenses")}</Text>
        <Pressable style={styles.addCircle} onPress={() => setShowExpenseForm(true)}>
          <Text style={styles.addCircleText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.expenseList}>
        {budgetItems.map((item) => (
          <Card key={item.id} style={styles.expenseCard}>
            <View style={styles.expenseIcon}>
              <AppIcon name={categoryIcon[item.category]} color={colors.accent} size={24} />
            </View>
            <View style={styles.expenseTextBlock}>
              <Text style={styles.expenseTitle}>{item.title}</Text>
              <Text style={styles.expenseMeta}>{t(`budgetCategory.${item.category}`)}</Text>
            </View>
            <View style={styles.expenseAmountBlock}>
              <Text style={styles.expenseAmount}>{formatCurrency(item.amount, item.currency)}</Text>
              <Text style={styles.expenseDate}>{item.date.slice(5).replace("-", "/")}</Text>
            </View>
            <Pressable style={styles.deleteButton} onPress={() => setPendingDeleteId(item.id)}>
              <Text style={styles.deleteText}>×</Text>
            </Pressable>
          </Card>
        ))}
      </View>

      <FormSheet
        visible={showBudgetForm}
        title={t("setMonthlyBudget")}
        onClose={() => setShowBudgetForm(false)}
      >
        <Text style={styles.label}>{t("monthlyBudget")}</Text>
        <TextInput
          value={budgetAmount}
          onChangeText={setBudgetAmount}
          keyboardType="numeric"
          placeholder={t("budgetAmountPlaceholder")}
          style={styles.input}
        />
        <AppButton onPress={handleSaveBudget}>{t("saveChanges")}</AppButton>
      </FormSheet>

      <FormSheet
        visible={showExpenseForm}
        title={t("addExpense")}
        onClose={() => setShowExpenseForm(false)}
      >
        <Text style={styles.label}>{t("title")}</Text>
        <TextInput
          value={expenseTitle}
          onChangeText={setExpenseTitle}
          placeholder={t("expenseTitlePlaceholder")}
          style={styles.input}
        />
        <Text style={styles.label}>{t("amount")}</Text>
        <TextInput
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          keyboardType="numeric"
          placeholder="0"
          style={styles.input}
        />
        <Text style={styles.label}>{t("category")}</Text>
        <Pressable style={styles.picker} onPress={cycleExpenseCategory}>
          <Text style={styles.pickerText}>{t(`budgetCategory.${expenseCategory}`)}</Text>
          <Text style={styles.helper}>{t("tapToChange")}</Text>
        </Pressable>
        <AppButton onPress={handleAddExpense}>{t("addExpense")}</AppButton>
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

const styles = StyleSheet.create({
  budgetHero: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  heroLabel: {
    color: "#edf5ff",
    fontSize: 16,
    fontWeight: "600"
  },
  heroAmount: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 56
  },
  heroTrack: {
    height: 12,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.28)"
  },
  heroFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#ffffff"
  },
  heroMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  heroMeta: {
    color: "#f7fbff",
    fontSize: 14,
    fontWeight: "700"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700"
  },
  addCircle: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    backgroundColor: colors.primary,
    ...shadows.card
  },
  addCircleText: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 36
  },
  expenseList: {
    gap: spacing.md
  },
  expenseCard: {
    minHeight: 96,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  expenseIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: colors.accentSoft
  },
  expenseTextBlock: {
    flex: 1,
    gap: spacing.xs
  },
  expenseTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  expenseMeta: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: "700"
  },
  expenseAmountBlock: {
    alignItems: "flex-end",
    gap: spacing.xs
  },
  expenseAmount: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },
  expenseDate: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: "700"
  },
  deleteButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: colors.dangerSoft
  },
  deleteText: {
    color: colors.danger,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 26
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
