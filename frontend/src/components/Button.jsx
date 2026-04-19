import React from 'react'

function Button({
    children,
    type='button',
    variant = 'primary',
    bgColor,
    textColor,
    disabled = false,
    disable = false,
    className = '',
    ...props
}) {
  const variantStyles = {
    primary:
      'bg-red-500 text-white hover:bg-red-400 active:bg-red-600 shadow-lg shadow-red-500/25',
    secondary:
      'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-900',
    ghost:
      'bg-transparent text-zinc-200 hover:bg-zinc-800/70 border border-zinc-700/80',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 shadow-lg shadow-rose-600/30',
  };

  const hasCustomColors = bgColor !== undefined || textColor !== undefined;
  const paletteClass = hasCustomColors
    ? `${bgColor ?? ''} ${textColor ?? ''}`
    : variantStyles[variant] || variantStyles.primary;

  const isDisabled = disabled || disable;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55 ${paletteClass} ${className}`}
      {...props}
    >
        { children }
    </button>
  )
}

export default Button