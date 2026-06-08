import type { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../utils/theme";
import { CloudPuppyBadge } from "./CloudPuppyBadge";

interface ScreenProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Screen({ title, subtitle, children, footer }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.phoneShell}>
        <ScrollView contentContainerStyle={styles.content}>
          {title || subtitle ? (
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <CloudPuppyBadge size={40} />
                {title ? <Text style={styles.title}>{title}</Text> : null}
              </View>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
          ) : null}
          {children}
        </ScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background
  },
  phoneShell: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    backgroundColor: colors.background
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  header: {
    gap: spacing.xs
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 28,
    fontWeight: "600"
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 21
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface
  }
});
