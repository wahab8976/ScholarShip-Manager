import React from "react";

/**
 * DisabledTextInput Component
 *
 * @description A reusable text input field that can be disabled and integrates with react-hook-form for validation.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title (label) of the input field.
 * @param {string} props.registerAs - The name of the input field to be registered as.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} [props.isRequired=false] - Whether the input is required.
 * @param {string} [props.requiringCaption] - The message to display if the field is required but left empty.
 * @param {Function} props.register - The register function from react-hook-form.
 * @param {Object} props.errors - The errors object from react-hook-form.
 * @param {boolean} [props.isDisabled=false] - Whether the input should be disabled.
 * @param {string} [props.width="w-full"] - The width of the input field (default: full width).
 *
 * @returns {JSX.Element} A disabled or enabled text input field with validation support.
 */

const DisabledTextInput = ({
  title,
  registerAs,
  placeholder,
  isRequired = false,
  requiringCaption,
  register,
  errors,
  isDisabled = false, // Default value set to false
  width = "w-full", // Default width is full
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
        type="text"
        id={registerAs}
        placeholder={placeholder}
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
        })}
        disabled={isDisabled} // Disable input dynamically
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
          !isDisabled
            ? "text-gray-800 border-gray-300 focus:ring-green-500"
            : "text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed"
        }`}
      />
      {errors?.[registerAs] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerAs]?.message}
        </p>
      )}
    </div>
  );
};

export default DisabledTextInput;
