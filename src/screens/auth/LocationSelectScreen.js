import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';
import { mockLocations } from '../../data/mockLocations';
export const LocationSelectScreen = () => {
    const navigate = useNavigate();
    const { addLocation, setSelectedLocation } = useLocationStore();
    const { setUser, setAuthenticated } = useAuthStore();
    const [selectedId, setSelectedId] = useState(mockLocations[0].id);
    const [loading, setLoading] = useState(false);
    const handleSelect = (locationId) => {
        setSelectedId(locationId);
    };
    const handleContinue = async () => {
        const selected = mockLocations.find((loc) => loc.id === selectedId);
        if (!selected)
            return;
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
    return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col", children: [_jsx("button", { onClick: () => navigate('/login'), className: "p-6 text-gray-700", children: "\u2190 Back" }), _jsxs("div", { className: "flex-1 px-6 flex flex-col justify-between pb-20 md:pb-0", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Select Location" }), _jsx("p", { className: "text-gray-600", children: "Choose your delivery location" })] }), _jsx("div", { className: "space-y-3 flex-1", children: mockLocations.map((location) => (_jsx("button", { onClick: () => handleSelect(location.id), className: `
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${selectedId === location.id
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'}
              `, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-1", children: selectedId === location.id ? (_jsx("div", { className: "w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center", children: _jsx("span", { className: "text-white text-sm", children: "\u2713" }) })) : (_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-gray-300" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: location.name }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: location.address })] })] }) }, location.id))) }), _jsx(Button, { fullWidth: true, size: "lg", loading: loading, onClick: handleContinue, children: "Continue" })] })] }));
};
