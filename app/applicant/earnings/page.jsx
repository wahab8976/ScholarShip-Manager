"use client";
import React, { useState } from "react";
import TextInput from "@/app/components/TextInput";
import { useForm } from "react-hook-form";

const EarningDetailsInput = () => {
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, relationship: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { id: familyMembers.length + 1, relationship: "" },
    ]);
  };

  const handleRemoveMember = (id) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
  };

  const selectedRelationships = familyMembers.map(
    (member) => member.relationship
  );

  return (
    <form
      onSubmit={handleSubmit((data) => console.log("Form Data:", data))}
      className="p-4"
    >
      {familyMembers.map((member, index) => (
        <div
          key={member.id}
          className="mb-4 p-4 border rounded-lg shadow-md bg-white"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Family Member {index + 1}</h2>
            {familyMembers.length > 1 && (
              <button
                type="button"
                className="cursor-pointer text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                onClick={() => handleRemoveMember(member.id)}
              >
                <img className="h-6" src="/Trash.svg" alt="Delete" />
              </button>
            )}
          </div>

          {/* Name Input */}
          <TextInput
            errors={errors}
            isRequired={true}
            placeholder="Enter name"
            register={register}
            registerAs={`Family_Member_${index + 1}_Name`}
            requiringCaption={`Name is required for Family Member ${index + 1}`}
            title="Name"
          />

          {/* Relationship Dropdown */}
          <div className="mb-6">
            <label
              htmlFor={`Family_Member_${index + 1}_Relationship`}
              className="block text-gray-700 font-medium mb-2"
            >
              Relationship
            </label>
            <select
              {...register(`Family_Member_${index + 1}_Relationship`, {
                required: "Relationship is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="" className="text-gray-500">
                Select Relationship
              </option>
              <option
                disabled={selectedRelationships.includes("Father")}
                value="Father"
              >
                Father
              </option>
              <option
                disabled={selectedRelationships.includes("Mother")}
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
                disabled={selectedRelationships.includes("Grandfather")}
                value="Grandfather"
              >
                Grandfather
              </option>
              <option disabled={true} value="Grandmother">
                Grandmother
              </option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Cousin">Cousin</option>
              <option value="Other">Other</option>
            </select>

            {errors?.[`Family_Member_${index + 1}_Relationship`]?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`Family_Member_${index + 1}_Relationship`].message}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Add Member Button */}
      <button
        type="button"
        className="w-full text-white bg-green-500 hover:bg-green-600 p-3 rounded-lg flex justify-center items-center"
        onClick={handleAddMember}
      >
        <img className="h-6 mr-2" src="/Add.png" alt="Add" />
        Add Family Member
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default EarningDetailsInput;
