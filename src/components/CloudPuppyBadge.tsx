import { Image, StyleSheet, View } from "react-native";

const cloudPuppyLogo = require("../../assets/cloud-puppy-logo.png");

interface CloudPuppyBadgeProps {
  size?: number;
}

export function CloudPuppyBadge({ size = 42 }: CloudPuppyBadgeProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={cloudPuppyLogo} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
