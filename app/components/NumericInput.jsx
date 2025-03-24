import React from "react";

/**
 * NumericInput Component
 *
 * @description A reusable numeric input field with validation, styling, and error handling using react-hook-form.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the input field (label).
 * @param {string} props.registerAs - The name of the input field to be registered as.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.isRequired - Whether the input is required.
 * @param {string} props.requiringCaption - Message to display when the input is required.
 * @param {Function} props.register - React Hook Form's register function.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {string} [props.width="w-full"] - CSS class for input width (default: full width).
 * @param {number} [props.min] - Minimum value allowed for the input.
 * @param {number} [props.max] - Maximum value allowed for the input.
 * @param {number} [props.length] - Exact length required for the input value (optional).
 *
 * @returns {JSX.Element} NumericInput component.
 */

const NumericInput = ({
  disabled,
  title,
  registerAs,
  placeholder,
  isRequired,
  requiringCaption,
  register,
  errors,
  width = "w-full",
  min,
  max,
  length, // Optional length prop
}) => {
  return (
    <div className={`${width} mb-6`}>
      <label
        htmlFor={registerAs}
        className="block text-gray-700 font-medium mb-2"
      >
        {title}
      </label>
      <input
        type="number"
        id={registerAs}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        min={min}
        disabled={disabled ? true : false}
        max={max}
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
          min:
            min !== undefined
              ? { value: min, message: `Value must be at least ${min}` }
              : undefined,
          max:
            max !== undefined
              ? { value: max, message: `Value cannot exceed ${max}` }
              : undefined,
          ...(length !== undefined
            ? {
                validate: (value) =>
                  value.toString().length === length ||
                  `Must be exactly ${length} characters`,
              }
            : {}),
        })}
      />
      {errors?.[registerAs] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerAs]?.message}
        </p>
      )}
    </div>
  );
};

export default NumericInput;
