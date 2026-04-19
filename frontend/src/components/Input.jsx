import React from "react";
import { useId, forwardRef } from "react";

const Input = forwardRef(function(
  { label, type = "text", className = "",labelClass="", ...props },
  ref
) {
    const id = useId();
  return(
    <div className="w-full">
        {label && <label htmlFor={id} className={`mb-1 block text-sm font-medium text-zinc-300 ${labelClass}`}>{label}</label>}
        <input
          id={id}
          type={type}
          className={`w-full rounded-xl border border-zinc-700/80 bg-zinc-950/85 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition ${className}`}
          {...props}
          ref={ref}
        />
    </div>
  )
})

export default Input
