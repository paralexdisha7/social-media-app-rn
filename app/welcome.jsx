import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import ScreenWrapper from "../components/screenWrapper";
import { StatusBar } from "expo-status-bar";
import { wp, hp } from "../helpers/common";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={require("../assets/images/welcome.png")}
          style={styles.welcomeImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            Where Every Thought finds a home and every image tells a story!
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Let's Begin!"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => {router.push('signup')}}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={()=>router.push('login')}>
              <Text style={[styles.loginText,{color:theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  footer: {
    gap:15
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(60),
    width: wp(60),
  },
  textContainer: {
    gap: 20,
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  loginText: {
    textAlign:'center',
    color: theme.colors.text,
    fontSize:hp(1.6)
  },
});
