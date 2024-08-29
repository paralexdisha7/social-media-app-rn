import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { supabase } from "../lib/supabase";
import { supabaseUrl } from "../constants";

export const getImageUserSource = (imagePath) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require("../assets/images/default_user.png");
  }
};

export const getSupabaseFileUrl = (filePath) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  }
  return null;
};

export const uploadFile = async (folderName, fileUri, isImage = true) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64data = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let imageData = decode(fileBase64data); // array buffer

    let { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: isImage ? "image/*" : "video/*",
      });
    if (error) {
      console.log("file upload error : ", error);
      return { success: false, msg: "could not upload media" };
    }
    // console.log("data : ", data);

    return { success: true, data: data.path };
  } catch (error) {
    console.log("file upload error : ", error);
    return { success: false, msg: "could not upload media" };
  }
};

export const getFilePath = (folderName, isImage) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
  //   profile/8767633235.png
  // images/756358623.png
};
