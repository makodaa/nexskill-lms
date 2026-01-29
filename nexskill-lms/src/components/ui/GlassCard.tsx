import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'light' | 'dark';
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', variant = 'dark' }) => {
    const baseStyles = "backdrop-blur-xl border rounded-2xl p-6 shadow-xl transition-all duration-300";
    const variantStyles = variant === 'dark'
        ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
        : "bg-white/40 border-white/20 text-gray-800 hover:bg-white/50";

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
