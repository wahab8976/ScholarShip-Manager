"use client";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/TextInput";
import DropDown from "@/app/components/DropDown";

const Page = () => {
  const [error, setError] = useState(null);
  const [family_members_count, setFamily_members_count] = useState(0);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
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
    if (!family_members_count || family_members_count === 0)
    {
      setError("Please fill the basic information first");
    } else {
      setFamily_members_count(family_members_count);
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
          <h1 className="text-3xl font-bold">Applicant's Family Details</h1>
        </div>

        {Array.from({ length: family_members_count }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <h2>Enter details of Family Member {index + 1}</h2>

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
