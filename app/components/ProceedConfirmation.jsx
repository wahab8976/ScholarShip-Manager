"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * ProceedConfirmation Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.proceedConfirmation - State to control visibility of the confirmation dialog
 * @param {Function} props.setProceedConfirmation - Function to update proceed confirmation state
 * @returns {JSX.Element} - A confirmation dialog for proceeding with the application
 */
const ProceedConfirmation = ({
  proceedConfirmation,
  setProceedConfirmation,
}) => {
  const router = useRouter();

  /**
   * Handles redirection to the application page and updates state.
   */
  const handleRedirectToApplication = () => {
    router.push("/applicant/info");
    setProceedConfirmation(false);
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-lg"
    >
      <h3 className="font-semibold text-lg">⚠️ Before You Proceed</h3>
      <p className="mt-2">
        Please make sure you have all the <strong>required documents</strong>{" "}
        ready and arranged in the correct order (1 to 8). Missing or incorrect
        documents may result in <strong>delays</strong> in processing your
        application.
      </p>
      <p className="mt-2">
        If everything is complete, click <strong>Proceed</strong> to continue.
      </p>

      {/* Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleRedirectToApplication()}
          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Proceed
        </button>
        <button
          onClick={() => setProceedConfirmation(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default ProceedConfirmation;
