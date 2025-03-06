import React from "react";

const NumericInput = ({
  title,
  registerAs,
  placeholder,
  isRequired,
  requiringCaption,
  register,
  errors,
  width,
  min,
  max,
  length,
  lengthCaption,
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
        type="number"
        id={registerAs}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        min={min}
        max={max}
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
          min:
            min !== undefined
              ? { value: min, message: "Value cannot be negative" }
              : undefined,
          max:
            max !== undefined
              ? { value: max, message: lengthCaption }
              : undefined,
          validate: (value) =>
            value.toString().length === length ||
            `Must be exactly ${length} characters`,
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
