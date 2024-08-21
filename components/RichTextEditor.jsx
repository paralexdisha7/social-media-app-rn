import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RichToolbar, actions } from "react-native-pell-rich-editor";

const RichTextEditor = ({ editorRef, onChange }) => {
  return (
    <View style={{ minHeight: 285 }}>
      <Text>
        <RichToolbar
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.removeFormat,
            actions.insertVideo,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
          style={styles.richBar}
          flatContainerStyle={styles.listStyle}
          editor={editorRef}
          disabled={false}

        />
      </Text>
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar:{},
  listStyle:{},
});
