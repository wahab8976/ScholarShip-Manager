import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import NumericInput from "../components/NumericInput";
import TextInput from "../components/TextInput";
import DropDown from "../components/DropDown";

const FamilyMemberDetails = ({ count }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitting data:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Dynamically Render Family Member Forms */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4">
            Enter Details of Family Member {count}
          </h2>

          {/* Name  */}
          <TextInput
            title="Name"
            registerAs={`family_members[${count}].name`}
            isRequired={true}
            placeholder="Enter name"
            requiringCaption="Name is required"
            register={register}
            errors={errors}
            width="w-full"
          />

          <div className="flex justify-stretch gap-3.5">
            {/* Relationship with Applicant */}
            <DropDown
              title="Relationship with Applicant"
              registerAs={`family_members[${count}].relationship`}
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
            />

            {/* Marital Status  */}
            <DropDown
              title="Marital Status"
              register={register}
              registerAs={`family_members[${count}].marital_status`}
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
            registerAs={`family_members[${count}].remarks`}
            isRequired={false}
            placeholder="Enter remarks"
            register={register}
            errors={errors}
            width="w-full"
          />

        </div>
      </motion.form>
    </div>
  );
};

export default FamilyMemberDetails;
