import { StyleSheet, Text, View, type ColorValue } from "react-native";
import { colors, radii } from "../utils/theme";

export type AppIconName =
  | "home"
  | "list"
  | "file"
  | "transport"
  | "wallet"
  | "emergency"
  | "language"
  | "search";

interface AppIconProps {
  name: AppIconName;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  size?: number;
}

export function AppIcon({
  name,
  color = colors.primary,
  backgroundColor = "transparent",
  size = 40
}: AppIconProps) {
  const scale = size / 40;

  return (
    <View style={[styles.icon, { width: size, height: size, backgroundColor }]}>
      <View style={[styles.canvas, { transform: [{ scale }] }]}>
        {name === "home" ? <HomeIcon color={color} /> : null}
        {name === "list" ? <ListIcon color={color} /> : null}
        {name === "file" ? <FileIcon color={color} /> : null}
        {name === "transport" ? <TransportIcon color={color} /> : null}
        {name === "wallet" ? <WalletIcon color={color} /> : null}
        {name === "emergency" ? <EmergencyIcon color={color} /> : null}
        {name === "language" ? <LanguageIcon color={color} /> : null}
        {name === "search" ? <SearchIcon color={color} /> : null}
      </View>
    </View>
  );
}

function HomeIcon({ color }: { color: ColorValue }) {
  return (
    <>
      <View style={[styles.roofLeft, { backgroundColor: color }]} />
      <View style={[styles.roofRight, { backgroundColor: color }]} />
      <View style={[styles.homeBody, { borderColor: color }]}>
        <View style={[styles.homeDoor, { backgroundColor: color }]} />
      </View>
    </>
  );
}

function ListIcon({ color }: { color: ColorValue }) {
  return (
    <View style={styles.listWrap}>
      {[0, 1, 2].map((item) => (
        <View key={item} style={styles.listRow}>
          <View style={[styles.listDot, { backgroundColor: color }]} />
          <View style={[styles.listLine, { backgroundColor: color }]} />
        </View>
      ))}
    </View>
  );
}

function FileIcon({ color }: { color: ColorValue }) {
  return (
    <View style={[styles.filePage, { borderColor: color }]}>
      <View style={[styles.fileFold, { borderLeftColor: color, borderBottomColor: color }]} />
      <View style={[styles.fileLineLong, { backgroundColor: color }]} />
      <View style={[styles.fileLineShort, { backgroundColor: color }]} />
    </View>
  );
}

function TransportIcon({ color }: { color: ColorValue }) {
  return <Text style={[styles.glyphIcon, { color }]}>✈</Text>;
}

function WalletIcon({ color }: { color: ColorValue }) {
  return (
    <View style={[styles.wallet, { borderColor: color }]}>
      <View style={[styles.walletFlap, { borderColor: color }]} />
      <View style={[styles.walletButton, { backgroundColor: color }]} />
    </View>
  );
}

function EmergencyIcon({ color }: { color: ColorValue }) {
  return <Text style={[styles.glyphIcon, { color }]}>☎</Text>;
}

function LanguageIcon({ color }: { color: ColorValue }) {
  return (
    <View style={[styles.languageCircle, { borderColor: color }]}>
      <Text style={[styles.languageGlyph, { color }]}>A</Text>
    </View>
  );
}

function SearchIcon({ color }: { color: ColorValue }) {
  return (
    <>
      <View style={[styles.searchCircle, { borderColor: color }]} />
      <View style={[styles.searchHandle, { backgroundColor: color }]} />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md
  },
  glyphIcon: {
    fontSize: 27,
    fontWeight: "700",
    lineHeight: 32
  },
  canvas: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  roofLeft: {
    position: "absolute",
    top: 10,
    left: 12,
    width: 16,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: "-35deg" }]
  },
  roofRight: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 16,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: "35deg" }]
  },
  homeBody: {
    position: "absolute",
    top: 18,
    width: 20,
    height: 15,
    borderWidth: 3,
    borderRadius: 3
  },
  homeDoor: {
    position: "absolute",
    bottom: -3,
    left: 6,
    width: 5,
    height: 9,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  listWrap: {
    width: 24,
    gap: 5
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  listDot: {
    width: 5,
    height: 5,
    borderRadius: 3
  },
  listLine: {
    flex: 1,
    height: 4,
    borderRadius: 2
  },
  filePage: {
    width: 22,
    height: 27,
    borderWidth: 3,
    borderRadius: 3
  },
  fileFold: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 9,
    height: 9,
    borderLeftWidth: 3,
    borderBottomWidth: 3
  },
  fileLineLong: {
    position: "absolute",
    left: 5,
    bottom: 9,
    width: 11,
    height: 3,
    borderRadius: 2
  },
  fileLineShort: {
    position: "absolute",
    left: 5,
    bottom: 4,
    width: 8,
    height: 3,
    borderRadius: 2
  },
  transportWrap: {
    alignItems: "center"
  },
  vehicleBody: {
    width: 27,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 3,
    borderRadius: 5
  },
  vehicleWindow: {
    width: 7,
    height: 7,
    borderRadius: 2
  },
  wheels: {
    width: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2
  },
  wheel: {
    width: 5,
    height: 5,
    borderRadius: 3
  },
  wallet: {
    width: 27,
    height: 21,
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 5
  },
  walletFlap: {
    position: "absolute",
    right: -3,
    width: 13,
    height: 11,
    borderWidth: 3,
    borderRadius: 4,
    backgroundColor: colors.surface
  },
  walletButton: {
    position: "absolute",
    right: 4,
    width: 4,
    height: 4,
    borderRadius: 2
  },
  emergencyCircle: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 14
  },
  crossVertical: {
    position: "absolute",
    width: 5,
    height: 17,
    borderRadius: 3
  },
  crossHorizontal: {
    position: "absolute",
    width: 17,
    height: 5,
    borderRadius: 3
  },
  languageCircle: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 14
  },
  languageGlyph: {
    fontSize: 14,
    fontWeight: "700"
  },
  searchCircle: {
    position: "absolute",
    top: 9,
    left: 9,
    width: 17,
    height: 17,
    borderWidth: 3,
    borderRadius: 10
  },
  searchHandle: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 11,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }]
  }
});
