import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
  try {
    // Upload iimage
    if (post.file && typeof post.file == "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";
      let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      if (fileResult.success) post.file = fileResult.data;
      else {
        return fileResult;
      }
    }
    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("create post error", error);
      return { success: false, msg: "could not post" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("create post error", error);
    return { success: false, msg: "could not post" };
  }
};

export const fetchPosts = async (limit) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        user: users(id,name,image)       
        `
      )
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.log("fetch post error", error);
      return { success: false, msg: "could not fetch post" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetch post error", error);
    return { success: false, msg: "could not fetch post" };
  }
};
