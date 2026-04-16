import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled = false, children, className = '', ...props }) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
    const variantStyles = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300',
        secondary: 'bg-secondary text-white hover:bg-orange-600 disabled:bg-gray-300',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-300',
        danger: 'bg-danger text-white hover:bg-red-600 disabled:bg-gray-300',
    };
    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };
    const widthStyle = fullWidth ? 'w-full' : '';
    return (_jsxs("button", { disabled: disabled || loading, className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`, ...props, children: [loading && (_jsx("span", { className: "animate-spin", children: "\u27F3" })), children] }));
};
