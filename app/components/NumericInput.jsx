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
  minLength,
  maxLength,
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
        type="text"
        id={registerAs}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        {...register(registerAs, {
          required: isRequired
            ? { value: true, message: requiringCaption }
            : false,
          minLength: minLength
            ? { value: minLength, message: lengthCaption }
            : undefined,
          maxLength: maxLength
            ? { value: maxLength, message: lengthCaption }
            : undefined,
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contain numbers",
          },
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
