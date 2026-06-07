import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { routes } from "../navigation/routes";
import { colors, spacing } from "../utils/theme";

export function AddEditTripScreen() {
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { saveTrip, trips } = useAppData();
  const trip = trips.find((item) => item.id === id);
  const [name, setName] = useState(trip ? t(`mock.${trip.id}`, trip.name) : "");
  const [destination, setDestination] = useState(trip?.destination ?? "");
  const [startDate, setStartDate] = useState(trip?.startDate ?? "");
  const [endDate, setEndDate] = useState(trip?.endDate ?? "");
  const [notes, setNotes] = useState(trip?.notes ?? "");

  function handleSave() {
    const savedId = saveTrip({
      id,
      name: name || t("newTripTitle"),
      destination,
      startDate,
      endDate,
      notes
    });

    router.replace(routes.travelDetail(savedId));
  }

  return (
    <Screen title={t("addEditTrip")}>
      <Card>
        <Text style={styles.label}>{t("title")}</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("newTripTitle")}
          style={styles.input}
        />

        <Text style={styles.label}>{t("destination")}</Text>
        <TextInput
          value={destination}
          onChangeText={setDestination}
          placeholder="Paris, France"
          style={styles.input}
        />

        <Text style={styles.label}>{t("startDate")}</Text>
        <TextInput
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <Text style={styles.label}>{t("endDate")}</Text>
        <TextInput
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <Text style={styles.label}>{t("notes")}</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder={t("addTravelNotes")}
          style={[styles.input, styles.textArea]}
        />
      </Card>

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
    fontWeight: "800"
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
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
