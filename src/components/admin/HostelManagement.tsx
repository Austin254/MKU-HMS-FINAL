import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus, Download } from 'lucide-react';
import { useHostelStore } from '../../stores/hostelStore';
import { toast } from 'react-hot-toast';
import AddHostelModal from './AddHostelModal';
import EditHostelModal from './EditHostelModal';
import { Hostel } from '../../types';

export default function HostelManagement() {
  const { hostels, deleteHostel } = useHostelStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);

  const handleDelete = (hostelId: string) => {
    if (window.confirm('Are you sure you want to delete this hostel?')) {
      deleteHostel(hostelId);
      toast.success('Hostel deleted successfully');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Hostel Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Add Hostel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {hostels.map((hostel) => (
          <motion.div
            key={hostel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg dark:text-white">{hostel.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{hostel.description}</p>
                  <p className="text-blue-900 dark:text-blue-400 font-semibold mt-2">
                    KSH {hostel.pricePerSemester.toLocaleString()} per semester
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingHostel(hostel)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(hostel.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showAddModal && (
        <AddHostelModal onClose={() => setShowAddModal(false)} />
      )}

      {editingHostel && (
        <EditHostelModal
          hostel={editingHostel}
          onClose={() => setEditingHostel(null)}
        />
      )}
    </div>
  );
}