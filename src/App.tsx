import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Auth Screens
import {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  SignUpScreen,
  VerificationScreen,
  LocationSelectScreen,
} from './screens/auth';

// App Screens
import {
  HomeScreen,
  SearchScreen,
  ProductDetailScreen,
  CartScreen,
  FavoritesScreen,
  AccountScreen,
  CheckoutScreen,
  OrderSuccessScreen,
  OrderFailureScreen,
} from './screens/app';

// Components
import { BottomNavigation } from './components';

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🌾</div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/splash" replace />;
  }

  return <>{children}</>;
};

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <>
          <Routes>
            {/* Auth Routes */}
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/verification" element={<VerificationScreen />} />
            <Route path="/location-select" element={<LocationSelectScreen />} />

            {/* Root - Redirect to splash */}
            <Route path="/" element={<Navigate to="/splash" replace />} />

            {/* App Routes - Protected */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <SearchScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetailScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccessScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-failure"
              element={
                <ProtectedRoute>
                  <OrderFailureScreen />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/splash" replace />} />
          </Routes>

          {/* Bottom Navigation - Only shown on protected routes */}
          <BottomNavigation />
        </>
      </Suspense>
    </Router>
  );
};

export default App;
