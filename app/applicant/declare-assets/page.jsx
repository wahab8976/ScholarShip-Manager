"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AssetIncomeForm() {
  const { register, watch, handleSubmit, setValue } = useForm();
  const [total, setTotal] = useState(0);

  const incomeSources = [
    { key: "propertyRent", label: "Property Rent" },
    { key: "landLease", label: "Land Lease" },
    { key: "bankDeposits", label: "Bank Deposits" },
    { key: "sharesSecurities", label: "Shares / Securities" },
    { key: "other", label: "Other (Specify)" },
  ];

  const people = ["father", "mother", "spouse", "self", "other"];

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("assetIncomeForm")) || {};
    Object.keys(savedData).forEach((key) => setValue(key, savedData[key]));
  }, [setValue]);

  // Watch form values and update total
  const formValues = watch();
  const router = useRouter();

  useEffect(() => {
    let newTotal = 0;
    incomeSources.forEach(({ key }) => {
      people.forEach((person) => {
        newTotal += parseFloat(formValues[`${person}_${key}`]) || 0;
      });
    });

    setTotal(newTotal);
  }, [formValues]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("assetIncomeForm", JSON.stringify(data));
    router.push("/applicant/total-income");
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Declare your Assets
        </h1>
      </div>

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
              <th className="border border-gray-400 p-2">Income Source</th>
              {people.map((person) => (
                <th
                  key={person}
                  className="border border-gray-400 p-2 capitalize"
                >
                  {person}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incomeSources.map(({ key, label }, index) => (
              <tr key={key} className="text-center">
                <td className="border border-gray-400 p-2">{index + 1}</td>
                <td className="border border-gray-400 p-2">{label}</td>
                {people.map((person) => (
                  <td
                    key={`${person}_${key}`}
                    className="border border-gray-400 p-2"
                  >
                    <input
                      type="number"
                      className="w-full p-1 border border-gray-300 rounded"
                      {...register(`${person}_${key}`)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold text-center">
              <td className="border border-gray-400 p-2" colSpan="6">
                Total
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
