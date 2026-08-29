/** Shared media helpers for MSC Moments (images + videos). */

export const ACCEPT_MEDIA =
  "image/*,video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v,.mp4,.webm,.mov,.m4v,.ogg,.ogv";

export const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

const VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov|m4v)(?:$|\?)/i;
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|heic|svg)(?:$|\?)/i;

const MIME_BY_EXT = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  ogg: "video/ogg",
  ogv: "video/ogg",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

export function extOf(name = "") {
  const clean = String(name).split("?")[0].split("#")[0];
  return clean.split(".").pop()?.toLowerCase() || "";
}

export function isVideoUrl(url = "") {
  if (!url || typeof url !== "string") return false;
  if (url.startsWith("blob:") && /video/i.test(url)) return true;
  return VIDEO_EXT.test(url);
}

export function isImageUrl(url = "") {
  if (!url || typeof url !== "string") return false;
  return IMAGE_EXT.test(url);
}

export function isVideoFile(file) {
  if (!file) return false;
  if (file.type?.startsWith("video/")) return true;
  return VIDEO_EXT.test(file.name || "");
}

export function isImageFile(file) {
  if (!file) return false;
  if (file.type?.startsWith("image/")) return true;
  return IMAGE_EXT.test(file.name || "");
}

export function guessContentType(fileOrUrl) {
  if (fileOrUrl && typeof fileOrUrl === "object" && fileOrUrl.type) {
    return fileOrUrl.type;
  }
  const name =
    typeof fileOrUrl === "string"
      ? fileOrUrl
      : fileOrUrl?.name || "";
  return MIME_BY_EXT[extOf(name)] || "";
}

export function validateMediaFile(file) {
  if (!file) return "No file selected.";
  const video = isVideoFile(file);
  const image = isImageFile(file);
  if (!video && !image) {
    return "Please choose an image (JPG, PNG, WEBP) or a video (MP4, WEBM, MOV).";
  }
  const max = video ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > max) {
    const mb = Math.round(max / (1024 * 1024));
    return video
      ? `Video is too large (max ${mb}MB). Compress it or trim the clip.`
      : `Image is too large (max ${mb}MB).`;
  }
  return null;
}

export function formatBytes(n = 0) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}