
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-5 py-2.5 text-sm font-medium rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ease-in-out disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-800 disabled:bg-cyan-900/50 disabled:text-slate-400",
    secondary: "text-slate-200 bg-slate-700 hover:bg-slate-600 focus:ring-slate-500 disabled:bg-slate-800 disabled:text-slate-500 border border-slate-600",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
