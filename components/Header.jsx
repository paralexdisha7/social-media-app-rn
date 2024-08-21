import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import BackButton from "./backButton";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";

const Header = ({ title, showBackButton = true, mB = 10 }) => {
  const router = useRouter();

  return (
    <View style={[styles.container, { marginBottom: mB }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.text}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
    // marginHorizontal:20

  },
  backButton: {
    position:'absolute',
    left:0,
    
  },
  text: {
    fontSize:hp(2.7),
    fontWeight:theme.fonts.semibold,
    color:theme.colors.textDark,

  },
});
