import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import type { SearchResultType } from "../types";
import { formatCurrency, formatDateRange } from "../utils/format";
import { colors, spacing } from "../utils/theme";

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: SearchResultType;
  open: () => void;
}

const groupOrder: SearchResultType[] = ["Documents", "Checklist", "Trips", "Budget", "Contacts"];

export function SearchScreen() {
  const { t } = useLanguage();
  const { budgetItems, checklistItems, documents, emergencyContacts, trips } = useAppData();
  const [query, setQuery] = useState("");
  const results = useMemo<SearchResultItem[]>(
    () => [
      ...documents.map((document) => ({
        id: document.id,
        type: "Documents" as SearchResultType,
        title: t(`mock.${document.id}`, document.title),
        subtitle: `${t(`documentCategory.${document.category}`)} · ${t(`documentStatus.${document.status}`)}`,
        open: () => router.push(routes.documentDetail(document.id))
      })),
      ...checklistItems.map((item) => ({
        id: item.id,
        type: "Checklist" as SearchResultType,
        title: t(`mock.${item.id}`, item.title),
        subtitle: `${t(`category.${item.category}`)} · ${t(`status.${item.status}`)}`,
        open: () => router.push(routes.checklist)
      })),
      ...trips.map((trip) => ({
        id: trip.id,
        type: "Trips" as SearchResultType,
        title: t(`mock.${trip.id}`, trip.name),
        subtitle: `${trip.destination} · ${formatDateRange(trip.startDate, trip.endDate)}`,
        open: () => router.push(routes.travelDetail(trip.id))
      })),
      ...budgetItems.map((item) => ({
        id: item.id,
        type: "Budget" as SearchResultType,
        title: item.title,
        subtitle: `${t(`budgetCategory.${item.category}`)} · ${formatCurrency(item.amount, item.currency)}`,
        open: () => router.push(routes.budget)
      })),
      ...emergencyContacts.map((contact) => ({
        id: contact.id,
        type: "Contacts" as SearchResultType,
        title: t(`mock.${contact.id}`, contact.name),
        subtitle: contact.phone ?? contact.email ?? t(`contactCategory.${contact.category}`),
        open: () => router.push(routes.emergency)
      }))
    ],
    [budgetItems, checklistItems, documents, emergencyContacts, t, trips]
  );
  const visibleResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return results;
    }

    return results.filter((result) =>
      `${result.title} ${result.subtitle} ${getGroupName(result.type, t)}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, results, t]);

  return (
    <Screen title={t("search")} subtitle={t("searchSubtitle")}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t("searchPlaceholder")}
        style={styles.input}
      />

      {visibleResults.length === 0 ? (
        <Card>
          <Text style={styles.text}>{t("noResults")}</Text>
        </Card>
      ) : null}

      {groupOrder.map((group) => {
        const groupResults = visibleResults.filter((result) => result.type === group);
        if (groupResults.length === 0) {
          return null;
        }

        return (
          <Section key={group} title={getGroupName(group, t)}>
            {groupResults.map((result) => (
              <Card key={`${result.type}-${result.id}`} onPress={result.open}>
                <View style={styles.row}>
                  <Text style={styles.title}>{result.title}</Text>
                  <Text style={styles.type}>{getGroupName(result.type, t)}</Text>
                </View>
                <Text style={styles.text}>{result.subtitle}</Text>
              </Card>
            ))}
          </Section>
        );
      })}
    </Screen>
  );
}

function getGroupName(group: string, t: (key: string) => string) {
  const labels: Record<string, string> = {
    Documents: t("documents"),
    Checklist: t("checklist"),
    Trips: t("travel"),
    Budget: t("budget"),
    Contacts: t("contacts")
  };

  return labels[group] ?? group;
}

const styles = StyleSheet.create({
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  type: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  text: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20
  }
});
