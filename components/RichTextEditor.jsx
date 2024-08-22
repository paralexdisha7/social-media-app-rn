import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  RichToolbar,
  actions,
  RichEditor,
} from "react-native-pell-rich-editor";
import { theme } from "../constants/theme";

const RichTextEditor = ({ editorRef, onChange }) => {
  return (
    <View style={{ minHeight: 285 }}>
        <RichToolbar
          actions={[
            actions.setStrikethrough,
            actions.removeFormat,
            actions.setBold,
            actions.setItalic,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,
            actions.heading1,
            actions.heading4,
          ]}
          iconMap={{
            [actions.heading1]:({tintColor}) => <Text style={{color:tintColor}}>H1</Text>,
            [actions.heading4]:({tintColor}) => <Text style={{color:tintColor}}>H4</Text>
          }}
          style={styles.richBar}
          selectedIconTint={theme.colors.primaryDark}
          flatContainerStyle={styles.flatStyle}
          editor={editorRef}
          disabled={false}
        />
        <RichEditor
          disabled={false}
          ref={editorRef}
          containerStyle={styles.rich}
          editorStyle={styles.contentStyle}
          placeholder={"what's on your mind?"}
          style={{width: '100%'}}

          onChange={onChange}
        />
      </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
  rich: {
    minHeight: 240,
    flex: 1,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5,
  },
  contentStyle: {
    color: theme.colors.textDark,
    placeholderColor: "grey",
  },
  flatStyle: {
    paddingHorizontal: 8,
    gap:3
  },
});
