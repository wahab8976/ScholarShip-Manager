"use client";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import DropDown from "../components/DropDown";
import TextInput from "../components/TextInput";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const location = useLocation();
  const { familyMemberCounts } = location.state || { familyMemberCounts: 1 }; // Default to 1 to prevent errors

  useEffect(() => {
    console.log(`Family member count: ${JSON.stringify(familyMemberCounts)}`);
  }, []);
  const handleRelationshipChange = () => console.log(`Relationship changed`);

  const onSubmit = (data) => {
    console.log(`Form Data ${JSON.stringify(data)}`);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl">Family Member Details</h1>
      <div className="mb-8 w-full border-b pb-4 py-10 px-20">
        {Array.from({ length: familyMemberCounts }).map((_, index) => (
          <form onSubmit={handleSubmit(onSubmit)} key={index}>
            <h2 className="text-xl font-semibold mb-4">
              Enter Details of Family Member {index + 1}
            </h2>

            {/* Name */}
            <TextInput
              title="Name"
              registerAs={`family_members[${index + 1}].name`}
              isRequired={true}
              placeholder="Enter name"
              requiringCaption="Name is required"
              register={register}
              errors={errors}
              width="w-full"
            />

            {/* Relationship with Applicant */}
            <div className="flex justify-stretch gap-3.5">
              <DropDown
                title="Relationship with Applicant"
                registerAs={`family_members[${index + 1}].relationship`}
                isRequired={true}
                requiringCaption="Relationship is required"
                register={register}
                errors={errors}
                options={[
                  { value: "father", label: "Father" },
                  { value: "mother", label: "Mother" },
                  { value: "guardian", label: "Guardian" },
                  { value: "brother", label: "Brother" },
                  { value: "sister", label: "Sister" },
                  { value: "uncle", label: "Uncle" },
                  { value: "aunt", label: "Aunt" },
                  { value: "grandfather", label: "Grandfather" },
                  { value: "grandmother", label: "Grandmother" },
                  { value: "other", label: "Other" },
                ]}
                onChange={() => {
                  handleRelationshipChange();
                }}
              />

              {/* Marital Status  */}
              <DropDown
                title="Marital Status"
                register={register}
                registerAs={`family_members[${index + 1}].marital_status`}
                isRequired={true}
                requiringCaption="Marital status is required"
                errors={errors}
                options={[
                  { value: "married", label: "Married" },
                  { value: "single", label: "Single" },
                  { value: "divorced", label: "Divorced" },
                  { value: "widowed", label: "Widowed" },
                ]}
              />
            </div>

            {/* Remarks */}
            <TextInput
              title="Remarks"
              registerAs={`family_members[${index + 1}].remarks`}
              isRequired={false}
              placeholder="Enter remarks"
              register={register}
              errors={errors}
              width="w-full"
            />

            <input type="submit" className="bg-green-400" />
          </form>
        ))}
      </div>
    </div>
  );
};

export default Page;
