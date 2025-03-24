"use client";
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import TextInput from "@/app/components/TextInput";
import NumericInput from "@/app/components/NumericInput";
import { useState, useEffect } from "react";
import DisabledTextInput from "@/app/components/DisabledTextInput";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [supportingPerson, setSupportingPerson] = useState(true);
  const router = useRouter();

  const onSubmit = (data) => {
    localStorage.setItem("fatherDetails", JSON.stringify(data));
    router.push("/applicant/declare-assets");
    console.log(data);
  };

  useEffect(() => {
    const storedDetails = localStorage.getItem("fatherDetails");
    if (storedDetails) {
      const fatherDetails = JSON.parse(storedDetails);
      console.log(fatherDetails);

      // Populate form fields with stored data
      Object.keys(fatherDetails).forEach((key) => {
        setValue(key, fatherDetails[key]);
      });
    }
  }, [setValue]);

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
            Applicant's Father Details
          </h1>
        </div>

        <div className="flex flex-row gap-4">
          {/* Father's Name Input */}
          <TextInput
            title="16. Father's Name"
            errors={errors}
            placeholder="Enter father's name"
            registerAs="Father_Name"
            isRequired={true}
            requiringCaption="Father's name is required"
            register={register}
            width="w-1/2"
          />

          {/* Father's CNIC Input */}
          <NumericInput
            title=" Father's CNIC"
            isRequired={true}
            errors={errors}
            register={register}
            registerAs="Father_CNIC"
            requiringCaption="Father's CNIC is required"
            width="w-1/2"
            placeholder="Enter Father's CNIC"
            length={13}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Father's Status Dropdown */}
          <div className="w-1/2">
            <label
              htmlFor="Status"
              className="block text-gray-700 font-medium mb-2"
            >
              17. Father's Status
            </label>
            <select
              {...register("Status", { required: "Status is required" })}
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Status</option>
              <option value="Alive">Alive</option>
              <option value="Deceased">Deceased</option>
              <option value="Separate">Separate</option> {/* Fixed spelling */}
            </select>
            {errors.Status && (
              <p className="text-red-500 text-sm">{errors.Status.message}</p>
            )}
          </div>

          {/* Professional Status DropDown    */}
          <div className="w-1/2">
            <label
              htmlFor="Status"
              className="block text-gray-700 font-medium mb-2"
            >
              18. Professional Status
            </label>
            <select
              {...register("Professional_Status", {
                required: "Professional Status is required",
              })}
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Professional Status</option>
              <option value="Alive">Employed</option>
              <option value="Deceased">Retired</option>
              <option value="Separate">Business Owner</option>
            </select>
            {errors.Status && (
              <p className="text-red-500 text-sm">{errors.Status.message}</p>
            )}
          </div>
        </div>

        {/* Company Name Input */}
        <div className="mt-6">
          <TextInput
            title="19. Name of Company/Employer"
            isRequired={true}
            register={register}
            registerAs="Company_Name"
            requiringCaption="Company Name is required"
            placeholder="Enter Company Name"
            errors={errors}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Telephone Number Input */}
          <NumericInput
            title="20. Telephone Number (Office)"
            register={register}
            registerAs="Telephone_Number"
            placeholder="Enter Telephone Number"
            width="w-1/2"
            min={0}
          />

          {/* Phone Number Input */}
          <NumericInput
            title="Phone Number (Residence)"
            isRequired={true}
            errors={errors}
            register={register}
            registerAs="Phone_Number"
            requiringCaption="Phone Number is required"
            placeholder="Enter Phone Number"
            width="w-1/2"
            min={0}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Occupation Type Input */}
          <TextInput
            title="21. Occupation Type"
            isRequired={true}
            registerAs="Occupation_Type"
            errors={errors}
            requiringCaption="Occupation Type is required"
            placeholder="Enter Occupation Type"
            register={register}
            width="w-1/2"
          />

          {/* NTN Input */}
          <NumericInput
            title="NTN"
            register={register}
            registerAs="NTN"
            placeholder="Enter NTN"
            width="w-1/2"
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Designation & Grade (BPS/SPS/PTC) */}
          <TextInput
            title="22. Designation & Grade (BPS/SPS/PTC)"
            errors={errors}
            register={register}
            placeholder="Enter Designation & Grade"
            registerAs="Designation"
          />

          {/* Gross Monthly Income Input */}
          <NumericInput
            title="Gross Monthly Income"
            errors={errors}
            isRequired={true}
            register={register}
            registerAs="Gross_Monthly_Income"
            requiringCaption="Gross Monthly Income is required"
            placeholder="Enter Gross Monthly Income"
            min={0}
          />
        </div>

        <div className="flex flex-row gap-4">
          <NumericInput
            title="23. Total Net Income (Salary/Pension/Others)"
            isRequired={true}
            errors={errors}
            register={register}
            registerAs="Total_Net_Income"
            requiringCaption="Total Net Income is required"
            placeholder="Enter Total Net Income"
            min={0}
            width="w-1/2"
          />
        </div>

        <div className="text-xl font-semibold flex justify-center items-center mb-4">
          <h2>Any other Supporting Person</h2>
        </div>
        <div className="flex flex-row gap-4">
          {/* Supporting Person Name Input */}
          <DisabledTextInput
            title="24. Name"
            errors={errors}
            isRequired={supportingPerson}
            register={register}
            registerAs="Supporting_Person_Name"
            requiringCaption="Supporting Person Name is required"
            placeholder="Enter Supporting Person Name"
            width="w-1/2"
            isDisabled={!supportingPerson}
          />
          {/* RelationShip DropDown  */}
          <div className="w-1/2">
            <label
              htmlFor="RelationShip"
              className="block text-gray-700 font-medium mb-2"
            >
              25. RelationShip
            </label>
            <select
              {...register("Supporting_Person")}
              onChange={(e) => setSupportingPerson(e.target.value !== "")}
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Mother">Mother</option>
              <option value="">None</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Other">Other</option>
            </select>

            {errors.Supporting_Person && (
              <p className="text-red-500 text-sm">
                {errors.Supporting_Person.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <DisabledTextInput
            title="Occupation and Designation"
            register={register}
            registerAs="Supporting_Person_Occupation"
            errors={errors}
            isRequired={supportingPerson}
            requiringCaption="Occupation and Designation is required"
            placeholder="Enter Occupation and Designation"
            width="w-1/2"
            isDisabled={!supportingPerson}
          />

          <NumericInput
            title="Monthly Income"
            register={register}
            registerAs="Supporting_Person_Monthly_Income"
            errors={errors}
            isRequired={supportingPerson}
            requiringCaption="Monthly Income is required"
            placeholder="Enter Monthly Income"
            min={0}
            width="w-1/2"
            disabled={!supportingPerson}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Page;
