import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../src/i18n";

export default function NotFoundScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("pageNotFound")}</Text>
      <Text style={styles.text}>{t("pageNotFoundText")}</Text>
      <Link href="/" style={styles.link}>
        {t("backHome")}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    backgroundColor: "#f8fafc"
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#172033"
  },
  text: {
    textAlign: "center",
    color: "#5f6b7a"
  },
  link: {
    color: "#245c73",
    fontWeight: "700"
  }
});
