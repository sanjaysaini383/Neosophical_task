import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';
import { mockLocations } from '../../data/mockLocations';

export const LocationSelectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addLocation, setSelectedLocation } = useLocationStore();
  const { setUser, setAuthenticated } = useAuthStore();
  const [selectedId, setSelectedId] = useState<string | null>(mockLocations[0].id);
  const [loading, setLoading] = useState(false);

  const handleSelect = (locationId: string) => {
    setSelectedId(locationId);
  };

  const handleContinue = async () => {
    const selected = mockLocations.find((loc) => loc.id === selectedId);
    if (!selected) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add locations to store
    mockLocations.forEach((location) => {
      addLocation(location);
    });

    // Set selected location
    setSelectedLocation(selected);

    // Set user as authenticated
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: selected.address,
      city: selected.name,
      createdAt: new Date(),
    };

    setUser(user);
    setAuthenticated(true);

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <button
        onClick={() => navigate('/login')}
        className="p-6 text-gray-700"
      >
        ← Back
      </button>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col justify-between pb-20 md:pb-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Location</h1>
          <p className="text-gray-600">Choose your delivery location</p>
        </div>

        {/* Location List */}
        <div className="space-y-3 flex-1">
          {mockLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelect(location.id)}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${selectedId === location.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {selectedId === location.id ? (
                    <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Button */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
