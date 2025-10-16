"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  candidate: { id: string; name: string };
  onClose: () => void;
  onUpload: () => void;
}

const ImageUploadModal = ({ candidate, onClose, onUpload }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = async () => {
    if (!imageFile) {
      setMessage('Please select an image file.');
      return;
    }

    setIsUploading(true);
    setMessage('');

    const fileName = `${candidate.id}-${Date.now()}`;
    const { error: uploadError } = await supabase.storage
        .from('candidate_images')
        .upload(fileName, imageFile);

    if (uploadError) {
        setMessage(`Error uploading image: ${uploadError.message}`);
        setIsUploading(false);
        return;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('candidate_images')
        .getPublicUrl(fileName);

    await supabase
        .from('candidates')
        .update({ image_url: publicUrl })
        .eq('id', candidate.id);

    setIsUploading(false);
    onUpload();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Upload Image for {candidate.name}</h2>
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 mb-4 border rounded"
          />
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <div className="flex justify-end gap-4">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button
              onClick={handleImageUpload}
              className="bg-miac-green text-white px-6 py-2 rounded-lg"
              disabled={isUploading || !imageFile}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageUploadModal;