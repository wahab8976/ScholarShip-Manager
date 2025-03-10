import React from "react";

/**
 * DropDown Component
 *
 * @description A reusable dropdown (select) component that integrates with react-hook-form.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title (label) of the dropdown.
 * @param {string} props.registerAs - The name of the dropdown field for form registration.
 * @param {boolean} [props.isRequired=false] - Whether the dropdown selection is required.
 * @param {string} [props.requiringCaption] - Error message when required validation fails.
 * @param {Function} props.register - The register function from react-hook-form.
 * @param {Object} props.errors - The errors object from react-hook-form.
 * @param {Array<{ value: string, label: string }>} props.options - The dropdown options.
 * @param {string} [props.width="w-full"] - The width of the dropdown (default: full width).
 *
 * @returns {JSX.Element} A dropdown component with validation support.
 */

const DropDown = ({
  title,
  registerAs,
  isRequired = false,
  requiringCaption,
  register,
  errors,
  options = [],
  width = "w-full",
}) => {
  return (
    <div className={`${width} mb-6`}>
      <label
        htmlFor={registerAs}
        className="block text-gray-700 font-medium mb-2"
      >
        {title}
      </label>
      <select
        id={registerAs}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
        })}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.[registerAs] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerAs]?.message}
        </p>
      )}
    </div>
  );
};

export default DropDown;
