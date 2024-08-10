import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
// import { useRouter } from "expo/-router";

const Home = () => {
  const { setAuth } = useAuth();
//   const router =useRouter()
  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Log Out Error!", "Cannot Log Out");
    }
  };
  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="Logout" onPress={onLogout} />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
