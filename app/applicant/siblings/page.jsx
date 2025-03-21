"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import NumericInput from "@/app/components/NumericInput";
import TextInput from "@/app/components/TextInput";

const Page = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Trigger validation on blur
  });

  // Use useFieldArray to dynamically manage sibling fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "siblings",
  });

  const [siblingsCount, setSiblingsCount] = useState(0);
  const [totalCharges, settotalCharges] = useState(0);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Errors:", errors);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
        style={{ width: "80vw" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Applicant's Siblings Details
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Siblings count input */}
          <NumericInput
            errors={errors}
            isRequired={true}
            placeholder="Enter the number of siblings"
            register={register}
            registerAs="siblings_Count"
            requiringCaption="Number of siblings is required"
            title="Number of siblings"
            max={10}
            length={1}
          />
          {errors?.siblings_Count && (
            <p className="text-red-500 text-sm">
              {errors.siblings_Count.message}
            </p>
          )}

          {/* Button to update sibling count */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => {
              const count = Number(watch("siblings_Count")) || 0;
              if (count <= 0) {
                alert("Please enter a valid number of siblings.");
                return;
              }
              setSiblingsCount(count);

              // Reset sibling fields based on new count
              remove(); // Clear existing siblings
              for (let i = 0; i < count; i++) {
                append({ name: "", institute: "", fee: "" });
              }
            }}
          >
            OK
          </button>

          {/* Display sibling details in rows */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-3 rounded my-2 border border-gray-300 bg-gray-50"
            >
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Sibling {index + 1}
              </h2>

              {/* Row for Name, Institute, and Fee */}
              <div className="flex flex-row gap-4">
                {/* Name Input */}
                <TextInput
                  errors={errors}
                  isRequired={true}
                  register={register}
                  registerAs={`siblings.${index}.name`}
                  requiringCaption="Sibling name is required"
                  title="Name"
                  placeholder="Enter sibling name"
                  width="w-1/3"
                />
                {errors?.siblings?.[index]?.name && (
                  <p className="text-red-500 text-sm">
                    {errors.siblings[index].name.message}
                  </p>
                )}

                {/* Institute Input */}
                <TextInput
                  errors={errors}
                  isRequired={true}
                  register={register}
                  registerAs={`siblings.${index}.institute`}
                  requiringCaption="Institute name is required"
                  title="Institute Name"
                  placeholder="Enter Institute name"
                  width="w-1/3"
                />
                {errors?.siblings?.[index]?.institute && (
                  <p className="text-red-500 text-sm">
                    {errors.siblings[index].institute.message}
                  </p>
                )}
              </div>
              {/* Fee Input */}
              <NumericInput
                errors={errors}
                isRequired={true}
                placeholder="Enter Fee per month"
                register={register}
                registerAs={`siblings.${index}.fee`}
                requiringCaption="Fee per month is required"
                title="Fee per month"
                min={0}
                max={1000000}
              />
              {errors?.siblings?.[index]?.fee && (
                <p className="text-red-500 text-sm">
                  {errors.siblings[index].fee.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Submit
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Page;
