import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, error, helperText, className = '', ...props }) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: label })), _jsx("input", { className: `
          w-full px-4 py-3 rounded-lg border-2 border-gray-200
          focus:border-primary-600 focus:outline-none transition-colors
          placeholder-gray-400 text-gray-900
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-danger' : ''}
          ${className}
        `, ...props }), error && (_jsx("p", { className: "text-danger text-sm mt-1", children: error })), helperText && !error && (_jsx("p", { className: "text-gray-500 text-sm mt-1", children: helperText }))] }));
};
