import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  guessContentType,
  isVideoFile,
  validateMediaFile,
  extOf,
} from "../lib/media";

/**
 * Upload images AND videos to Supabase Storage.
 *
 * Bucket `mscmedia` must allow these MIME types (Storage → bucket → allowed MIME):
 *   image/jpeg, image/png, image/webp, image/gif, image/avif,
 *   video/mp4, video/webm, video/ogg, video/quicktime
 *
 * Raise the project file-size limit (Storage settings) if clips exceed ~50MB.
 */
export const useMediaUpload = (bucketName = "mscmedia") => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const uploadMedia = async (file, folder = "") => {
    if (!file) return null;

    const validation = validateMediaFile(file);
    if (validation) {
      setError(validation);
      return null;
    }

    setUploading(true);
    setError(null);
    setProgress(8);
    setStatus(isVideoFile(file) ? "Uploading video…" : "Uploading image…");

    try {
      const fileExt = extOf(file.name) || (isVideoFile(file) ? "mp4" : "jpg");
      const safeExt = fileExt.replace(/[^a-z0-9]/gi, "") || "bin";
      const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}.${safeExt}`;

      const contentType = guessContentType(file) || file.type || "application/octet-stream";

      const tick = setInterval(() => {
        setProgress((p) => (p < 88 ? p + Math.random() * 6 : p));
      }, 280);

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType,
        });

      clearInterval(tick);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(fileName);

      setProgress(100);
      setStatus("Done");
      setUploading(false);
      return publicUrl;
    } catch (err) {
      const errorMessage = err?.message || "Failed to upload media";
      setError(errorMessage);
      setStatus("");
      setUploading(false);
      setProgress(0);
      return null;
    }
  };

  const uploadMultipleMedia = async (files, folder = "") => {
    if (!files || files.length === 0) return [];
    const urls = [];
    for (const file of Array.from(files)) {
      const url = await uploadMedia(file, folder);
      if (url) urls.push(url);
    }
    return urls;
  };

  return {
    uploading,
    progress,
    status,
    uploadMedia,
    uploadImage: uploadMedia,
    uploadMultipleMedia,
    error,
    clearError: () => setError(null),
  };
};

export default useMediaUpload;