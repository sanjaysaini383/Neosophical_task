import { create } from 'zustand';
export const useLocationStore = create((set) => ({
    locations: [],
    selectedLocation: null,
    addLocation: (location) => set((state) => {
        const updatedLocations = location.isDefault
            ? state.locations.map((loc) => ({ ...loc, isDefault: false }))
            : state.locations;
        return {
            locations: [...updatedLocations, location],
            selectedLocation: location.isDefault || !state.selectedLocation ? location : state.selectedLocation,
        };
    }),
    setSelectedLocation: (location) => set({ selectedLocation: location }),
    removeLocation: (locationId) => set((state) => ({
        locations: state.locations.filter((loc) => loc.id !== locationId),
        selectedLocation: state.selectedLocation?.id === locationId ? null : state.selectedLocation,
    })),
}));
