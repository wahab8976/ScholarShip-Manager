import React from "react";

const DropDown = ({
  title,
  registerAs,
  isRequired,
  requiringCaption,
  register,
  errors,
  options,
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
