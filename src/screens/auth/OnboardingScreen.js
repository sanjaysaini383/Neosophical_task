import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
const slides = [
    {
        id: 1,
        icon: '🛒',
        title: 'Welcome to Nectar',
        description: 'Fresh groceries delivered to your doorstep in minutes',
    },
    {
        id: 2,
        icon: '⚡',
        title: 'Fast Delivery',
        description: 'Quick delivery times and real-time tracking',
    },
    {
        id: 3,
        icon: '💳',
        title: 'Easy Payments',
        description: 'Multiple payment options for your convenience',
    },
];
export const OnboardingScreen = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        else {
            navigate('/login');
        }
    };
    const handleSkip = () => {
        navigate('/login');
    };
    const slide = slides[currentSlide];
    return (_jsxs("div", { className: "h-screen flex flex-col bg-gray-100", children: [_jsxs("div", { className: "flex justify-between items-center p-6 bg-white", children: [_jsx("span", { className: "text-xl font-bold text-primary-600", children: "\uD83E\uDD55 Nectar" }), _jsx("button", { onClick: handleSkip, className: "text-primary-600 font-semibold hover:text-primary-700 text-sm", children: "Skip" })] }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 bg-cover bg-center", style: {
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%), url("https://images.unsplash.com/photo-1488459716781-6bae67b1b987?w=400&h=600&fit=crop")',
                    backgroundPosition: 'center'
                }, children: [_jsx("div", { className: "text-6xl mb-6", children: slide.icon }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-3 text-center", children: slide.title }), _jsx("p", { className: "text-base text-gray-600 text-center mb-8 max-w-sm", children: slide.description }), _jsx("div", { className: "flex gap-2 mb-12", children: slides.map((_, index) => (_jsx("button", { onClick: () => setCurrentSlide(index), className: `w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary-600 w-8' : 'bg-gray-300'}` }, index))) })] }), _jsx("div", { className: "p-6 space-y-3", children: _jsx(Button, { fullWidth: true, onClick: handleNext, size: "lg", children: currentSlide === slides.length - 1 ? 'Get Started' : 'Next' }) })] }));
};
