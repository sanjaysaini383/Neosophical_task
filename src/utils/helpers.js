// Debounce utility
export const debounce = (func, wait) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, wait);
    };
};
// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};
// Simulate API delay
export const simulateDelay = (ms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
// Get initials from name
export const getInitials = (name) => {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase();
};
// Validate email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
// Validate phone number
export const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
};
// Generate random ID
export const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
};
// Truncate text
export const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};
// Calculate discount
export const calculateDiscount = (price, discount) => {
    return price - (price * discount) / 100;
};
// Get discount percentage text
export const getDiscountText = (discount) => {
    return discount ? `${discount}% OFF` : '';
};
