"use client";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const Page = () => {
  const [error, setError] = useState(null);
  const [family_members_count, setFamily_members_count] = useState(0);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const formData = JSON.parse(
      localStorage.getItem("Applicant's Basic Information")
    );
    console.log(`Form Data is ${JSON.stringify(formData)}`);

    const { family_members_count } = formData;
    if (!family_members_count || family_members_count === 0) {
      setError("Please fill the basic information first");
    } else {
      setFamily_members_count(family_members_count);
    }
  }, []);

  const onSubmit = (data) => console.log(`Data is ${JSON.stringify(data)}`);

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
            Family member count {index + 1}
          </div>
        ))}


        
      </motion.form>
    </div>
  );
};

export default Page;
