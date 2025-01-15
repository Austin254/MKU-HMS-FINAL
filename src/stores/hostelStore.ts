import { create } from 'zustand';
import { hostels as initialHostels } from '../data/hostels';
import { Hostel, Room } from '../types';

interface HostelStore {
  hostels: Hostel[];
  addHostel: (hostel: Hostel) => void;
  updateHostel: (id: string, hostel: Hostel) => void;
  deleteHostel: (id: string) => void;
  updateRoom: (hostelId: string, roomId: string, updates: Partial<Room>) => void;
  updatePrice: (hostelId: string, newPrice: number) => void;
}

export const useHostelStore = create<HostelStore>((set) => ({
  hostels: initialHostels,
  
  addHostel: (hostel) => set((state) => ({
    hostels: [...state.hostels, hostel]
  })),
  
  updateHostel: (id, updatedHostel) => set((state) => ({
    hostels: state.hostels.map((hostel) =>
      hostel.id === id ? { ...hostel, ...updatedHostel } : hostel
    )
  })),
  
  deleteHostel: (id) => set((state) => ({
    hostels: state.hostels.filter((hostel) => hostel.id !== id)
  })),
  
  updateRoom: (hostelId, roomId, updates) => set((state) => ({
    hostels: state.hostels.map((hostel) =>
      hostel.id === hostelId
        ? {
            ...hostel,
            rooms: hostel.rooms.map((room) =>
              room.id === roomId ? { ...room, ...updates } : room
            )
          }
        : hostel
    )
  })),
  
  updatePrice: (hostelId, newPrice) => set((state) => ({
    hostels: state.hostels.map((hostel) =>
      hostel.id === hostelId
        ? { ...hostel, pricePerSemester: newPrice }
        : hostel
    )
  }))
}));