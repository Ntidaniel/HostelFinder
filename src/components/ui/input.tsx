// src/components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  name?: string; // Add name prop
  defaultValue?: string; // Add defaultValue prop
  required?: boolean; // Add required prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, name, defaultValue, required, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
       name={name}
       defaultValue={defaultValue}
       placeholder={placeholder}
      className={`${className} border border border-gray-300 bg-white rounded-md p-2`}
      required={required}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
export { Input }