import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ currentImage, onImageSelect }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [error, setError] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hostel Image
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
          >
            <X className="h-4 w-4" />
            <span>Remove</span>
          </button>
        )}
      </div>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Click to upload an image or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}