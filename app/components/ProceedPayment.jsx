"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * ProceedPayment Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.showTotalCharges - State to control visibility of the confirmation dialog
 * @param {Function} props.setShowTotalCharges - Function to update confirmation state
 * @param {number} props.totalCharges - The total calculated charges
 * @returns {JSX.Element} - A confirmation dialog for total charges before proceeding
 */
const ProceedPayment = ({
  totalCharges,
  showTotalCharges,
  setShowTotalCharges,
}) => {
  if (!showTotalCharges) return null; //If no total charges, return null and Don't Render the Dialogue

  const router = useRouter();
  const handleProceed = () => {
    console.log("Proceed to Payment");
    setShowTotalCharges(false);
    router.push("/applicant/father-details");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md">
      <motion.div
        className="bg-white rounded-lg p-6 shadow-xl w-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
          Proceed to Payment
        </h2>

        {/* Warning Message */}
        <p className="text-red-600 font-semibold text-center mb-3">
          ⚠ Please double-check the total fee before proceeding!
        </p>

        <p className="text-gray-600 text-center mb-4">
          Your total calculated charges are <strong>Rs. {totalCharges}</strong>.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowTotalCharges(false)}
            className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Proceed
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProceedPayment;
