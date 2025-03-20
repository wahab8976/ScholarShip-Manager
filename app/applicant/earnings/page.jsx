"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";

const allFamilyRoles = [
  "Father",
  "Mother",
  "Grandfather",
  "Grandmother",
  "Brother",
  "Sister",
  "Spouse",
  "Aunt",
  "Uncle",
  "Cousin",
  "Son",
  "Daughter",
];

const restrictedRoles = ["Father", "Mother", "Grandfather", "Grandmother"];

const Page = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      familyMembers: [{ name: "", occupation: "", income: "", role: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  // Track selected roles
  const selectedRoles = watch("familyMembers")?.map((member) => member.role);

  // Load data from local storage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("familyMembers");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        setValue("familyMembers", parsedData);
      }
    }
  }, [setValue]);

  const onSubmit = (data) => {
    console.log(data.familyMembers);
    localStorage.setItem("familyMembers", JSON.stringify(data.familyMembers));
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Applicant's Family Details
        </h1>
      </div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
        style={{ width: "80vw" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          type="button"
          onClick={() =>
            append({ name: "", occupation: "", income: "", role: "" })
          }
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Family Member
        </button>

        {fields.map((member, index) => (
          <div
            key={member.id}
            className="p-2 rounded my-2 border border-gray-300 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-2.5">
                Family Member {index + 1}
              </h2>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Name */}
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register(`familyMembers.${index}.name`, {
                required: "Name is required",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter name"
            />
            {errors.familyMembers?.[index]?.name && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].name.message}
              </p>
            )}

            {/* Occupation */}
            <label className="block text-sm font-medium mt-2">Occupation</label>
            <input
              {...register(`familyMembers.${index}.occupation`, {
                required: "Occupation is required",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter occupation"
            />
            {errors.familyMembers?.[index]?.occupation && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].occupation.message}
              </p>
            )}

            {/* Income */}
            <label className="block text-sm font-medium mt-2">Income</label>
            <input
              {...register(`familyMembers.${index}.income`, {
                required: "Income is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Income must be a number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter income"
            />
            {errors.familyMembers?.[index]?.income && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].income.message}
              </p>
            )}

            {/* Family Role Dropdown */}
            <label className="block text-sm font-medium mt-2">
              Family Role
            </label>
            <select
              {...register(`familyMembers.${index}.role`, {
                required: "Role is required",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="">Select Role</option>
              {allFamilyRoles.map((role) => (
                <option
                  key={role}
                  value={role}
                  disabled={
                    restrictedRoles.includes(role) &&
                    selectedRoles.filter((r) => r === role).length > 0
                  }
                >
                  {role}
                </option>
              ))}
            </select>
            {errors.familyMembers?.[index]?.role && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].role.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Page;
