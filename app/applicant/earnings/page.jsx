"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
      familyMembers: [
        {
          name: "",
          occupation: "",
          jobDesignation: "",
          organization: "",
          income: "",
          role: "",
        },
      ],
    },
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const selectedRoles = watch("familyMembers")?.map((member) => member.role);

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
          Applicant's Family Earning Details
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
            append({
              name: "",
              occupation: "",
              jobDesignation: "",
              organization: "",
              income: "",
              role: "",
            })
          }
          className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add
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
                  className="cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm p-2 text-center me-2 mb-2"
                >
                  <img
                    className="h-6"
                    src="/Trash.svg"
                    alt="Delete Family Member"
                  />
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

            {/* Job Designation */}
            <label className="block text-sm font-medium mt-2">
              Job Designation
            </label>
            <input
              {...register(`familyMembers.${index}.jobDesignation`, {
                required: "Job Designation is required",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter job designation"
            />
            {errors.familyMembers?.[index]?.jobDesignation && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].jobDesignation.message}
              </p>
            )}

            {/* Organization */}
            <label className="block text-sm font-medium mt-2">
              Organization
            </label>
            <input
              {...register(`familyMembers.${index}.organization`, {
                required: "Organization is required",
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter organization name"
            />
            {errors.familyMembers?.[index]?.organization && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers[index].organization.message}
              </p>
            )}

            {/* Income */}
            <label className="block text-sm font-medium mt-2">
              Income in Rs.
            </label>
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
          onClick={() => router.push("/applicant/siblings")}
          type="submit"
          className="cursor-pointer text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Page;
