import { Tabs } from "expo-router";
import { AppIcon } from "../../src/components/AppIcon";
import { useLanguage } from "../../src/i18n";
import { colors } from "../../src/utils/theme";

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text, fontWeight: "700" },
        headerTintColor: colors.primary,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarLabel: t("home"),
          tabBarIcon: ({ color }) => <AppIcon name="home" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: t("checklist"),
          tabBarLabel: t("checklist"),
          tabBarIcon: ({ color }) => <AppIcon name="list" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: t("documents"),
          tabBarLabel: t("documents"),
          tabBarIcon: ({ color }) => <AppIcon name="file" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="travel"
        options={{
          title: t("travel"),
          tabBarLabel: t("travel"),
          tabBarIcon: ({ color }) => <AppIcon name="transport" color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: t("budget"),
          tabBarLabel: t("budget"),
          tabBarIcon: ({ color }) => <AppIcon name="wallet" color={color} size={24} />
        }}
      />
    </Tabs>
  );
}
