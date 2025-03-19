"use client";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/TextInput";
import NumericInput from "@/app/components/NumericInput";
import DropDown from "@/app/components/DropDown";

/**
 * FamilyDetails Component
 *
 * @description This component manages family details, including member count, relationships, marital status, and study status.
 * It retrieves data from Local Storage and ensures valid selections.
 *
 * @state {string} error - Holds an error message if any.
 * @state {number} familyMemberCount - Number of family members, retrieved from Local Storage (stored in Basic Information).
 * @state {Array} selectedFamilyMembers - Selected relationship for each family member. Used to prevent duplicate relationships.
 * @state {string} maritalStatus - The selected marital status.
 * @state {number} memberStudying - Number of family members currently studying. Used in the next step for additional details.
 * @state {boolean} loading - Indicates whether the form is currently submitting.
 *
 * @returns {JSX.Element} The FamilyDetails component.
 */

const Page = () => {
  const [error, setError] = useState(null);
  const [familyMemberCount, setFamilyMemberCount] = useState(0);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [memberStudying, setMemberStudying] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const basicDetail = JSON.parse(
      localStorage.getItem("Applicant's Basic Information")
    );

    console.log(`Form Data is ${JSON.stringify(basicDetail)}`);

    const { family_members_count } = basicDetail;
    if (!family_members_count || family_members_count === 0) {
      setError("Please fill the basic information first");
    } else {
      setFamilyMemberCount(family_members_count);
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("Applicant's Family Details");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  const onSubmit = (data) => {
    console.log(`Data is ${JSON.stringify(data)}`);
    localStorage.setItem("Applicant's Family Details", JSON.stringify(data));
    router.push("/applicant/earnings");
  };

  // Handle relationship selection
  const handleRelationshipChange = (index, value) => {
    console.log(`Family Member ${index + 1} Relationship changed to: ${value}`);

    // Update state and form field
    const updatedSelectedMembers = [...selectedFamilyMembers];
    updatedSelectedMembers[index] = value;

    setSelectedFamilyMembers(updatedSelectedMembers);
    setValue(`Family_Member_${index + 1}_Relationship`, value);
  };

  // Handle Marital Status Change
  const handleMaritalStatusChange = (value) => {
    setMaritalStatus(value);
    setValue("marital_status", value);
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
            Applicant's Family Details
          </h1>
        </div>

        {Array.from({ length: familyMemberCount }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold mt-2.5">
              Enter details of Family Member {index + 1}
            </h2>

            {/* Name Input */}
            <TextInput
              title="Name"
              register={register}
              registerAs={`Family_Member_${index + 1}_Name`}
              isRequired={true}
              requiringCaption={`Name is required for Family Member ${
                index + 1
              }`}
              errors={errors}
              placeholder="Enter name"
            />

            {/* Relationship Dropdown with Validation */}
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
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                value={selectedFamilyMembers[index] || ""}
                onChange={(e) =>
                  handleRelationshipChange(index, e.target.value)
                }
              >
                <option value="" className="text-gray-500">
                  Select Relationship
                </option>
                <option
                  value="Father"
                  disabled={selectedFamilyMembers.includes("Father")}
                >
                  Father
                </option>
                <option
                  value="Mother"
                  disabled={selectedFamilyMembers.includes("Mother")}
                >
                  Mother
                </option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Spouse">Spouse</option>
                <option
                  value="Grandfather"
                  disabled={selectedFamilyMembers.includes("Grandfather")}
                >
                  Grandfather
                </option>
                <option
                  value="Grandmother"
                  disabled={selectedFamilyMembers.includes("Grandmother")}
                >
                  Grandmother
                </option>
                <option value="Uncle">Uncle</option>
                <option value="Aunt">Aunt</option>
                <option value="Cousin">Cousin</option>
                <option value="Other">Other</option>
              </select>

              {/* Members Currently Studying  */}

              {/* Error Message for Validation */}
              {errors[`Family_Member_${index + 1}_Relationship`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`Family_Member_${index + 1}_Relationship`].message}
                </p>
              )}
            </div>

            {/* Marital Status Dropdown  */}
            <DropDown
              errors={errors}
              register={register}
              title="Marital Status"
              registerAs={`Family_Member_${index + 1}_Marital_Status`}
              isRequired={true}
              requiringCaption="Marital Status is required"
              options={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
                { label: "Divorced", value: "Divorced" },
                { label: "Widowed", value: "Widowed" },
              ]}
            />

            {/* Remarks by each Family Member  */}
            <TextInput
              errors={errors}
              title="Remarks"
              register={register}
              registerAs={`Family_Member_${index + 1}_Remarks`}
              isRequired={false}
              placeholder="Enter remarks"
            />
          </div>
        ))}

        {/* Members Currently Studying  */}
        <NumericInput
          title="How many members are currently studying?"
          register={register}
          registerAs="members_studying"
          isRequired={true}
          requiringCaption="Please enter the number of members currently studying"
          errors={errors}
          min={0}
          max={familyMemberCount}
          lengthCaption="Please enter valid Count"
          placeholder={`Enter number of members studying`}
          length={1}
        />

        <div className="flex justify-center gap-5">
          {/* Continue Button */}
          <motion.button
            type="submit"
            className={`w-auto px-5 py-3 rounded-lg transition duration-300 
      ${
        loading
          ? "bg-green-300 text-green-700 cursor-not-allowed "
          : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
      }
    `}
            whileHover={loading ? {} : { scale: 1.05 }}
            whileTap={loading ? {} : { scale: 0.95 }}
            disabled={loading}
          >
            Save and Continue
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Page;
