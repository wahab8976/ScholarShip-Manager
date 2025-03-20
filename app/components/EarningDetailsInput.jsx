"use client";
import React from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";

const EarningDetailsInput = ({
  familyMemberCountNo,
  selectedFamilyMembers,
  setSelectedFamilyMembers,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRelationshipChange = (index, value) => {
    console.log(`Family Member ${index + 1} Relationship changed to: ${value}`);
    const updatedSelectedMembers = [...selectedFamilyMembers];
    updatedSelectedMembers[index] = value;
    setSelectedFamilyMembers(updatedSelectedMembers);
    setValue(`Family_Member_${index + 1}_Relationship`, value);
  };

  return (
    <div>
      {Array.from({ length: familyMemberCountNo }, (_, i) => i + 1).map(
        (memberIndex) => (
          <div key={memberIndex} className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mt-2.5">
                Enter details of Family Member {memberIndex}
              </h2>
              <button
                type="button"
                className="mt-3 cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
              >
                <img className="h-6 " src="/Trash.svg" alt="Delete a Member" />
              </button>
            </div>

            {/* Name Input */}
            <TextInput
              errors={errors}
              isRequired={true}
              placeholder="Enter name"
              register={register}
              registerAs={`Family_Member_${memberIndex}_Name`}
              requiringCaption={`Name is required for Family Member ${memberIndex}`}
              title="Name"
            />

            {/* Relationship Dropdown */}
            <div className="mb-6">
              <label
                htmlFor={`Family_Member_${memberIndex + 1}_Relationship`}
                className="block text-gray-700 font-medium mb-2"
              >
                Relationship
              </label>
              <select
                {...register(`Family_Member_${memberIndex + 1}_Relationship`, {
                  required: "Relationship is required",
                })}
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                value={selectedFamilyMembers[memberIndex] || ""}
                onChange={(e) =>
                  handleRelationshipChange(memberIndex, e.target.value)
                }
              >
                <option value="" className="text-gray-500">
                  Select Relationship
                </option>
                <option
                  disabled={selectedFamilyMembers.includes("Father")} // Disable Father option if already selected
                  value="Father"
                >
                  Father
                </option>
                <option
                  disabled={selectedFamilyMembers.includes("Mother")} // Disable Mother option if already selected
                  value="Mother"
                >
                  Mother
                </option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Spouse">Spouse</option>
                <option
                  disabled={selectedFamilyMembers.includes("Grandfather")} // Disable Grandfather option if already selected
                  value="Grandfather"
                >
                  Grandfather
                </option>
                <option
                  disabled={selectedFamilyMembers.includes("Grandmother")} // Disable Grandmother option if already selected
                  value="Grandmother"
                >
                  Grandmother
                </option>
                <option value="Uncle">Uncle</option>
                <option value="Aunt">Aunt</option>
                <option value="Cousin">Cousin</option>
                <option value="Other">Other</option>
              </select>

              {/* Error Message for Validation */}
              {errors[`Family_Member_${memberIndex + 1}_Relationship`] && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors[`Family_Member_${memberIndex + 1}_Relationship`]
                      .message
                  }
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EarningDetailsInput;
