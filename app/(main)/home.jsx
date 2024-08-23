import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/screenWrapper";
// import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
// import { supabase } from "../../lib/supabase";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { useRouter } from "expo-router";
import Avatar from "../../components/Avatar";
import { fetchPosts } from "../../services/postService";
import { FlatList } from "react-native";
import PostCard from "../../components/PostCard";
import Loading from "../../components/loading";
import { supabase } from "../../lib/supabase";
import { getUserData } from "../../services/userService";
var limit = 0;

const Home = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const handlePostEvent = async (payload) => {
    // console.log("got post event", payload);
    if (payload.eventType === "INSERT" && payload?.new?.id) {
      let newPost = { ...payload.new };
      console.log("User ID in new post: ", newPost.userid); // Corrected key name

      if (newPost.userid) {
        let res = await getUserData(newPost.userid);
        console.log("User data response: ", res);

        newPost.user = res.success ? res.data : {};
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } else {
        console.error("userId is undefined for the new post");
      }
    }
  };
  useEffect(() => {
    let postChannel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        handlePostEvent
      )
      .subscribe();

    getPost();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPost = async () => {
    limit = limit + 10;
    // console.log("fetching posts : ", limit);
    let res = await fetchPosts();
    // console.log("posts : ", res);
    // console.log("user : ",res.data[0].user)
    if (res.data) {
      setPosts(res.data);
    }
  };
  return (
    <ScreenWrapper bg="white">
      {/* <Text>Home</Text> */}
      <View style={styles.container}>
        {/* headre */}
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("notifications")}>
              <Icon
                name="heart"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("newPost")}>
              <Icon
                name="plus"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("profile")}>
              <Avatar
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.Sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>
        {/* posts */}
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard item={item} currentUser={user} router={router} />
          )}
          ListFooterComponent={
            <View style={{ marginVertical: posts.length == 0 ? 200 : 30 }}>
              <Loading />
            </View>
          }
        />
      </View>
      {/* <Button title="Logout" onPress={onLogout} /> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4)
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.Sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },

  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },

  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
});
