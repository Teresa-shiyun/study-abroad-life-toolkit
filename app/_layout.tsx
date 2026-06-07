import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppDataProvider } from "../src/data/AppDataContext";
import { LanguageProvider, useLanguage } from "../src/i18n";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AppDataProvider>
        <RootStack />
      </AppDataProvider>
    </LanguageProvider>
  );
}

function RootStack() {
  const { t } = useLanguage();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f8fafc" },
          headerTitleStyle: { color: "#172033", fontWeight: "700" },
          headerTintColor: "#245c73",
          contentStyle: { backgroundColor: "#f8fafc" }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="documents/[id]" options={{ title: t("documentDetail") }} />
        <Stack.Screen name="documents/edit" options={{ title: t("addEditDocument") }} />
        <Stack.Screen name="travel/[id]" options={{ title: t("travelDetail") }} />
        <Stack.Screen name="travel/edit" options={{ title: t("addEditTrip") }} />
        <Stack.Screen name="emergency" options={{ title: t("emergencyContacts") }} />
        <Stack.Screen name="search" options={{ title: t("search") }} />
        <Stack.Screen name="settings" options={{ title: t("settings") }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </>
  );
}
