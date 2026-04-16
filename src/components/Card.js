import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, className = '', onClick }) => {
    return (_jsx("div", { className: `
        bg-white rounded-lg shadow-md p-4
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${className}
      `, onClick: onClick, children: children }));
};
export const CardHeader = ({ children, className = '' }) => {
    return (_jsx("div", { className: `font-semibold text-lg mb-3 ${className}`, children: children }));
};
export const CardBody = ({ children, className = '' }) => {
    return (_jsx("div", { className: className, children: children }));
};
export const CardFooter = ({ children, className = '' }) => {
    return (_jsx("div", { className: `border-t border-gray-200 pt-3 mt-3 ${className}`, children: children }));
};
