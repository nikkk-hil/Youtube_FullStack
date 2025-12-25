import React from "react";
import { useId, forwardRef } from "react";

const Input = forwardRef(function(
  { label, type = "text", className = "",labelClass="", ...props },
  ref
) {
    const id = useId()
  return(
    <div>
        {label && <label htmlFor={id} className={`${labelClass}`}>{label}</label>}
        <input
          id={id}
          type={type}
          className={`${className}`}
          {...props}
          ref={ref}
        />
    </div>
  )
})

export default Input
