"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Page = () => {
  // Initialize with one default div
  const [formCollection, setFormCollection] = useState([
    "Family_Member_1_Earnings",
  ]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleAddNewElement = () => {
    setFormCollection([
      ...formCollection,
      `Family_Member_${formCollection.length + 1}_Earnings`,
    ]);
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
        {formCollection.map((text, index) => (
          <div key={index} className="p-2 border rounded bg-gray-200 my-2">
            {text}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddNewElement}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </motion.form>
    </div>
  );
};

export default Page;
