import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ActionIconButton } from "../components/ActionIconButton";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Pill } from "../components/Pill";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import type { BudgetCategory } from "../types";
import { formatCurrency } from "../utils/format";
import { colors, spacing } from "../utils/theme";

const budgetCategories: BudgetCategory[] = [
  "rent",
  "food",
  "transport",
  "shopping",
  "travel",
  "subscription",
  "other"
];

export function BudgetScreen() {
  const { t } = useLanguage();
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
  const categoryTotals = useMemo(
    () =>
      budgetItems.reduce<Partial<Record<BudgetCategory, number>>>((totals, item) => {
        totals[item.category] = (totals[item.category] ?? 0) + item.amount;
        return totals;
      }, {}),
    [budgetItems]
  );

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
    <Screen title={t("budget")}>
      <View style={styles.summaryGrid}>
        <Card style={styles.summaryCard}>
          <Text style={styles.statValue}>
            {formatCurrency(monthlyBudget.amount, monthlyBudget.currency)}
          </Text>
          <Text style={styles.statLabel}>{t("monthlyBudget")}</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.statValue}>{formatCurrency(spent)}</Text>
          <Text style={styles.statLabel}>{t("spent")}</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.statValue}>{formatCurrency(remaining)}</Text>
          <Text style={styles.statLabel}>{t("remaining")}</Text>
        </Card>
      </View>

      <View style={styles.actionCards}>
        <Pressable style={styles.addCard} onPress={() => setShowExpenseForm((current) => !current)}>
          <Text style={styles.addSymbol}>+</Text>
          <Text style={styles.addText}>{t("addExpense")}</Text>
        </Pressable>
        <Pressable style={styles.addCard} onPress={() => setShowBudgetForm((current) => !current)}>
          <Text style={styles.addSymbol}>+</Text>
          <Text style={styles.addText}>{t("setMonthlyBudget")}</Text>
        </Pressable>
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      {showBudgetForm ? (
        <Card>
          <Text style={styles.label}>{t("monthlyBudget")}</Text>
          <TextInput
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            keyboardType="numeric"
            placeholder={t("budgetAmountPlaceholder")}
            style={styles.input}
          />
          <AppButton onPress={handleSaveBudget}>{t("saveChanges")}</AppButton>
        </Card>
      ) : null}

      {showExpenseForm ? (
        <Card>
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
        </Card>
      ) : null}

      <Section title={t("expenses")}>
        {budgetItems.map((item) => (
          <Card key={item.id}>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.rowActions}>
                <Text style={styles.amount}>{formatCurrency(item.amount, item.currency)}</Text>
                <ActionIconButton
                  label={t("delete")}
                  icon="trash"
                  tone="danger"
                  onPress={() => setPendingDeleteId(item.id)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <Pill label={t(`budgetCategory.${item.category}`)} />
              <Text style={styles.text}>{item.date}</Text>
            </View>
            {item.notes ? <Text style={styles.text}>{item.notes}</Text> : null}
          </Card>
        ))}
      </Section>

      <Section title={t("categorySummary")}>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <Card key={category}>
            <View style={styles.row}>
              <Text style={styles.title}>{t(`budgetCategory.${category}`)}</Text>
              <Text style={styles.amount}>{formatCurrency(amount)}</Text>
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
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  summaryCard: {
    width: "47%"
  },
  statValue: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "800"
  },
  statLabel: {
    color: colors.mutedText,
    fontSize: 13
  },
  actionCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  addCard: {
    minHeight: 52,
    flex: 1,
    minWidth: "47%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
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
    fontSize: 14,
    fontWeight: "800"
  },
  notice: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800"
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  amount: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800"
  },
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  }
});
