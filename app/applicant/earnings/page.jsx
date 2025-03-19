"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DropDown from "@/app/components/DropDown";
import TextInput from "@/app/components/TextInput";
import NumericInput from "@/app/components/NumericInput";
import DisabledTextInput from "@/app/components/DisabledTextInput";
import { useRouter } from "next/navigation";

const page = () => {
  const [familyMemberCount, setFamilyMemberCount] = useState(2);
  const [selectedMembers, setselectedMembers] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Applicant's Family Earning Details
        </h2>

        <h2 className="text-xl font-semibold mt-2.5">
          Enter details of Family Member {familyMemberCount}
        </h2>

        {/* Name Input */}
        <TextInput
          errors={errors}
          isRequired={true}
          placeholder="Enter name"
          register={register}
          registerAs={`Family_Member_${familyMemberCount}_Name`}
          requiringCaption={`Name is required for Family Member ${familyMemberCount}`}
          title="Name"
        />

        <DropDown
          errors={errors}
          register={register}
          registerAs="Family_Member_Relationship"
          title="Relationship"
          options={[
            { value: "Father", label: "Father" },
            { value: "Mother", label: "Mother" },
            { value: "Spouse", label: "Spouse" },
            { value: "Other", label: "Other" },
          ]}
        />

        <button type="submit">Submit</button>
      </motion.form>
    </div>
  );
};

export default page;
