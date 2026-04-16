import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

interface Slide {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
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

export const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white">
        <span className="text-xl font-bold text-primary-600">🥕 Nectar</span>
        <button
          onClick={handleSkip}
          className="text-primary-600 font-semibold hover:text-primary-700 text-sm"
        >
          Skip
        </button>
      </div>

      {/* Content with background image effect */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 bg-cover bg-center" style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%), url("https://images.unsplash.com/photo-1488459716781-6bae67b1b987?w=400&h=600&fit=crop")',
        backgroundPosition: 'center'
      }}>
        <div className="text-6xl mb-6">{slide.icon}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          {slide.title}
        </h1>
        <p className="text-base text-gray-600 text-center mb-8 max-w-sm">
          {slide.description}
        </p>

        {/* Dots Indicator */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 space-y-3">
        <Button fullWidth onClick={handleNext} size="lg">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
