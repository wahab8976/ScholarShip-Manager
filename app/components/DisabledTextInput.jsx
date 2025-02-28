import React from "react";

const DisabledTextInput = ({
  title,
  registerAs,
  placeholder,
  isRequired,
  requiringCaption,
  register,
  errors,
  isDisabled, // Controls whether the input should be disabled
  width,
}) => {
  return (
    <div className={`${width ? width : "w-full"} mb-6`}>
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
