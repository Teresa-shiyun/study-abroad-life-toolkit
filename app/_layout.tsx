import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppDataProvider } from "../src/data/AppDataContext";
import { LanguageProvider, useLanguage } from "../src/i18n";
import { colors } from "../src/utils/theme";

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
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: "700" },
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.background }
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
        <Stack.Screen name="profile" options={{ title: t("profile", "Profile") }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </>
  );
}
