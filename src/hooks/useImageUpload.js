import { useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Custom hook for uploading images to Supabase Storage
 * @param {string} bucketName - The name of the storage bucket (default: 'church-assets')
 * @returns {Object} - { uploading, uploadImage, error }
 */
export const useImageUpload = (bucketName = 'mscmedia') => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file, folder = '') => {
    if (!file) return null;

    setUploading(true);
    setError(null);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      setUploading(false);
      return publicUrl;
    } catch (err) {
      const errorMessage = err.message || 'Failed to upload image';
      setError(errorMessage);
      setUploading(false);
      return null;
    }
  };

  const uploadMultipleImages = async (files, folder = '') => {
    if (!files || files.length === 0) return [];

    const uploadPromises = Array.from(files).map((file) =>
      uploadImage(file, folder)
    );

    const results = await Promise.all(uploadPromises);
    return results.filter((url) => url !== null);
  };

  return {
    uploading,
    uploadImage,
    uploadMultipleImages,
    error,
    clearError: () => setError(null),
  };
};

export default useImageUpload;
