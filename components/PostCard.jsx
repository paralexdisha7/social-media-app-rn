import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Avatar from "./Avatar";
import moment from "moment";
import Icon from "../assets/icons";
import RenderHTML from "react-native-render-html";
import { color } from "@rneui/themed/dist/config";
import { Image } from "expo-image";
import { getSupabaseFileUrl } from "../services/imageService";
import { Video } from "expo-av";

const PostCard = ({ item, currentUser, router, hasShadow = true }) => {
  //   console.log("post item :", item);
  const shadowStyles = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };
  const textStyle = {
    color: theme.colors.dark,
    fontSize: hp(1.75),
  };
  const tagStyles = {
    div: textStyle,
    p: textStyle,
    ol: textStyle,
    h1: {
      color: theme.colors.dark,
    },
    h4: {
      color: theme.colors.dark,
    },
  };
  const createdAt = moment(item?.created_at).format("MMM D");
  const openPostsDetails = () => {
    // later
  };
  const liked = false;
  const likes = [];
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            uri={item?.user?.image}
            size={hp(4.5)}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.userName}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={openPostsDetails}>
          <Icon
            name="threeDotsHorizontal"
            size={hp(3.4)}
            strokeWidth={3}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      {/* post body and media */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHTML
              contentWidth={wp(100)}
              source={{ html: item?.body }}
              tagsStyles={tagStyles}
            />
          )}
          {/* <Text style={styles.postBody}>{item?.body}</Text> */}
        </View>
        {/* post image */}
        {item?.file && item?.file?.includes("postImages") && (
          <Image
            source={getSupabaseFileUrl(item?.file)}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}
        {item?.file && item?.file?.includes("postVideos") && (
          <Video
            source={getSupabaseFileUrl(item?.file)}
            transition={100}
            style={[styles.postMedia, { height: hp(30) }]}
            contentFit="cover"
            useNativeControls
            isLooping
          />
        )}
      </View>
      {/* like commet share */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon
              name="heart"
              size={24}
              color={liked ? theme.colors.rose : theme.colors.textLight}
              fill={liked ? theme.colors.rose : 'transparent'}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes?.length}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name="comment" size={24} />
          </TouchableOpacity>
          <Text style={styles.count}>{0}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Icon name="share" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  content: {
    gap: 10,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postBody: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
});
