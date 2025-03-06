"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DropDown from "@/app/components/DropDown";
import TextInput from "@/app/components/TextInput";
import NumericInput from "@/app/components/NumericInput";
import DisabledTextInput from "@/app/components/DisabledTextInput";
import { useRouter } from "next/navigation";

export default function BasicInfo() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const employmentStatus = watch("employeement_status");
  const [isUnEmployed, setIsUnEmployed] = useState(employmentStatus === "true");
  const router = useRouter();

  useEffect(() => {
    setIsUnEmployed(employmentStatus === "true"); // Convert string to boolean
  }, [employmentStatus]);

  // Load saved data from localStorage on page load
  useEffect(() => {
    const savedData = localStorage.getItem("Applicant's Basic Information");
    if (savedData) {
      reset(JSON.parse(savedData)); // Use reset instead of setFormData
    }
  }, [reset]);

  // Save form data on submit
  const onSubmit = (data) => {
    //If user is unEmployed, remove the disabled inputs from the data and Flag them as unEmployed
    // isUnEmployed is a boolean value
    // isUnEmployed: true => User is unEmployed
    // isUnEmployed: false => User is employeed

    console.log(`UnEmployment Status:`, isUnEmployed);
    console.log(`Form Data Submitted:`, data);

    localStorage.setItem("Applicant's Basic Information", JSON.stringify(data));
    router.push("/applicant/family-details");
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
          Applicant's Basic Details
        </h2>
        {/* University Name Input */}

        <TextInput
          title="Name of the University:"
          registerAs="university_name"
          placeholder="Enter university name"
          isRequired={true}
          requiringCaption="University name is required"
          register={register}
          errors={errors}
        />

        <div className="flex justify-stretch gap-3.5">
          {/* Degree Title / Program Input */}

          <TextInput
            title="Degree Title / Program / Department:"
            registerAs="program"
            placeholder="Enter your program or department"
            isRequired={true}
            requiringCaption="Program name is required"
            register={register}
            errors={errors}
            width="w-1/2"
          />

          {/* Roll Number Input */}
          <NumericInput
            title="Roll Number:"
            registerAs="roll_number"
            placeholder="Enter your roll number"
            isRequired={true}
            requiringCaption="Roll number is required"
            register={register}
            errors={errors}
            length={11}
            lengthCaption="Roll number must be exactly 11 digits"
            width="w-1/2"
          />
        </div>

        {/* Applicant's Name */}

        <TextInput
          title="1. Applicant's Name:"
          registerAs="applicant_name"
          placeholder="Enter your name"
          isRequired={true}
          requiringCaption="Your name is required"
          register={register}
          errors={errors}
        />

        {/* ID card input */}
        <NumericInput
          title="2. Applicant's NADRA ID Card Number:"
          registerAs="id_card_number"
          placeholder="Enter your NADRA Identity card number"
          isRequired={true}
          requiringCaption="Identity Card number is required"
          register={register}
          errors={errors}
          length={13}
          lengthCaption="Identity Card number must be exactly 11 digits"
        />

        {/* Marital Status Dropdown */}
        <DropDown
          title="3. Marital Status"
          registerAs="marital_status"
          isRequired={true}
          requiringCaption="Marital status is required"
          register={register}
          errors={errors}
          width="w-1/2"
          options={[
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "divorced", label: "Divorced" },
          ]}
        />

        <div className="flex justify-stretch gap-3.5">
          {/* Age */}
          <NumericInput
            title="4. Age:"
            registerAs="age"
            placeholder="Enter your age"
            isRequired={true}
            requiringCaption="Age is required"
            min={15}
            length={2}
            register={register}
            errors={errors}
            width="w-1/2"
          />

          <div className="mb-6 w-1/2">
            {/* Domicile Input  */}
            <TextInput
              title="5. Domicile:"
              registerAs="domicile"
              placeholder="Enter your domicile"
              isRequired={true}
              requiringCaption="Domicile is required"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        {/* Present Address */}
        <TextInput
          title="6. Present Address:"
          registerAs="present_address"
          placeholder="Enter your present address"
          isRequired={true}
          requiringCaption="Present address is required"
          register={register}
          errors={errors}
        />

        {/* Permanent Address */}
        <TextInput
          title="7. Permanent Address:"
          registerAs="permanent_address"
          placeholder="Enter your permanent address"
          isRequired={true}
          requiringCaption="Permanent address is required"
          register={register}
          errors={errors}
        />

        {/* Employeement Status  */}
        <DropDown
          title="Are you currently working?:"
          registerAs="employeement_status"
          isRequired={true}
          requiringCaption="Employeement status is required"
          register={register}
          errors={errors}
          width="w-1/2"
          options={[
            { value: "false", label: "Yes" },
            { value: "true", label: "No" },
          ]}
        />

        {/* Employeement History  */}
        <div>
          <h3>
            8. If your answer is yes to{" "}
            <span className="font-semibold">Section 7 </span> complete the
            following sections (8 - 10)
          </h3>

          <div className="flex justify-stretch gap-3.5">
            {/* Designation  */}
            <DisabledTextInput
              title="Designation"
              registerAs="designation"
              placeholder="Enter your job designation"
              isRequired={!isUnEmployed}
              requiringCaption="Job designation is required"
              register={register}
              errors={errors}
              isDisabled={isUnEmployed} // Disable input if employed
              width="w-1/2"
            />

            {/* Employeer or Company Name */}
            <DisabledTextInput
              title="Employer or Company Name"
              registerAs="company_name"
              placeholder="Enter your company name"
              isRequired={!isUnEmployed}
              requiringCaption="Company name is required"
              register={register}
              errors={errors}
              isDisabled={isUnEmployed} // Disable input if employed
              width="w-1/2"
            />
          </div>
        </div>

        {/* Monthly Income  */}

        <DisabledTextInput
          title="9. Total Monthly Grass Income of Applicant in Pak Rs.:"
          registerAs="applicant_income"
          placeholder="Enter your monthly income"
          isRequired={!isUnEmployed}
          requiringCaption="Income is required"
          register={register}
          errors={errors}
          isDisabled={isUnEmployed} // Disable based on state
        />

        {/* Monthly Home income  */}
        <DisabledTextInput
          title="10. Total Monthly Grass Income of Household in Pak Rs.:"
          registerAs="household_income"
          placeholder="Enter your household income"
          isRequired={!isUnEmployed}
          requiringCaption="Income is required"
          register={register}
          errors={errors}
          isDisabled={isUnEmployed} // Disable based on state
        />
        <span className="text-red-400 font-bold w-full text-sm pb-3">
          *Take Home Income: Salary/Pay after deduction of taxes,provident fund
          charges etc.
        </span>

        {/* Contact Information  */}
        <div className="flex justify-stretch gap-2">
          {/* Residental Telephone number  */}
          <NumericInput
            title="11. Residential Telephone Number:"
            registerAs="residential_telephone"
            placeholder="Enter your telephone number"
            isRequired={false}
            register={register}
            errors={errors}
            width="w-1/3"
            length={11}
            lengthCaption="Telephone number must be exactly 11 digits"
          />

          {/* Applicant's Mobile Number */}
          <NumericInput
            title="12. Applicant's Mobile Number:"
            registerAs="applicant_mobile_number"
            placeholder="Enter your mobile number"
            isRequired={true}
            requiringCaption="Mobile number is required"
            register={register}
            errors={errors}
            length={11}
            lengthCaption="Mobile number must be exactly 11 digits"
            width="w-1/3"
          />

          {/* Email Address */}
          <TextInput
            title="13. Email Address:"
            registerAs="email"
            placeholder="Enter your email address"
            isRequired={true}
            requiringCaption="Email address is required"
            register={register}
            errors={errors}
            width="1/3"
          />
        </div>

        {/* Family member counts */}
        <NumericInput
          title="14. Total Number of Family Members living with you:"
          registerAs="family_members_count"
          placeholder="Enter number of family members"
          isRequired={true}
          requiringCaption="This field is required"
          register={register}
          errors={errors}
          width="w-full"
          length={1}
        />

        <div className="flex justify-center gap-5">
          {/* Continue Button */}
          <motion.button
            type="submit"
            className={`w-auto px-5 py-3 rounded-lg transition duration-300 
      ${
        loading
          ? "bg-green-300 text-green-700 cursor-not-allowed " // Lighter green shade when disabled
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
}
