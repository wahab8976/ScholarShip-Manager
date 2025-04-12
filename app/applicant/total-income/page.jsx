"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FamilyIncomeForm() {
  const { register, watch, handleSubmit, setValue } = useForm();
  const [totalIncome, setTotalIncome] = useState(0);
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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("familyIncomeData"));
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key, value);
      });

      const relations = {};
      Object.entries(savedData).forEach(([key, value]) => {
        if (key.startsWith("relation_")) {
          const index = key.split("_")[1];
          relations[index] = value;
        }
      });
      setSelectedRelations(relations);
      calculateTotal(savedData);
    }
  }, [setValue]);

  const formValues = watch();

  // Recalculate total on form update
  useEffect(() => {
    calculateTotal(formValues);
  }, [formValues]);

  // Update total income calculation
  const calculateTotal = (data) => {
    let sum = 0;
    Object.entries(data).forEach(([key, value]) => {
      if (
        (key.startsWith("incomeFromAssets_") ||
          key.startsWith("grossPay_") ||
          key.startsWith("netPay_")) &&
        !isNaN(parseFloat(value))
      ) {
        sum += parseFloat(value);
      }
    });
    setTotalIncome(sum);
  };

  // Handle relationship select
  const handleRelationChange = (index, value) => {
    const updatedRelations = { ...selectedRelations, [index]: value };
    setSelectedRelations(updatedRelations);
  };

  const onSubmit = (data) => {
    const filteredData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (
        key.startsWith("relation_") ||
        key.startsWith("incomeFromAssets_") ||
        key.startsWith("grossPay_") ||
        key.startsWith("netPay_")
      ) {
        filteredData[key] = value;
      }
    });

    console.log("Saved Data:", filteredData);
    localStorage.setItem("familyIncomeData", JSON.stringify(filteredData));
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
                  <select
                    className="w-full p-1 border border-gray-300 rounded"
                    {...register(`relation_${index}`)}
                    value={selectedRelations[index] || ""}
                    onChange={(e) =>
                      handleRelationChange(index, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {relationships.map((rel) => (
                      <option
                        key={rel}
                        value={rel}
                        disabled={
                          Object.values(selectedRelations).includes(rel) &&
                          selectedRelations[index] !== rel
                        }
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
                      defaultValue={0}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold text-center">
              <td className="border border-gray-400 p-2" colSpan="4">
                Total Income
              </td>
              <td className="border border-gray-400 p-2">{totalIncome}</td>
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
