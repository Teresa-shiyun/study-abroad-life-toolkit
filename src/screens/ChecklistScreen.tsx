import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useAppData } from "../data/AppDataContext";
import { useLanguage } from "../i18n";
import { getChecklistProgress, getProgressPercent } from "../utils/format";
import { colors, radii, spacing } from "../utils/theme";

export function ChecklistScreen() {
  const { language, t } = useLanguage();
  const { addChecklistItem, checklistItems, updateChecklistItem } = useAppData();
  const doneCount = checklistItems.filter((item) => item.status === "done").length;
  const progress = getProgressPercent(doneCount, checklistItems.length);

  function pick(zh: string, en: string) {
    return language === "zh" ? zh : en;
  }

  return (
    <Screen title={t("checklist")} subtitle={pick("一步一步完成任务", "Finish tasks one step at a time")}>
      <View style={styles.progressLine}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{getChecklistProgress(doneCount, checklistItems.length)}</Text>
      </View>

      <View style={styles.list}>
        {checklistItems.map((item) => {
          const isDone = item.status === "done";

          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [styles.taskRow, pressed && styles.pressed]}
              onPress={() =>
                updateChecklistItem(item.id, {
                  status: isDone ? "notStarted" : "done"
                })
              }
            >
              <View style={[styles.circle, isDone && styles.circleDone]}>
                {isDone ? <Text style={styles.checkText}>✓</Text> : null}
              </View>
              <Text style={[styles.taskTitle, isDone && styles.taskDone]}>
                {t(`seed.${item.id}`, item.title)}
              </Text>
            </Pressable>
          );
        })}

        <Card
          style={styles.addTask}
          onPress={() => addChecklistItem(pick("新的清单事项", "New checklist item"))}
        >
          <Text style={styles.addText}>+ {pick("添加新任务", "Add new task")}</Text>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  progressTrack: {
    flex: 1,
    height: 12,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: colors.surface
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: colors.lavender
  },
  progressText: {
    minWidth: 42,
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right"
  },
  list: {
    gap: spacing.md
  },
  taskRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  circle: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 17,
    backgroundColor: colors.surface
  },
  circleDone: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  checkText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700"
  },
  taskTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 27
  },
  taskDone: {
    color: colors.mutedText,
    textDecorationLine: "line-through"
  },
  addTask: {
    minHeight: 76,
    alignItems: "center",
    justifyContent: "center"
  },
  addText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "600"
  },
  pressed: {
    opacity: 0.82
  }
});
