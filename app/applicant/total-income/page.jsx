"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { calc } from "antd/es/theme/internal";

export default function FamilyIncomeForm() {
  const { register, watch, handleSubmit, setValue } = useForm();
  const [total, setTotal] = useState(0);
  const [selectedRelations, setSelectedRelations] = useState({});
  const router = useRouter();

  const relationships = [
    "Father",
    "Mother",
    "Spouse",
    "Sibling",
    "Self",
    "Other",
  ];
  const incomeFields = ["incomeFromAssets", "grossPay", "netPay"];

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("monthlyFamilyIncome"));
    if (savedData) {
      console.log("Loaded Data from Local Storage:", savedData);
      Object.keys(savedData).forEach((key) => {
        if (savedData[key] !== undefined) {
          setValue(key, savedData[key]);
        }
      });
    }
  }, [setValue]);

  const formValues = watch();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("monthlyFamilyIncome"));
    if (savedData) {
      console.log("Saved Data:", savedData);

      Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));

      // Extract relationship data and update state
      const relations = {};
      Object.keys(savedData).forEach((key) => {
        if (key.startsWith("relation_")) {
          const index = key.split("_")[1];
          relations[index] = savedData[key];
        }
      });

      setSelectedRelations(relations);
    }
  }, [setValue]);

  const handleRelationChange = (index, value) => {
    setSelectedRelations((prev) => {
      const updated = { ...prev, [index]: value };
      return updated;
    });
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted of Monthly Gross Income:", data);
    localStorage.setItem("monthlyFamilyIncome", JSON.stringify(data));
    router.push("/applicant/total-income");
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Family Monthly Income
      </h1>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
        style={{ width: "80vw" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">S#</th>
              <th className="border border-gray-400 p-2">Family Member Name</th>
              <th className="border border-gray-400 p-2">Relationship</th>
              <th className="border border-gray-400 p-2">Income from Assets</th>
              <th className="border border-gray-400 p-2">Gross Pay</th>
              <th className="border border-gray-400 p-2">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{index + 1}</td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-300 rounded"
                    {...register(`member_${index}`)}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <select
                    className="w-full p-1 border border-gray-300 rounded"
                    {...register(`relation_${index}`)}
                    onChange={(e) =>
                      handleRelationChange(index, e.target.value)
                    }
                    value={selectedRelations[index] || ""}
                  >
                    <option value="">Select</option>
                    {relationships.map((rel) => (
                      <option
                        key={rel}
                        value={rel}
                        disabled={Object.values(selectedRelations).includes(
                          rel
                        )}
                      >
                        {rel}
                      </option>
                    ))}
                  </select>
                </td>
                {incomeFields.map((field) => (
                  <td key={field} className="border border-gray-400 p-2">
                    <input
                      type="number"
                      className="w-full p-1 border border-gray-300 rounded"
                      {...register(`${field}_${index}`)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold text-center">
              <td className="border border-gray-400 p-2" colSpan="5">
                Total Monthly Net Income
              </td>
              <td className="border border-gray-400 p-2">{total}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="cursor-pointer mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Save
          </button>
        </div>
      </motion.form>
    </div>
  );
}
