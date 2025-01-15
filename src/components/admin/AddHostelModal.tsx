import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useHostelStore } from '../../stores/hostelStore';
import ImageUpload from '../ImageUpload';

interface AddHostelModalProps {
  onClose: () => void;
}

export default function AddHostelModal({ onClose }: AddHostelModalProps) {
  const addHostel = useHostelStore(state => state.addHostel);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    capacity: '',
    pricePerSemester: '',
    amenities: ['Wi-Fi', 'Security'],
    features: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const capacity = parseInt(formData.capacity);
    const price = parseInt(formData.pricePerSemester);

    if (isNaN(capacity) || capacity <= 0) {
      toast.error('Please enter a valid capacity');
      return;
    }

    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      addHostel({
        ...formData,
        id: Date.now().toString(),
        available: true,
        rooms: [],
        capacity,
        pricePerSemester: price
      });
      toast.success('Hostel added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add hostel');
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'capacity' | 'pricePerSemester') => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Hostel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hostel Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              required
            />
          </div>

          <ImageUpload
            onImageSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Capacity
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={formData.capacity}
                onChange={(e) => handleNumberChange(e, 'capacity')}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price per Semester (KSH)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={formData.pricePerSemester}
                onChange={(e) => handleNumberChange(e, 'pricePerSemester')}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Hostel</span>
          </button>
        </form>
      </div>
    </div>
  );
}