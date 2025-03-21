import React from "react";

/**
 * TextInput Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The label for the input field
 * @param {string} props.registerAs - The name used to register the input field in react-hook-form
 * @param {string} [props.placeholder] - The placeholder text for the input field
 * @param {boolean} props.isRequired - Whether the input field is required
 * @param {string} props.requiringCaption - The message displayed when the field is required but empty
 * @param {Object} props.register - The register function from react-hook-form
 * @param {Object} props.errors - The errors object from react-hook-form
 * @param {string} [props.width] - The width class for the input field (default: "w-full")
 * @param {number} [props.minLength] - The minimum length for input validation (optional)
 * @param {number} [props.maxLength] - The maximum length for input validation (optional)
 * @returns {JSX.Element} - A text input field component
 */
const TextInput = ({
  title,
  registerAs,
  placeholder,
  isRequired,
  requiringCaption,
  register,
  errors,
  width = "w-full",
  minLength,
  maxLength,
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
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
          minLength: minLength
            ? {
                value: minLength,
                message: `Must be at least ${minLength} characters.`,
              }
            : undefined,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `Cannot exceed ${maxLength} characters.`,
              }
            : undefined,
        })}
      />
      {errors?.[registerAs]?.message && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerAs].message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
